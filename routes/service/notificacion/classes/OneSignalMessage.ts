export class OneSignalMessage {
    app_id: string = '207a69ab-4d96-44f8-a6ce-828f0eb13cf3';
    included_segments: string[];
    data: Data = new Data();
    contents: Contents = new Contents();
    headings: Headings = new Headings();
    include_player_ids: string[];
}


export class Data {
    key: string;
    valor: string;
    ruta: string;
}

export class Contents {
    en: string;
}

export class Headings {
    en: string;
}
