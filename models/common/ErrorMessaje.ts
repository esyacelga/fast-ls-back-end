export class ErrorMessaje {
    // @ts-ignore
    errors: Errors = undefined;

    constructor(message: string, opcion: boolean) {
        this.errors = new Errors(message, opcion);
    }
}

export class Errors {
    // @ts-ignore
    errors: ErrorExtend = undefined;

    constructor(message: string, opcion: boolean) {
        this.errors = new ErrorExtend(message, opcion);
    }
}

export class ErrorExtend {
    message: string = '';
    mostrarDetalle: boolean = false;

    constructor(message: string, opcion: boolean) {
        this.message = message;
        this.mostrarDetalle = opcion;
    }
}
