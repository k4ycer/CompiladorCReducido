import { SymbolTable } from './SymbolTable';
import { SemanticTypes } from './../constants/SemanticTypes';
import { SemanticParam } from './SemanticParam';
import { TokenTypes } from '../constants/TokenTypes';
import { SyntacticAnalyzer, Token } from 'k4ycer-syntactic-analyzer';
import { IdentifierSymbol } from './Symbol';

export class SyntacticAnalyzerCR extends SyntacticAnalyzer{
    symbolTable: SymbolTable;
    scopeCount: number;

    constructor(tokens: Token[], symbolTable: SymbolTable){        
        super(tokens);
        this.symbolTable = symbolTable;
        this.scopeCount = 0;

        this.setInitialRule(() => this.A(new SemanticParam({}, {scopeStack: [this.scopeCount]})));
    }

    private A(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleKeyword:
                this.Def(semanticParam);
                this.A(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.Def(semanticParam);
                this.A(semanticParam);
                break;
            case TokenTypes.PesoToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private B(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.CloseBraceToken:
                return;
                break;
            case TokenTypes.DoubleKeyword:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.ForKeyword:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.IfKeyword:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.ReturnKeyword:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            case TokenTypes.WhileKeyword:
                this.Stmtall(semanticParam);
                this.B(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Def(semanticParam: SemanticParam) {
        let identifier;
        let defpSynth: SemanticParam;
        switch (this.currentToken.type) {            
            case TokenTypes.DoubleKeyword:            
                this.Type(semanticParam);
                identifier = JSON.parse(JSON.stringify(this.currentToken));
                this.consume(TokenTypes.Identifier);
                semanticParam.inherited.type = SemanticTypes.Double;
                defpSynth = this.Defp(semanticParam);                

                // Semantico
                // Si es una funcion entonces en caso de ser definida la agreamos a la tabla y en caso de ser declarada
                // solo checamos que el tipo corresponda a la de la tabla de simbolos
                // en caso de ser una variable solo la agregamos
                if(defpSynth){
                    if(defpSynth.synthesized.funDefined){
                        this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Double, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1], true));
                    }else if(defpSynth.synthesized.funDeclared){
                        let declaredSymbol = this.symbolTable.getSymbol(identifier, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]);
                        if(declaredSymbol){
                            if(declaredSymbol.semanticType != SemanticTypes.Double){
                                throw new Error(`La declaracion de la funcion ${identifier.value} no coincide con su definicion`);
                            }
                        }else{
                            this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Double, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1], false));
                        }
                    }
                }else{
                    this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Double, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]));
                }            
                // Fin Semantico
                break;
            case TokenTypes.IntKeyword:
                this.Type(semanticParam);     
                identifier = JSON.parse(JSON.stringify(this.currentToken));           
                this.consume(TokenTypes.Identifier);
                semanticParam.inherited.type = SemanticTypes.Integer;
                defpSynth = this.Defp(semanticParam);                

                // Semantico
                // Si es una funcion entonces en caso de ser definida la agreamos a la tabla y en caso de ser declarada
                // solo checamos que el tipo corresponda a la de la tabla de simbolos
                // en caso de ser una variable solo la agregamos
                if(defpSynth){
                    if(defpSynth.synthesized.funDefined){
                        this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Integer, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1], true));
                    }else if(defpSynth.synthesized.funDeclared){
                        let declaredSymbol = this.symbolTable.getSymbol(identifier, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]);
                        if(declaredSymbol){
                            if(declaredSymbol.semanticType != SemanticTypes.Integer){
                                throw new Error(`La declaracion de la funcion ${identifier.value} no coincide con su definicion`);
                            }
                        }else{
                            this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Integer, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1], false));
                        }
                    }
                }else{
                    this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Integer, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]));
                }            
                // Fin Semantico
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Deflist(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleKeyword:
                this.A(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.A(semanticParam);
                break;
            case TokenTypes.PesoToken:
                this.A(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Defp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CommaToken:
                this.Vardef(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.OpenParenToken:
                return this.Fundef(semanticParam);
            case TokenTypes.EqualsToken:
                this.Vardef(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.SemicolonToken:
                this.Vardef(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private E(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                this.consume(TokenTypes.AmpersandAmpersandToken);
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Expr(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Expror(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Expror(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Expror(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Expror(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Expror(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Expror(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Expror(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Expradd(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprand(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Exprcomp(semanticParam);
                this.E(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprcomp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprlist(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.ExclamationToken:
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprlistcont(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                this.consume(TokenTypes.CommaToken);
                this.Expr(semanticParam);
                this.Exprlistcont(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprmul(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Expror(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprand(semanticParam);
                this.Exprorp(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Exprand(semanticParam);
                this.Exprorp(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprand(semanticParam);
                this.Exprorp(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprand(semanticParam);
                this.Exprorp(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Exprand(semanticParam);
                this.Exprorp(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Exprand(semanticParam);
                this.Exprorp(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Exprand(semanticParam);
                this.Exprorp(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprorp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprprimary(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.Identifier:
                // Checamos que el identificador que vamos a usar este dentro del scope actual
                let identifierCheck = this.symbolTable.findSymbol(this.currentToken, semanticParam.inherited.scopeStack);                    
                if(!identifierCheck){
                    throw new Error(`Error semantico: El identifiador ${this.currentToken.value} no existe en el ambito actual. Linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
                }
                if(identifierCheck.scope > semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]){
                    throw new Error(`Error semantico: El identifiador ${this.currentToken.value} no existe en el ambito actual. Linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
                }
                
                this.consume(TokenTypes.Identifier);
                this.Exprprimaryp(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Lit(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Lit(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.consume(TokenTypes.OpenParenToken);
                this.Expr(semanticParam);
                this.consume(TokenTypes.CloseParenToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprprimaryp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                return;
                break;
            case TokenTypes.AsteriskToken:
                return;
                break;
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.EqualsEqualsToken:
                return;
                break;
            case TokenTypes.ExclamationEqualsToken:
                return;
                break;
            case TokenTypes.GreaterThanEqualsToken:
                return;
                break;
            case TokenTypes.GreaterThanToken:
                return;
                break;
            case TokenTypes.LessThanEqualsToken:
                return;
                break;
            case TokenTypes.LessThanToken:
                return;
                break;
            case TokenTypes.MinusToken:
                return;
                break;
            case TokenTypes.OpenParenToken:
                this.consume(TokenTypes.OpenParenToken);
                this.Exprlist(semanticParam);
                this.consume(TokenTypes.CloseParenToken);
                break;
            case TokenTypes.PercentToken:
                return;
                break;
            case TokenTypes.PlusToken:
                return;
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            case TokenTypes.SlashToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprrel(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprunary(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Opunary(semanticParam);
                this.Exprunary(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Exprprimary(semanticParam);
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprprimary(semanticParam);
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprprimary(semanticParam);
                break;
            case TokenTypes.MinusToken:
                this.Opunary(semanticParam);
                this.Exprunary(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Exprprimary(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Opunary(semanticParam);
                this.Exprunary(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private F(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                return;
                break;
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.EqualsEqualsToken:
                this.Opcomp(semanticParam);
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.ExclamationEqualsToken:
                this.Opcomp(semanticParam);
                this.Exprrel(semanticParam);
                this.F(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Flowcontrol(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ForKeyword:
                this.Stmtfor(semanticParam);
                break;
            case TokenTypes.IfKeyword:
                this.Stmtif(semanticParam);
                break;
            case TokenTypes.WhileKeyword:
                this.Stmtwhile(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Fundef(semanticParam: SemanticParam) {
        let fundefpSynth: SemanticParam;
        switch (this.currentToken.type) {
            case TokenTypes.OpenParenToken:
                semanticParam.inherited.scopeStack.push(++this.scopeCount);  
                this.consume(TokenTypes.OpenParenToken);
                this.Paramlist(semanticParam);
                this.consume(TokenTypes.CloseParenToken);
                fundefpSynth = this.Fundefp(semanticParam);
                semanticParam.inherited.scopeStack.pop();  

                // return if it was a function definition or declaration
                return new SemanticParam({
                    funDefined: fundefpSynth.synthesized.funDefined,
                    funDeclared: fundefpSynth.synthesized.funDeclared,
                });
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Fundefp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.OpenBraceToken:
                this.consume(TokenTypes.OpenBraceToken);                              
                this.Stmtlist(semanticParam);
                this.consume(TokenTypes.CloseBraceToken);                
                return new SemanticParam({funDeclared: true});
            case TokenTypes.SemicolonToken:
                this.consume(TokenTypes.SemicolonToken);
                return new SemanticParam({funDefined: true});
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private G(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                return;
                break;
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.EqualsEqualsToken:
                return;
                break;
            case TokenTypes.ExclamationEqualsToken:
                return;
                break;
            case TokenTypes.GreaterThanEqualsToken:
                this.Oprel(semanticParam);
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.GreaterThanToken:
                this.Oprel(semanticParam);
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.LessThanEqualsToken:
                this.Oprel(semanticParam);
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.LessThanToken:
                this.Oprel(semanticParam);
                this.Expradd(semanticParam);
                this.G(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private H(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                return;
                break;
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.EqualsEqualsToken:
                return;
                break;
            case TokenTypes.ExclamationEqualsToken:
                return;
                break;
            case TokenTypes.GreaterThanEqualsToken:
                return;
                break;
            case TokenTypes.GreaterThanToken:
                return;
                break;
            case TokenTypes.LessThanEqualsToken:
                return;
                break;
            case TokenTypes.LessThanToken:
                return;
                break;
            case TokenTypes.MinusToken:
                this.Opadd(semanticParam);
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.PlusToken:
                this.Opadd(semanticParam);
                this.Exprmul(semanticParam);
                this.H(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private I(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                return;
                break;
            case TokenTypes.AsteriskToken:
                this.Opmul(semanticParam);
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.EqualsEqualsToken:
                return;
                break;
            case TokenTypes.ExclamationEqualsToken:
                return;
                break;
            case TokenTypes.GreaterThanEqualsToken:
                return;
                break;
            case TokenTypes.GreaterThanToken:
                return;
                break;
            case TokenTypes.LessThanEqualsToken:
                return;
                break;
            case TokenTypes.LessThanToken:
                return;
                break;
            case TokenTypes.MinusToken:
                return;
                break;
            case TokenTypes.PercentToken:
                this.Opmul(semanticParam);
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            case TokenTypes.PlusToken:
                return;
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            case TokenTypes.SlashToken:
                this.Opmul(semanticParam);
                this.Exprunary(semanticParam);
                this.I(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Lit(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleLiteral:
                this.consume(TokenTypes.DoubleLiteral);
                break;
            case TokenTypes.IntegerLiteral:
                this.consume(TokenTypes.IntegerLiteral);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Opadd(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.MinusToken:
                this.consume(TokenTypes.MinusToken);
                break;
            case TokenTypes.PlusToken:
                this.consume(TokenTypes.PlusToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Opcomp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.EqualsEqualsToken:
                this.consume(TokenTypes.EqualsEqualsToken);
                break;
            case TokenTypes.ExclamationEqualsToken:
                this.consume(TokenTypes.ExclamationEqualsToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Opmul(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.AsteriskToken:
                this.consume(TokenTypes.AsteriskToken);
                break;
            case TokenTypes.PercentToken:
                this.consume(TokenTypes.PercentToken);
                break;
            case TokenTypes.SlashToken:
                this.consume(TokenTypes.SlashToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Oprel(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.GreaterThanEqualsToken:
                this.consume(TokenTypes.GreaterThanEqualsToken);
                break;
            case TokenTypes.GreaterThanToken:
                this.consume(TokenTypes.GreaterThanToken);
                break;
            case TokenTypes.LessThanEqualsToken:
                this.consume(TokenTypes.LessThanEqualsToken);
                break;
            case TokenTypes.LessThanToken:
                this.consume(TokenTypes.LessThanToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Opunary(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.consume(TokenTypes.ExclamationToken);
                break;
            case TokenTypes.MinusToken:
                this.consume(TokenTypes.MinusToken);
                break;
            case TokenTypes.PlusToken:
                this.consume(TokenTypes.PlusToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Paramlist(semanticParam: SemanticParam) {
        let identifier;
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.DoubleKeyword:
                this.Type(semanticParam);
                identifier = JSON.parse(JSON.stringify(this.currentToken));
                this.consume(TokenTypes.Identifier);
                this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Double, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1], true));
                this.Paramlistcont(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.Type(semanticParam);
                identifier = JSON.parse(JSON.stringify(this.currentToken));
                this.consume(TokenTypes.Identifier);
                this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Integer, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1], true));
                this.Paramlistcont(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Paramlistcont(semanticParam: SemanticParam) {
        let identifier;
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                this.consume(TokenTypes.CommaToken);
                let semanticType = this.Type(semanticParam);
                identifier = JSON.parse(JSON.stringify(this.currentToken));
                this.consume(TokenTypes.Identifier);
                this.symbolTable.addSymbol(new IdentifierSymbol(identifier, semanticType.synthesized.type, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1], true));
                this.Paramlistcont(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Program(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleKeyword:
                this.Deflist(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.Deflist(semanticParam);
                break;
            case TokenTypes.PesoToken:
                this.Deflist(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmt(semanticParam: SemanticParam) {
        let identifier;

        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.Stmtbreak(semanticParam);
                break;
            case TokenTypes.CloseParenToken:
                this.Stmtempty(semanticParam);
                break;
            case TokenTypes.DoubleKeyword:
                this.Type(semanticParam);
                identifier = JSON.parse(JSON.stringify(this.currentToken));
                semanticParam.inherited.type = SemanticTypes.Double;
                this.consume(TokenTypes.Identifier);
                this.Varinit(semanticParam);
                this.Vardefcont(semanticParam);
                this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Double, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]));
                break;
            case TokenTypes.Identifier:
                // Checamos que el identificador que vamos a usar este dentro del scope actual
                let identifierCheck = this.symbolTable.findSymbol(this.currentToken, semanticParam.inherited.scopeStack);                
                if(!identifierCheck){
                    throw new Error(`Error semantico: El identifiador ${this.currentToken.value} no existe en el ambito actual. Linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
                }
                if(identifierCheck.scope > semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]){
                    throw new Error(`Error semantico: El identifiador ${this.currentToken.value} no existe en el ambito actual. Linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
                }
                
                this.consume(TokenTypes.Identifier);
                this.Stmtp(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.Type(semanticParam);
                identifier = JSON.parse(JSON.stringify(this.currentToken));
                semanticParam.inherited.type = SemanticTypes.Integer;
                this.consume(TokenTypes.Identifier);
                this.Varinit(semanticParam);
                this.Vardefcont(semanticParam);
                this.symbolTable.addSymbol(new IdentifierSymbol(identifier, SemanticTypes.Integer, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]));
                break;
            case TokenTypes.ReturnKeyword:
                this.Stmtreturn(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                this.Stmtempty(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtall(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.Stmt(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.DoubleKeyword:
                this.Stmt(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.ForKeyword:
                this.Flowcontrol(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.Stmt(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.IfKeyword:
                this.Flowcontrol(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.Stmt(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.ReturnKeyword:
                this.Stmt(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.SemicolonToken:
                this.Stmt(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.WhileKeyword:
                this.Flowcontrol(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtassign(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.EqualsToken:
                this.consume(TokenTypes.EqualsToken);
                this.Expr(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtbreak(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.consume(TokenTypes.BreakKeyword);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtdecr(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.MinusMinusToken:
                this.consume(TokenTypes.MinusMinusToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtempty(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtfor(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ForKeyword:
                this.consume(TokenTypes.ForKeyword);
                this.consume(TokenTypes.OpenParenToken);
                this.Stmt(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                this.Expr(semanticParam);
                this.consume(TokenTypes.SemicolonToken);
                this.Stmt(semanticParam);
                this.consume(TokenTypes.CloseParenToken);
                this.consume(TokenTypes.OpenBraceToken);
                semanticParam.inherited.scopeStack.push(++this.scopeCount);
                this.Stmtlist(semanticParam);
                this.consume(TokenTypes.CloseBraceToken);
                semanticParam.inherited.scopeStack.pop();  
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtfuncall(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.OpenParenToken:
                this.consume(TokenTypes.OpenParenToken);
                this.Exprlist(semanticParam);
                this.consume(TokenTypes.CloseParenToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtif(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.IfKeyword:
                this.consume(TokenTypes.IfKeyword);
                this.consume(TokenTypes.OpenParenToken);
                this.Expr(semanticParam);
                this.consume(TokenTypes.CloseParenToken);
                this.consume(TokenTypes.OpenBraceToken);
                semanticParam.inherited.scopeStack.push(++this.scopeCount);
                this.Stmtlist(semanticParam);
                this.consume(TokenTypes.CloseBraceToken);
                semanticParam.inherited.scopeStack.pop();  
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtincr(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.PlusPlusToken:
                this.consume(TokenTypes.PlusPlusToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtlist(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.B(semanticParam);
                break;
            case TokenTypes.CloseBraceToken:
                this.B(semanticParam);
                break;
            case TokenTypes.DoubleKeyword:
                this.B(semanticParam);
                break;
            case TokenTypes.ForKeyword:
                this.B(semanticParam);
                break;
            case TokenTypes.Identifier:
                this.B(semanticParam);
                break;
            case TokenTypes.IfKeyword:
                this.B(semanticParam);
                break;
            case TokenTypes.IntKeyword:
                this.B(semanticParam);
                break;
            case TokenTypes.ReturnKeyword:
                this.B(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                this.B(semanticParam);
                break;
            case TokenTypes.WhileKeyword:
                this.B(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.EqualsToken:
                this.Stmtassign(semanticParam);
                break;
            case TokenTypes.MinusMinusToken:
                this.Stmtdecr(semanticParam);
                break;
            case TokenTypes.OpenParenToken:
                this.Stmtfuncall(semanticParam);
                break;
            case TokenTypes.PlusPlusToken:
                this.Stmtincr(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtreturn(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.ReturnKeyword:
                this.consume(TokenTypes.ReturnKeyword);
                this.Expr(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtwhile(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.WhileKeyword:
                this.consume(TokenTypes.WhileKeyword);
                this.consume(TokenTypes.OpenParenToken);
                this.Expr(semanticParam);
                this.consume(TokenTypes.CloseParenToken);
                this.consume(TokenTypes.OpenBraceToken);
                semanticParam.inherited.scopeStack.push(++this.scopeCount);
                this.Stmtlist(semanticParam);
                this.consume(TokenTypes.CloseBraceToken);
                semanticParam.inherited.scopeStack.pop();  
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Type(semanticParam: SemanticParam): SemanticParam {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleKeyword:
                this.consume(TokenTypes.DoubleKeyword);
                return new SemanticParam({type: SemanticTypes.Double});
            case TokenTypes.IntKeyword:
                this.consume(TokenTypes.IntKeyword);
                return new SemanticParam({type: SemanticTypes.Integer});
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Vardef(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CommaToken:
                this.Varinit(semanticParam);
                this.Vardefcont(semanticParam);
                break;
            case TokenTypes.EqualsToken:
                this.Varinit(semanticParam);
                this.Vardefcont(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                this.Varinit(semanticParam);
                this.Vardefcont(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Vardefcont(semanticParam: SemanticParam) {
        let identifier;

        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                this.consume(TokenTypes.CommaToken);
                identifier = JSON.parse(JSON.stringify(this.currentToken));
                this.consume(TokenTypes.Identifier);
                this.Varinit(semanticParam);
                this.Vardefcont(semanticParam);
                this.symbolTable.addSymbol(new IdentifierSymbol(identifier, semanticParam.inherited.type, semanticParam.inherited.scopeStack[semanticParam.inherited.scopeStack.length - 1]));
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Varinit(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                this.Varinitp(semanticParam);
                break;
            case TokenTypes.CommaToken:
                this.Varinitp(semanticParam);
                break;
            case TokenTypes.EqualsToken:
                this.Varinitp(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                this.Varinitp(semanticParam);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Varinitp(semanticParam: SemanticParam) {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.EqualsToken:
                this.consume(TokenTypes.EqualsToken);
                this.Expr(semanticParam);
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
}