export class ProdutoDTO {

    constructor(
        public id: number,
        public descricao: string,
        public codigoBarras: string,
        public valorVenda: number,
        public pesoBruto: number,
        public pesoLiquido: number   
    ) {}
    
}