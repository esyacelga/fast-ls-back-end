import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import Mail from "../../../commons/services/Mail";

const util = new CommonsMethods();


export const EnviarCorreo = (req: Request, res: Response) => {

    Mail.to = req.body.to;
    Mail.subject = req.body.subject;
    Mail.message = req.body.message

    let result = Mail.sendMail();
    console.log(result);
    res = util.responceCrear(req, res, null, result);

}





