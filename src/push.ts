// @ts-ignore
import * as vapid from "./assets/json/vapid.json"
//const valor = require('src/assets/json/vapid.json')



module.exports.getKey = () => {
    return vapid.publicKey;
}



function bar() {

    console.log('bar');

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
