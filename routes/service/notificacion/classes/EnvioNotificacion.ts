import {OneSignalMessage} from "./OneSignalMessage";

export class EnvioNotificacion {

    generarMensaje(tittuloNotificacion: string, detalleNotificacion: string, lstPlayerid: string[], key?: string, valor?: string, ruta?: string): OneSignalMessage {
        const mensaje = new OneSignalMessage();
        mensaje.app_id='7aefa706-f4b4-47cf-9c8f-7f1d9830fcda',
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
            "Authorization": "Basic YTExODU0MWEtYTkxZS00OWFiLTk2MTYtZjhmMWE5MDA5ODc0"
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
