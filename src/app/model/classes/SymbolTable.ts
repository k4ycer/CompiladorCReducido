import { IdentifierSymbol } from './Symbol';
import { Token } from 'k4ycer-syntactic-analyzer';

export class SymbolTable{
    private symbols: IdentifierSymbol[];

    constructor(){
        this.symbols = [];
    }
    
    public addSymbol(newSymbol: IdentifierSymbol){
        if(this.symbols.find(symbol => (symbol.token.value == newSymbol.token.value) && (symbol.scope == newSymbol.scope))){
            throw new Error(`El simbolo ${newSymbol.token.value} ya existe en este ambito`);
        }

        this.symbols.push(newSymbol);
    }

    public getSymbol(token: Token, scope: number): IdentifierSymbol{
        return this.symbols.find(s => s.token.value == token.value && s.scope == scope);
    }
}