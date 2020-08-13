import {OneSignalMessage} from "./OneSignalMessage";

export class EnvioNotificacion {

    generarMensaje(tittuloNotificacion: string, detalleNotificacion: string, lstPlayerid: string[], key?: string, valor?: string, ruta?: string): OneSignalMessage {
        const mensaje = new OneSignalMessage();
        mensaje.app_id='e48a33c1-ca2e-48f9-88e5-3948eda929d1',
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
            "Authorization": "Basic YmNlYTk1YWMtMWJhYS00MjU0LWJlNDQtZGZhMzc1YWVkYzZj"
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
            console.error("ERROR:");
            console.error(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    }


}
