import {getActiveNetworkSuccess, listSuccess, setActiveNetworkSuccess} from './NetworkReducer';
import CommonAPI from '../../module/api/CommonAPI';
import {WalletAction} from '../wallet/WalletAction';
import LMLoading from '../../component/common/LMLoading';
import {ContactAction} from '../contact/ContactAction';
import {ApplicationProperties} from "../../ApplicationProperties";
import _ from 'lodash'

export const NetworkAction = {
    list,
    getActiveNetwork,
    setActiveNetwork
};

function list() {
    return async dispatch => {
        const networks = ApplicationProperties.NETWORKS;
        dispatch(listSuccess(networks));
    };
}

function setActiveNetwork(network) {
    return async dispatch => {
        dispatch(setActiveNetworkSuccess(network));
        CommonAPI.setBaseUrl(network.api);
        dispatch(ContactAction.list({network: network}));
        dispatch(WalletAction.list({network: network})).then(() => {
            LMLoading.hide();
        });
    };
}

function getActiveNetwork() {
    return async dispatch => {
        const usingMainnet = ApplicationProperties.USING_MAIN_NET;
        let network = _.find(ApplicationProperties.NETWORKS, function (o) {
            return o.key == 'mainnet';
        });
        if (!usingMainnet) {
            network = _.find(ApplicationProperties.NETWORKS, function (o) {
                return o.key == 'testnet';
            });
        }
        dispatch(getActiveNetworkSuccess(network));
        dispatch(ContactAction.list({network: network}));
        dispatch(WalletAction.list({network: network})).then(() => {
        });
        CommonAPI.setBaseUrl(network.api);
    };
}
