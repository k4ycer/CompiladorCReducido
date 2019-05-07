import { IdentifierSymbol } from './Symbol';
import { Token } from 'k4ycer-syntactic-analyzer';

export class SymbolTable{
    private symbols: IdentifierSymbol[];

    constructor(){
        this.symbols = [];
    }
    
    public addSymbol(newSymbol: IdentifierSymbol){
        if(this.symbols.find(symbol => (symbol.token.value == newSymbol.token.value) && (symbol.scope == newSymbol.scope))){
            throw new Error(`Error semántico: El simbolo ${newSymbol.token.value} ya existe en este ambito. linea ${newSymbol.token.line}, columna ${newSymbol.token.column}`);
        }

        this.symbols.push(newSymbol);
    }

    public getSymbol(token: Token, scope: number): IdentifierSymbol{
            return this.symbols.find(s => s.token.value == token.value && s.scope == scope);
    }

    public findSymbol(token: Token, scopeStack: number[]): IdentifierSymbol{
        let symbol;
        for(let scope of scopeStack){
            symbol = this.symbols.find(s => s.token.value == token.value && s.scope == scope);
            if(symbol){
                return symbol;
            }
        }

        return null;
    }

    public getSymbols(){
        return this.symbols;
    }
}