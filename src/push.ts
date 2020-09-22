// @ts-ignore
import * as vapid from "./vapid.json"


module.exports.getKey = () => {
    return vapid.publicKey;
}


const ModuloJson = {
    getKey: function () {
        return vapid.publicKey;
    }
};
export {ModuloJson};

