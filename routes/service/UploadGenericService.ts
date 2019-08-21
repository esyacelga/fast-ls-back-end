import {Request, Response} from "express";
import {FileUpload} from "../../interfaces/file-upload";
import FileSystem from "../../classes/file-system";

const fileSystem = new FileSystem();

export const SubirImagen = async (req: Request, res: Response) => {


    console.log("Informacion del diectorio...");
    const path = req.get('directorio') || '';

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }
    if (!path) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se a indicado el directorio de creacion'
        });
    }

    console.log("Informacion del diectorio");
    console.log(path);

    // @ts-ignore
    const file: FileUpload = req.files.image;


    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal(file, path);
    res.json({
        ok: true,
        file: file.mimetype
    });

}
