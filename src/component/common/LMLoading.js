import React, {Component} from 'react';
import {LoadingIndicator} from 'react-native-expo-fancy-alerts';
import {BackHandler} from "react-native";

class LMLoading extends Component {
    static _ref = null;

    static setRef(ref = {}) {
        this._ref = ref;
    }

    static getRef() {
        return this._ref;
    }

    static clearRef() {
        this._ref = null;
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    backAction() {
        return true;
    }

    _setState(reducer) {
        return new Promise((resolve) => this.setState(reducer, () => resolve()));
    }

    show() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this._setState({show: true})
    }

    hide() {
        this._setState({show: false})
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    static show() {
        this._ref.show();
    }

    static hide() {
        this._ref.hide();
    }

    render() {
        const {show} = this.state;
        return <LoadingIndicator visible={show}/>;
    }

};
export default LMLoading;
