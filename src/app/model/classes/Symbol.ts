import { SemanticTypes } from './../constants/SemanticTypes';
import { Token } from 'k4ycer-lexer';

export class IdentifierSymbol{
    public token: Token;
    public semanticType: SemanticTypes;
    public scope: number;
    public value: any;

    constructor(token: Token, semanticType?: SemanticTypes, scope?: number){
        this.token = token;
        this.semanticType = semanticType;
        this.scope = scope;
    }
}