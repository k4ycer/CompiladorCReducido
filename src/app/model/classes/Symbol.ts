import { SemanticTypes } from './../constants/SemanticTypes';
import { Token } from 'k4ycer-lexer';

export class IdentifierSymbol{
    public token: Token;
    public semanticType: SemanticTypes;    
    public semanticTypeString: string;    
    public scope: number;
    public value: any;
    public functionDefined: boolean;

    constructor(token: Token, semanticType?: SemanticTypes, scope?: number, functionDefined?: boolean){
        this.token = token;
        this.semanticType = semanticType;
        this.scope = scope;
        this.functionDefined = functionDefined;
    }
}