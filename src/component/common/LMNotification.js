import React from 'react';
import {Popup,Toast} from 'popup-ui';
import {BackHandler} from 'react-native';
import LMImage from './LMImage';
function  backAction(){
    return true;
}
const LMNotification = {
    error: ({...config}) => {
        Toast.show({
            ...config,
            color: '#e74c3c',
            timing: 1000,
            icon: (
                <LMImage
                    source={require('../../../assets/img/close.png')}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                />
            ),
        })
    },
    success:  ({...config}) => {
        Toast.show({
            ...config,
            color: '#2ecc71',
            timing: 1000,
            icon: (
                <LMImage
                    source={require('../../../assets/img/tick.png')}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                />
            ),
        })
    },
    popupSuccess : (data) => {
        const {
            title,
            message,
            buttonText,
            callback
        } = data;
        BackHandler.addEventListener("hardwareBackPress", backAction);
        Popup.show({
            type: 'Success',
            title: title,
            button: true,
            textBody: message,
            buttontext: buttonText,
            autoClose: false,
            callback: ()=>{
                if(callback){
                    callback();
                }
                Popup.hide();
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            },
        })
    },
    popupError : (data) => {
        const {
            title,
            message,
            buttonText,
            callback
        } = data;
        BackHandler.addEventListener("hardwareBackPress", backAction);
        Popup.show({
            type: 'Danger',
            title: title,
            button: true,
            textBody: message,
            buttontext: buttonText,
            autoClose: true,
            callback: ()=>{
                if(callback){
                    callback();
                }
                Popup.hide();
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            },
        })
    }

};
export default LMNotification;
