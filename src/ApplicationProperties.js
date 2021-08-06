import * as bitcoin from 'bitcoinjs-lib';
export const ApplicationProperties = {
    NETWORKS : [{
        key : 'mainnet',
        value : bitcoin.networks.bitcoin,
        api : 'https://blockstream.info/api/',
        explore : 'https://blockstream.info/',
    },{
        key : 'testnet',
        value : bitcoin.networks.testnet,
        api : 'https://blockstream.info/testnet/api/',
        explore : 'https://blockstream.info/testnet/',
    }],
    USING_MAIN_NET : false,
    DEFAULT_LANGUAGE : {
        code : 'en',
        icon : 'GB',
        name : 'English'
    },
    LANGUAGE_LIST : [{
            code : 'vi',
            icon : 'VN',
            name : 'Tiếng Việt'
        },
        {
            code : 'en',
            icon : 'GB',
            name : 'English'
        }
    ],
    TIME_FORMATTER : 'MMMM Do YYYY, h:mm:ss a',
    SYNC_INTERVAL : 10000,
    LOOP : 18
};
