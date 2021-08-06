import React from 'react';
import {LMStorageService, STORAGE_KEYS} from '../storage/LMStorageService';
import _ from 'lodash';
import uuid from 'react-native-uuid';

export const ContactService = {
    add,
    update,
    remove,
    list
};

async function add(params) {
    const {contact, network} = params;

    const contacts = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.CONTACTS) || [];
    if (-1 != _.findIndex(contacts, function (o) {
        return o.address == contact.address
    })) {
        return {
            success: false,
            data: 'existed'
        }
    }
    contacts.push({id: uuid.v4(), ...contact});
    await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.CONTACTS, contacts);
    return {
        success: true,
        data: contacts
    };
}

async function update(params) {
    const {contact, network} = params;
    const contacts = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.CONTACTS) || [];
    if (-1 != _.findIndex(contacts, function (o) {
        return o.address == contact.address && o.id !== contact.id
    })) {
        return {
            success: false,
            data: 'existed'
        }
    }
    _.map(contacts, function (sContact) {
        if (sContact.id == contact.id) {
            sContact.name = contact.name;
            sContact.address = contact.address;
        }
    });
    await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.CONTACTS, contacts);
    return {
        success: true,
        data: contacts
    };
}

async function remove(params) {
    const {contact, network} = params;
    const contacts = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.CONTACTS) || [];
    _.remove(contacts, function (sContact) {
        return sContact.address == contact.address;
    });
    await LMStorageService.setItem(network.key + "_" + STORAGE_KEYS.CONTACTS, contacts);
    return {
        success: true,
        data: contacts
    };
}

async function list(params) {

    const {network} = params;
    //await LMStorageService.deleteItem(network.key+ "_" +STORAGE_KEYS.CONTACTS)
    const contacts = await LMStorageService.getItem(network.key + "_" + STORAGE_KEYS.CONTACTS) || [];
    return {
        success: true,
        data: contacts
    };
}

