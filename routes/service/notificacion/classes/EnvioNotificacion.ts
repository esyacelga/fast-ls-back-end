import {OneSignalMessage} from "./OneSignalMessage";

export class EnvioNotificacion {

    generarMensaje(tittuloNotificacion: string, detalleNotificacion: string, lstPlayerid: string[], key?: string, valor?: string, ruta?: string): OneSignalMessage {
        const mensaje = new OneSignalMessage();
        mensaje.app_id='207a69ab-4d96-44f8-a6ce-828f0eb13cf3',
        mensaje.headings.en = tittuloNotificacion;
        mensaje.contents.en = detalleNotificacion;
        mensaje.include_player_ids = lstPlayerid;
        mensaje.data.key = key || '';
        mensaje.data.ruta = ruta || '';
        mensaje.data.valor = valor || '';
        return mensaje;
    }


    enviar(tittuloNotificacion: string, detalleNotificacion: string, lstPlayerid: string[], key?: string, valor?: string, ruta?: string) {
        const data = this.generarMensaje(tittuloNotificacion, detalleNotificacion, lstPlayerid, key, valor, ruta);
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"
        };
        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var https = require('https');
        var req = https.request(options, function (res: any) {
            res.on('data', function (data: any) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        req.on('error', function (e: any) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    }


}
