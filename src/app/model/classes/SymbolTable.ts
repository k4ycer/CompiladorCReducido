import { IdentifierSymbol } from './Symbol';
import { Token } from 'k4ycer-syntactic-analyzer';

export class SymbolTable{
    private symbols: IdentifierSymbol[];
    
    public addSymbol(newSymbol: IdentifierSymbol){
        if(this.symbols.find(symbol => (symbol.token.value == newSymbol.token.value) && (symbol.scope == newSymbol.scope))){
            throw new Error(`El simbolo ${newSymbol.token.value} ya existe en este ambito`);
        }

        this.symbols.push(newSymbol);
    }

    public getSymbol(token: Token, scope: number): IdentifierSymbol{
        let symbol;

        symbol = this.symbols.find(s => s.token.value == token.value && s.scope == scope);
        if(!symbol){
            throw new Error(`El simbolo ${token.value} no existe en el ambito especificado`);
        }

        return symbol;
    }
}