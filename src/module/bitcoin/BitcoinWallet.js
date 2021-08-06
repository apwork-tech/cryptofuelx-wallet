import * as bitcoin from 'bitcoinjs-lib';
import {bip32} from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import _ from 'lodash';

const walletType = (address) => {
    if (_.startsWith(address, '1')) {
        //P2PKH Legacy
        return 'Legacy';
    } else if (_.startsWith(address, '3')) {
        //Segwit
        return 'HD Segwit (BIP49 P2SH)';
    } else if (_.startsWith(address, 'bc1') || _.startsWith(address, 'tb1')) {
        //Bech32
        return 'HD Segwit (BIP84 Bech32 Native)';
    }
}
/**
 * create a new SegWit-Bech32 wallet
 *
 * @param option
 * @returns wallet
 */
const payToWitnessPublicKeyHash = function (params) {
    try {
        const {network, wif} = params;
        const wifData = wif || bitcoin.ECPair.makeRandom({network: network.value}).toWIF();
        const keyPair = bitcoin.ECPair.fromWIF(wifData, network.value);
        const {address} = bitcoin.payments.p2wpkh({pubkey: keyPair.publicKey, network: network.value});
        const type = walletType(address);
        return {wif: wifData, address: address, type};
    } catch (e) {
        return undefined;
    }


};
/**
 * create a new SegWit-Bech32 wallet
 *
 * @param option
 * @returns wallet
 */
const payToWitnessPublicKeyHashMnemonic = function (params) {
    try {
        let {network, mnemonic} = params;
        if (_.isNil(mnemonic)) {
            mnemonic = bip39.generateMnemonic();
        }
        if (bip39.validateMnemonic(mnemonic)) {
            const seed = bip39.mnemonicToSeedSync(mnemonic);
            const root = bip32.fromSeed(seed, network.value);
            const keyPair = root.derivePath("m/0'/0/0");
            const {address} = bitcoin.payments.p2wpkh({pubkey: keyPair.publicKey, network: network.value});
            const type = walletType(address);
            return {wif: keyPair.toWIF(), address: address, mnemonic, type};
        }
        return undefined;
    } catch (e) {
        return undefined;
    }

};
const BitcoinWallet = {
    payToWitnessPublicKeyHash,
    payToWitnessPublicKeyHashMnemonic
}
export default BitcoinWallet;
