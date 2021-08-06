if (!window.btoa) {
    window.btoa = require('Base64')
}

global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';

if (!__DEV__) {
    global.console.log = () => {}
}

var getRandomValues = function(byteArray) {
    var bytes = crypto.rng.randomBytes(byteArray.length);
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = bytes[i];
    }
};

global.crypto = { getRandomValues };
global.crypto.rng = require('react-native-randombytes');
global.crypto = require('crypto');
global.crypto.getRandomValues = getRandomValues;
global.crypto.rng = require('react-native-randombytes');
crypto.rng.seedSJCL();

global.location = {
    protocol: 'file:'
};
