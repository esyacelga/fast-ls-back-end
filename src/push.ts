// @ts-ignore
import * as vapid from "./vapid.json"
import {decode} from "urlsafe-base64";
//const valor = require('src/assets/json/vapid.json')


module.exports.getKey = () => {
    return vapid.publicKey;
}


const ModuloJson = {
    getKey: function () {
        return vapid.privateKey;
        //return vapid.privateKey);
    }
};
export {ModuloJson};

