import * as bitcoin from 'bitcoinjs-lib';
import bitcoinUnit from 'bitcoin-units';

const COIN = 100000000;
const PRECISION = 8;
const DUST = 2730;
const BASE_FEE = 10000;
const LOCK_TIME_TIMESTAMP_THRESHOLD = 5000000;
/**
 * convert a BTC value to Satoshi
 *
 * @param btc   float       BTC value
 * @returns int             Satoshi value (int)
 */
const toSatoshi = function (btc) {
    return parseInt((btc * COIN).toFixed(0), 10);
};

/**
 * convert a Satoshi value to BTC
 *
 * @param satoshi   int     Satoshi value
 * @returns {string}        BTC value (float)
 */
const toBTC = function (satoshi) {
    return bitcoinUnit(satoshi, 'satoshi').to('BTC').value();
};
/**
 * convert a Satoshi value to fixed decimals
 *
 * @param satoshi   int     Satoshi value
 * @returns {string}        BTC value (float)
 */
const toFixed = function (satoshi, fixed) {
    if (satoshi) {
        return satoshi.toFixed(fixed || 2)
    }
    return '';
};

/**
 * check whether an address is valid
 *
 * @param address            string  wallet address
 * @returns [{object}]      transactions
 */
const validate = async (address, network) => {
    try {
        bitcoin.address.toOutputScript(address, network)
        return true
    } catch (e) {
        return false
    }
}

const BitcoinUtil = {
    toSatoshi,
    toBTC,
    validate,
    toFixed
}
export default BitcoinUtil;
