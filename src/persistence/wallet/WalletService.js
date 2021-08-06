import BitcoinWallet from '../../module/bitcoin/BitcoinWallet';
import * as bitcoin from 'bitcoinjs-lib';
import BitcoinService from '../../module/bitcoin/BitcoinService';
import BitcoinUtil from '../../module/bitcoin/BitcoinUtil';
import CommonAPI from '../../module/api/CommonAPI';
import {LMStorageService, STORAGE_KEYS} from '../storage/LMStorageService';
import _ from 'lodash';
import moment from 'moment';

/**
 * add a new wallet
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const add = async (params) => {
    const p2wpkh = BitcoinWallet.payToWitnessPublicKeyHashMnemonic(params);
    const wallet = {...params, ...p2wpkh};
    return wallet;
}
/**
 * import a new wallet
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const importWallet = async (params) => {
    let p2wpkh = BitcoinWallet.payToWitnessPublicKeyHashMnemonic(params);
    if (_.isNil(p2wpkh)) {
        p2wpkh = BitcoinWallet.payToWitnessPublicKeyHash(params);
        if (_.isNil(p2wpkh)) {
            return null;
        }
    }
    const wallet = {...params, ...p2wpkh};
    return wallet;
}
/**
 * get wallet balance
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const balance = async (address) => {
    const balance = await CommonAPI.get(`address/${address}`);
    const remain = balance.chain_stats.funded_txo_sum - balance.chain_stats.spent_txo_sum;
    return BitcoinUtil.toBTC(remain);
}
/**
 * get latestTransaction
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const latestTransaction = async (address) => {
    const utxo = await BitcoinService.getUtxo(address);
    if (utxo.length > 0) {
        return moment(utxo[0].status?.block_time, 'X').fromNow();
    }
    return '';
}
/**
 * send
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const send = async (params) => {
    let {wif, address, toAddress, network, amount, fee} = params;
    const psbt = new bitcoin.Psbt({network: network.value});
    const utxo = await BitcoinService.getUtxo(address);
    let totalAmount = 0;
    const withdrawAmount = BitcoinUtil.toSatoshi(amount);
    fee = BitcoinUtil.toSatoshi(fee);
    const minimumRequiredAmount = withdrawAmount + fee;
    for (let i = 0; i < utxo.length; i++) {
        totalAmount += utxo[i].value;
        if (totalAmount >= minimumRequiredAmount) {
            break;
        }
    }
    const change = totalAmount - (withdrawAmount + fee);
    if (change >= 0) {
        const alice = bitcoin.ECPair.fromWIF(
            wif,
            network.value
        );
        let splitAmount = totalAmount;
        let numberOfInputs = 0;
        for (let i = 0; i < utxo.length; i++) {
            const nonWitnessUtxo = await BitcoinService.getTx(utxo[i].txid);
            psbt.addInput({
                hash: utxo[i].txid,
                index: utxo[i].vout,
                nonWitnessUtxo: Buffer.from(nonWitnessUtxo, 'hex'),
            });
            splitAmount -= utxo[i].value;
            numberOfInputs++;
            if (splitAmount <= 0) {
                break;
            }
        }
        psbt.addOutput({
            address: toAddress,
            value: withdrawAmount
        });
        if (change >= 0) {
            psbt.addOutput({
                address: address,
                value: change
            });
        }

        for (let i = 0; i < numberOfInputs; i++) {
            psbt.signInput(i, alice);
            psbt.validateSignaturesOfInput(i);
        }
        psbt.finalizeAllInputs();
        const tx = psbt.extractTransaction().toHex();

        return await BitcoinService.broadcast(tx);
    }
    return null;

}
/**
 * fee
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const fee = async (params) => {
    let {wif, address, toAddress, network, amount, rate} = params;
    const psbt = new bitcoin.Psbt({network: network.value});
    const utxo = await BitcoinService.getUtxo(address);
    let totalAmount = 0;
    const withdrawAmount = BitcoinUtil.toSatoshi(amount);
    const minimumRequiredAmount = withdrawAmount;
    for (let i = 0; i < utxo.length; i++) {
        totalAmount += utxo[i].value;
        if (totalAmount >= minimumRequiredAmount) {
            break;
        }
    }
    const change = totalAmount - (withdrawAmount);
    if (change >= 0) {
        const alice = bitcoin.ECPair.fromWIF(
            wif,
            network.value
        );
        let splitAmount = totalAmount;
        let numberOfInputs = 0;
        for (let i = 0; i < utxo.length; i++) {
            const nonWitnessUtxo = await BitcoinService.getTx(utxo[i].txid);
            psbt.addInput({
                hash: utxo[i].txid,
                index: utxo[i].vout,
                nonWitnessUtxo: Buffer.from(nonWitnessUtxo, 'hex'),
            });
            splitAmount -= utxo[i].value;
            numberOfInputs++;
            if (splitAmount <= 0) {
                break;
            }
        }
        psbt.addOutput({
            address: toAddress,
            value: withdrawAmount
        });
        if (change >= 0) {
            psbt.addOutput({
                address: address,
                value: change
            });
        }

        for (let i = 0; i < numberOfInputs; i++) {
            psbt.signInput(i, alice);
            psbt.validateSignaturesOfInput(i);
        }
        psbt.finalizeAllInputs();
        const virtualSize = psbt.extractTransaction().virtualSize();
        return {
            withdrawAmount: BitcoinUtil.toBTC(withdrawAmount),
            fee: BitcoinUtil.toBTC(rate * virtualSize),
            totalAmount: BitcoinUtil.toBTC(withdrawAmount + (rate * virtualSize))
        };
    }
    return null;

}
/**
 * estimateFee
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const estimateFee = async () => {
    const data = await CommonAPI.get('fee-estimates');
    return {
        fast: data["1"],
        average: data["25"],
        slow: data["144"]
    };
}
/**
 * get the latest 25 transactions
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const transactions = async (address, last_seen_txid) => {
    const data = await BitcoinService.getTransactions(address, last_seen_txid);
    return data;
}
/**
 * get the latest 25 transactions
 *
 * @param wallet name
 * @returns {object}        wallet information
 */
const isExists = async (address, network) => {
    const wallets = await LMStorageService.getItem(network + "_" + STORAGE_KEYS.WALLETS) || [];
    const index = _.findIndex(wallets, function (wallet) {
        return address == wallet.address;
    })
    return index == -1 ? false : true;
}
const WalletService = {
    add,
    send,
    balance,
    fee,
    estimateFee,
    transactions,
    importWallet,
    isExists,
    latestTransaction
}
export default WalletService;
