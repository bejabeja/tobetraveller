export class Currency {
    constructor(code, symbol) {
        if (!code || !symbol) {
            return new Error('Currency code and symbol are required');
        }
        this.code = code;
        this.symbol = symbol;
    }
}