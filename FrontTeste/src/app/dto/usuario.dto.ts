export class UsuarioDTO {

    constructor(
        public username: string,
        public password: string,
        public name: string,
        public email?: string
    ) {}
    
}