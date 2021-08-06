import {loadActiveWalletSuccess, loadSuccess, loadTransactionsSuccess} from './WalletReducer';
import WalletService from './WalletService';
import {LMStorageService, STORAGE_KEYS} from '../storage/LMStorageService';
import _ from 'lodash'
import moment from 'moment';
import bitcoin from 'bitcoin-units';

export const WalletAction = {
    list,
    add,
    transactions,
    importWallet,
    setActiveWallet,
    remove
};

function list(params) {
    return async dispatch => {
        const {network, address} = params;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS) || [{
            name: 'Create a new wallet',
            address: 'NONE'
        }];
        let activeWallet = null;
        for (let i = 0; i < wallets.length; i++) {
            if (wallets[i].address !== 'NONE') {
                const balance = await WalletService.balance(wallets[i].address);
                const latestTransaction = await WalletService.latestTransaction(wallets[i].address);
                wallets[i].balance = balance;
                wallets[i].latestTransaction = latestTransaction;
            }
            if (address == wallets[i].address) {
                activeWallet = wallets[i];
            }
        }
        dispatch(loadSuccess(wallets));
        if (!_.isNil(activeWallet)) {
            dispatch(loadActiveWalletSuccess(activeWallet));
        }
    };
}

function add(params) {
    return async dispatch => {
        const {network} = params;
        const wallet = await WalletService.add(params);
        const balance = await WalletService.balance(wallet.address);
        wallet.balance = balance;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS) || [{
            name: 'Create a new wallet',
            address: 'NONE'
        }];
        const updatedWallets = [wallet, ...wallets];
        await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.WALLETS, updatedWallets);
        dispatch(loadSuccess(updatedWallets));
        return wallet;
    };
}

function remove(params) {
    return async dispatch => {
        const {wallet, network} = params;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS);
        _.remove(wallets, function (w) {
            return wallet.address == w.address;
        });
        await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.WALLETS, wallets);
        dispatch(loadSuccess(wallets));
        return wallets;
    };
}

function importWallet(params) {
    return async dispatch => {
        const {network} = params;
        const wallet = await WalletService.importWallet(params);
        if (_.isNil(wallet)) {
            return 'invalid';
        }
        if (await WalletService.isExists(wallet.address, network.key)) {
            return 'imported';
        }
        const balance = await WalletService.balance(wallet.address);
        wallet.balance = balance;
        const wallets = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.WALLETS) || [{
            name: 'Create a new wallet',
            address: 'NONE'
        }];
        const updatedWallets = [wallet, ...wallets];
        await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.WALLETS, updatedWallets);
        dispatch(loadSuccess(updatedWallets));
        return wallet;
    };
}

function transactions(params) {
    return async dispatch => {
        const {address, last_seen_txid} = params;
        const {fetch, transactions} = await WalletService.transactions(address, last_seen_txid);
        for (let i = 0; i < transactions.length; i++) {
            const vin = transactions[i].vin;
            const isSender = _.findIndex(vin, function (input) {
                return input.prevout.scriptpubkey_address == address;
            }) == -1 ? false : true;
            transactions[i].sender = isSender;
            transactions[i].from = address;
            const vout = transactions[i].vout;
            let sum = 0;
            _.forEach(vout, function (out) {
                if (isSender) {
                    sum += out.scriptpubkey_address != address ? out.value : 0;
                } else {
                    sum += out.scriptpubkey_address == address ? out.value : 0;
                }

            });
            transactions[i].to = vout[0].scriptpubkey_address;
            transactions[i].value = bitcoin(sum, 'satoshi').to('BTC').format();
            transactions[i].time = moment(transactions[i].status?.block_time, 'X').fromNow();
        }
        dispatch(loadTransactionsSuccess(transactions));
        return {fetch, transactions}
    };
}

function setActiveWallet(params) {
    return async dispatch => {
        dispatch(loadActiveWalletSuccess(params));
    };
}
