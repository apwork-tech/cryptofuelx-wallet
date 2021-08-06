import {ContactService} from './ContactService';
import {addContactSuccess, getContactsSuccess, removeContactSuccess, updateContactSuccess} from './ContactReducer';

export const ContactAction = {
    add,
    list,
    update,
    remove,
};

function add(params) {
    return async dispatch => {
        const {success, data} = await ContactService.add(params);
        if (success) {
            dispatch(addContactSuccess(data));
        }
        return {success}
    };
}

function update(params) {
    return async dispatch => {
        const {success, data} = await ContactService.update(params);
        if (success) {
            dispatch(updateContactSuccess(data));
        }
        return {success}
    };
}

function remove(params) {
    return async dispatch => {
        const {success, data} = await ContactService.remove(params);
        if (success) {
            dispatch(removeContactSuccess(data));
        }
    };
}

function list(params) {
    return async dispatch => {
        const {success, data} = await ContactService.list(params);
        if (success) {
            dispatch(getContactsSuccess(data));
        }
    };
}
