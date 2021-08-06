import CommonAPI from '../api/CommonAPI';
import _ from 'lodash';

/**
 * fetch the wallet information
 *
 * @param address   string  wallet address
 * @returns {object}        wallet information
 */
const getInfo = async (address) => {
    const data = await CommonAPI.get(`address/${address}`);
    console.log(data);
    return data;
}
/**
 * fetch the unspent transaction output information
 *
 * @param address   string  wallet address
 * @returns [{object}]      array of unspent transactions
 */
const getUtxo = async (address) => {
    const data = await CommonAPI.get(`address/${address}/utxo`);
    const confirmed = _.remove(data, function (o) {
        return o.status.confirmed == true;
    })
    return confirmed;
}
/**
 * fetch the transaction information
 *
 * @param txid   string  transaction id
 * @returns string      transaction information in hex or as binary data.
 */
const getTx = async (txid) => {
    const data = await CommonAPI.get(`tx/${txid}/hex`);
    return data;
}
/**
 * Broadcast a raw transaction to the network.
 *
 * @param tx            string  transaction
 * @returns string      transaction information in hex or as binary data.
 */
const broadcast = async (tx) => {
    const data = await CommonAPI.post(`tx`, tx, {headers: {"Content-Type": "text/plain"}});
    return data;
}
/**
 * Get transaction history for the specified address/scripthash, sorted with newest first.
 *
 * @param address            string  wallet address
 * @returns [{object}]      transactions
 */
const getTransactions = async (address, last_seen_txid) => {
    const confirmed = await CommonAPI.get(`address/${address}/txs/chain/${last_seen_txid ? '' : last_seen_txid}`);
    const unconfirmed = await CommonAPI.get(`address/${address}/txs/mempool`);
    const fetch = unconfirmed.length > 0 ? true : false;
    return {
        fetch: fetch,
        transactions: [...unconfirmed, ...confirmed]
    };
}

const BitcoinService = {
    getInfo,
    getUtxo,
    getTx,
    broadcast,
    getTransactions
}
export default BitcoinService;
