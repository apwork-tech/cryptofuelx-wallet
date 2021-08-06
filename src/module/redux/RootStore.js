import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import LanguageReducer from '../../persistence/language/LanguageReducer';
import WalletReducer from '../../persistence/wallet/WalletReducer';
import NetworkReducer from '../../persistence/network/NetworkReducer';
import ContactReducer from '../../persistence/contact/ContactReducer';

const applicationStore = configureStore({
    reducer: {
        LanguageReducer,
        WalletReducer,
        NetworkReducer,
        ContactReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})
export default applicationStore;
