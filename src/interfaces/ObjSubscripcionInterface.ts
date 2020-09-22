export interface KeyInteface {
    auth: string;
    p256dh: string;
}

export class KeyClass {
    auth: string;
    p256dh: string;

    constructor(auth: string, p256dh: string) {
        this.auth = auth;
        this.p256dh = p256dh;
    }
}


export interface ObjSubscripcionInterface {
    endpoint: string;
    keys: KeyInteface;
}

export class ObjSubscripcionClass {
    public auth: string;
    public p256dh: string;
    public endpoint: string;

    constructor(auth: string, p256dh: string, endpoint: string) {
        this.auth = auth;
        this.p256dh = p256dh;
        this.endpoint = endpoint;
    }
}


export class PushSubscriptionClass {
    public endpoint: string;
    public keys: KeyClass;
    constructor(endpoint: string, keys: KeyClass) {
        this.endpoint = endpoint;
        this.keys = keys;
    }
}
