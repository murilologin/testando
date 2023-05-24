export class ClienteDTO {

    constructor(
        public id: number,
        public nome: string,
        public fantasia: string,
        public documento: string,
        public endereco: string
    ) {}
    
}