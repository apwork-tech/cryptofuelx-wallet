import {createSlice} from '@reduxjs/toolkit';

const WalletReducer = createSlice({
    name: 'wallet',
    initialState: {
        wallets: [],
        transactions: [],
        activeWallet: {}
    },
    reducers: {
        loadSuccess(state, {payload}) {
            state.wallets = payload;
        },
        loadTransactionsSuccess(state, {payload}) {
            state.transactions = payload;
        },
        loadActiveWalletSuccess(state, {payload}) {
            state.activeWallet = payload;
        },
    },
});
// Extract the action creators object and the reducer
const {actions, reducer} = WalletReducer;
// Extract and export each action creator by name
export const {loadSuccess, loadTransactionsSuccess, loadActiveWalletSuccess} = actions;
// Export the reducer, either as a default or named export
export default reducer;
