import SensitiveInfoStorage from 'react-native-sensitive-info';

const CONFIG = {
    sharedPreferencesName: '@BitWalletPrefs-712638173',
    keychainService: '@BitWalletKeychain-513961259'
}
export const STORAGE_KEYS = {
    WALLETS: 'WALLETS',
    CONTACTS: 'CONTACTS'
}

async function getItem(key) {
    const data = await SensitiveInfoStorage.getItem(key, CONFIG).then(item => item || null);
    return data != null ? JSON.parse(data) : null;
}

async function setItem(key, value) {
    return await SensitiveInfoStorage.setItem(key, JSON.stringify(value) || null, CONFIG);
}

async function deleteItem(key) {
    return await SensitiveInfoStorage.deleteItem(key, CONFIG);
}

async function clear() {

}

export const LMStorageService = {
    getItem,
    setItem,
    deleteItem,
    clear
};
