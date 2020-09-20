
// @ts-ignore
import * as vapid from "./vapid.json"
//const valor = require('src/assets/json/vapid.json')



module.exports.getKey = () => {
    return vapid.publicKey;
}


const ModuloJson = {
    getKey: function () {
        return vapid.privateKey;
    }
};
export {ModuloJson};

/*
export const obtenerKey = () => {
    return 'vapid.publicKeyll';
}
*/
