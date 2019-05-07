import { SymbolTable } from './SymbolTable';
import { SemanticTypes } from './../constants/SemanticTypes';
import { SemanticParam } from './SemanticParam';
import { TokenTypes } from '../constants/TokenTypes';
import { SyntacticAnalyzer, Token } from 'k4ycer-syntactic-analyzer';

export class SyntacticAnalyzerCR extends SyntacticAnalyzer{
    symbolTable: SymbolTable

    constructor(tokens: Token[], symbolTable: SymbolTable){        
        super(tokens);
        this.symbolTable = symbolTable;

        this.setInitialRule(this.A);
    }

    private A() {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleKeyword:
                this.Def();
                this.A();
                break;
            case TokenTypes.IntKeyword:
                this.Def();
                this.A();
                break;
            case TokenTypes.PesoToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private B() {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.CloseBraceToken:
                return;
                break;
            case TokenTypes.DoubleKeyword:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.ForKeyword:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.Identifier:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.IfKeyword:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.IntKeyword:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.ReturnKeyword:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.SemicolonToken:
                this.Stmtall();
                this.B();
                break;
            case TokenTypes.WhileKeyword:
                this.Stmtall();
                this.B();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Def() {
        switch (this.currentToken.type) {            
            case TokenTypes.DoubleKeyword:
                // Semantico
                

                this.Type();
                this.consume(TokenTypes.Identifier);
                this.Defp();
                break;
            case TokenTypes.IntKeyword:
                this.Type();
                this.consume(TokenTypes.Identifier);
                this.Defp();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Deflist() {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleKeyword:
                this.A();
                break;
            case TokenTypes.IntKeyword:
                this.A();
                break;
            case TokenTypes.PesoToken:
                this.A();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Defp() {
        switch (this.currentToken.type) {
            case TokenTypes.CommaToken:
                this.Vardef();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.OpenParenToken:
                this.Fundef();
                break;
            case TokenTypes.EqualsToken:
                this.Vardef();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.SemicolonToken:
                this.Vardef();
                this.consume(TokenTypes.SemicolonToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private E() {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                this.consume(TokenTypes.AmpersandAmpersandToken);
                this.Exprcomp();
                this.E();
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
    
    
    private Expr() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Expror();
                break;
            case TokenTypes.Identifier:
                this.Expror();
                break;
            case TokenTypes.DoubleLiteral:
                this.Expror();
                break;
            case TokenTypes.IntegerLiteral:
                this.Expror();
                break;
            case TokenTypes.MinusToken:
                this.Expror();
                break;
            case TokenTypes.OpenParenToken:
                this.Expror();
                break;
            case TokenTypes.PlusToken:
                this.Expror();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Expradd() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.Identifier:
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.MinusToken:
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.OpenParenToken:
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.PlusToken:
                this.Exprmul();
                this.H();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprand() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprcomp();
                this.E();
                break;
            case TokenTypes.Identifier:
                this.Exprcomp();
                this.E();
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprcomp();
                this.E();
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprcomp();
                this.E();
                break;
            case TokenTypes.MinusToken:
                this.Exprcomp();
                this.E();
                break;
            case TokenTypes.OpenParenToken:
                this.Exprcomp();
                this.E();
                break;
            case TokenTypes.PlusToken:
                this.Exprcomp();
                this.E();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprcomp() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.Identifier:
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.MinusToken:
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.OpenParenToken:
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.PlusToken:
                this.Exprrel();
                this.F();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprlist() {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.ExclamationToken:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.Identifier:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.DoubleLiteral:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.IntegerLiteral:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.MinusToken:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.OpenParenToken:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.PlusToken:
                this.Expr();
                this.Exprlistcont();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprlistcont() {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                this.consume(TokenTypes.CommaToken);
                this.Expr();
                this.Exprlistcont();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprmul() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprunary();
                this.I();
                break;
            case TokenTypes.Identifier:
                this.Exprunary();
                this.I();
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprunary();
                this.I();
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprunary();
                this.I();
                break;
            case TokenTypes.MinusToken:
                this.Exprunary();
                this.I();
                break;
            case TokenTypes.OpenParenToken:
                this.Exprunary();
                this.I();
                break;
            case TokenTypes.PlusToken:
                this.Exprunary();
                this.I();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Expror() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Exprand();
                this.Exprorp();
                break;
            case TokenTypes.Identifier:
                this.Exprand();
                this.Exprorp();
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprand();
                this.Exprorp();
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprand();
                this.Exprorp();
                break;
            case TokenTypes.MinusToken:
                this.Exprand();
                this.Exprorp();
                break;
            case TokenTypes.OpenParenToken:
                this.Exprand();
                this.Exprorp();
                break;
            case TokenTypes.PlusToken:
                this.Exprand();
                this.Exprorp();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprorp() {
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
    
    
    private Exprprimary() {
        switch (this.currentToken.type) {
            case TokenTypes.Identifier:
                this.consume(TokenTypes.Identifier);
                this.Exprprimaryp();
                break;
            case TokenTypes.DoubleLiteral:
                this.Lit();
                break;
            case TokenTypes.IntegerLiteral:
                this.Lit();
                break;
            case TokenTypes.OpenParenToken:
                this.consume(TokenTypes.OpenParenToken);
                this.Expr();
                this.consume(TokenTypes.CloseParenToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprprimaryp() {
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
                this.Exprlist();
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
    
    
    private Exprrel() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Expradd();
                this.G();
                break;
            case TokenTypes.Identifier:
                this.Expradd();
                this.G();
                break;
            case TokenTypes.DoubleLiteral:
                this.Expradd();
                this.G();
                break;
            case TokenTypes.IntegerLiteral:
                this.Expradd();
                this.G();
                break;
            case TokenTypes.MinusToken:
                this.Expradd();
                this.G();
                break;
            case TokenTypes.OpenParenToken:
                this.Expradd();
                this.G();
                break;
            case TokenTypes.PlusToken:
                this.Expradd();
                this.G();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Exprunary() {
        switch (this.currentToken.type) {
            case TokenTypes.ExclamationToken:
                this.Opunary();
                this.Exprunary();
                break;
            case TokenTypes.Identifier:
                this.Exprprimary();
                break;
            case TokenTypes.DoubleLiteral:
                this.Exprprimary();
                break;
            case TokenTypes.IntegerLiteral:
                this.Exprprimary();
                break;
            case TokenTypes.MinusToken:
                this.Opunary();
                this.Exprunary();
                break;
            case TokenTypes.OpenParenToken:
                this.Exprprimary();
                break;
            case TokenTypes.PlusToken:
                this.Opunary();
                this.Exprunary();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private F() {
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
                this.Opcomp();
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.ExclamationEqualsToken:
                this.Opcomp();
                this.Exprrel();
                this.F();
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Flowcontrol() {
        switch (this.currentToken.type) {
            case TokenTypes.ForKeyword:
                this.Stmtfor();
                break;
            case TokenTypes.IfKeyword:
                this.Stmtif();
                break;
            case TokenTypes.WhileKeyword:
                this.Stmtwhile();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Fundef() {
        switch (this.currentToken.type) {
            case TokenTypes.OpenParenToken:
                this.consume(TokenTypes.OpenParenToken);
                this.Paramlist();
                this.consume(TokenTypes.CloseParenToken);
                this.Fundefp();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Fundefp() {
        switch (this.currentToken.type) {
            case TokenTypes.OpenBraceToken:
                this.consume(TokenTypes.OpenBraceToken);
                this.Stmtlist();
                this.consume(TokenTypes.CloseBraceToken);
                break;
            case TokenTypes.SemicolonToken:
                this.consume(TokenTypes.SemicolonToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private G() {
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
                this.Oprel();
                this.Expradd();
                this.G();
                break;
            case TokenTypes.GreaterThanToken:
                this.Oprel();
                this.Expradd();
                this.G();
                break;
            case TokenTypes.LessThanEqualsToken:
                this.Oprel();
                this.Expradd();
                this.G();
                break;
            case TokenTypes.LessThanToken:
                this.Oprel();
                this.Expradd();
                this.G();
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private H() {
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
                this.Opadd();
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.PlusToken:
                this.Opadd();
                this.Exprmul();
                this.H();
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private I() {
        switch (this.currentToken.type) {
            case TokenTypes.AmpersandAmpersandToken:
                return;
                break;
            case TokenTypes.AsteriskToken:
                this.Opmul();
                this.Exprunary();
                this.I();
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
                this.Opmul();
                this.Exprunary();
                this.I();
                break;
            case TokenTypes.PlusToken:
                return;
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            case TokenTypes.SlashToken:
                this.Opmul();
                this.Exprunary();
                this.I();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Lit() {
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
    
    
    private Opadd() {
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
    
    
    private Opcomp() {
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
    
    
    private Opmul() {
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
    
    
    private Oprel() {
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
    
    
    private Opunary() {
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
    
    
    private Paramlist() {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.DoubleKeyword:
                this.Type();
                this.consume(TokenTypes.Identifier);
                this.Paramlistcont();
                break;
            case TokenTypes.IntKeyword:
                this.Type();
                this.consume(TokenTypes.Identifier);
                this.Paramlistcont();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Paramlistcont() {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                this.consume(TokenTypes.CommaToken);
                this.Type();
                this.consume(TokenTypes.Identifier);
                this.Paramlistcont();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Program() {
        switch (this.currentToken.type) {
            case TokenTypes.DoubleKeyword:
                this.Deflist();
                break;
            case TokenTypes.IntKeyword:
                this.Deflist();
                break;
            case TokenTypes.PesoToken:
                this.Deflist();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmt() {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.Stmtbreak();
                break;
            case TokenTypes.CloseParenToken:
                this.Stmtempty();
                break;
            case TokenTypes.DoubleKeyword:
                this.Type();
                this.consume(TokenTypes.Identifier);
                this.Varinit();
                this.Vardefcont();
                break;
            case TokenTypes.Identifier:
                this.consume(TokenTypes.Identifier);
                this.Stmtp();
                break;
            case TokenTypes.IntKeyword:
                this.Type();
                this.consume(TokenTypes.Identifier);
                this.Varinit();
                this.Vardefcont();
                break;
            case TokenTypes.ReturnKeyword:
                this.Stmtreturn();
                break;
            case TokenTypes.SemicolonToken:
                this.Stmtempty();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtall() {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.Stmt();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.DoubleKeyword:
                this.Stmt();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.ForKeyword:
                this.Flowcontrol();
                break;
            case TokenTypes.Identifier:
                this.Stmt();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.IfKeyword:
                this.Flowcontrol();
                break;
            case TokenTypes.IntKeyword:
                this.Stmt();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.ReturnKeyword:
                this.Stmt();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.SemicolonToken:
                this.Stmt();
                this.consume(TokenTypes.SemicolonToken);
                break;
            case TokenTypes.WhileKeyword:
                this.Flowcontrol();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtassign() {
        switch (this.currentToken.type) {
            case TokenTypes.EqualsToken:
                this.consume(TokenTypes.EqualsToken);
                this.Expr();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtbreak() {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.consume(TokenTypes.BreakKeyword);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtdecr() {
        switch (this.currentToken.type) {
            case TokenTypes.MinusMinusToken:
                this.consume(TokenTypes.MinusMinusToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtempty() {
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
    
    
    private Stmtfor() {
        switch (this.currentToken.type) {
            case TokenTypes.ForKeyword:
                this.consume(TokenTypes.ForKeyword);
                this.consume(TokenTypes.OpenParenToken);
                this.Stmt();
                this.consume(TokenTypes.SemicolonToken);
                this.Expr();
                this.consume(TokenTypes.SemicolonToken);
                this.Stmt();
                this.consume(TokenTypes.CloseParenToken);
                this.consume(TokenTypes.OpenBraceToken);
                this.Stmtlist();
                this.consume(TokenTypes.CloseBraceToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtfuncall() {
        switch (this.currentToken.type) {
            case TokenTypes.OpenParenToken:
                this.consume(TokenTypes.OpenParenToken);
                this.Exprlist();
                this.consume(TokenTypes.CloseParenToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtif() {
        switch (this.currentToken.type) {
            case TokenTypes.IfKeyword:
                this.consume(TokenTypes.IfKeyword);
                this.consume(TokenTypes.OpenParenToken);
                this.Expr();
                this.consume(TokenTypes.CloseParenToken);
                this.consume(TokenTypes.OpenBraceToken);
                this.Stmtlist();
                this.consume(TokenTypes.CloseBraceToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtincr() {
        switch (this.currentToken.type) {
            case TokenTypes.PlusPlusToken:
                this.consume(TokenTypes.PlusPlusToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtlist() {
        switch (this.currentToken.type) {
            case TokenTypes.BreakKeyword:
                this.B();
                break;
            case TokenTypes.CloseBraceToken:
                this.B();
                break;
            case TokenTypes.DoubleKeyword:
                this.B();
                break;
            case TokenTypes.ForKeyword:
                this.B();
                break;
            case TokenTypes.Identifier:
                this.B();
                break;
            case TokenTypes.IfKeyword:
                this.B();
                break;
            case TokenTypes.IntKeyword:
                this.B();
                break;
            case TokenTypes.ReturnKeyword:
                this.B();
                break;
            case TokenTypes.SemicolonToken:
                this.B();
                break;
            case TokenTypes.WhileKeyword:
                this.B();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtp() {
        switch (this.currentToken.type) {
            case TokenTypes.EqualsToken:
                this.Stmtassign();
                break;
            case TokenTypes.MinusMinusToken:
                this.Stmtdecr();
                break;
            case TokenTypes.OpenParenToken:
                this.Stmtfuncall();
                break;
            case TokenTypes.PlusPlusToken:
                this.Stmtincr();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtreturn() {
        switch (this.currentToken.type) {
            case TokenTypes.ReturnKeyword:
                this.consume(TokenTypes.ReturnKeyword);
                this.Expr();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Stmtwhile() {
        switch (this.currentToken.type) {
            case TokenTypes.WhileKeyword:
                this.consume(TokenTypes.WhileKeyword);
                this.consume(TokenTypes.OpenParenToken);
                this.Expr();
                this.consume(TokenTypes.CloseParenToken);
                this.consume(TokenTypes.OpenBraceToken);
                this.Stmtlist();
                this.consume(TokenTypes.CloseBraceToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Type(): SemanticParam {
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
    
    
    private Vardef() {
        switch (this.currentToken.type) {
            case TokenTypes.CommaToken:
                this.Varinit();
                this.Vardefcont();
                break;
            case TokenTypes.EqualsToken:
                this.Varinit();
                this.Vardefcont();
                break;
            case TokenTypes.SemicolonToken:
                this.Varinit();
                this.Vardefcont();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Vardefcont() {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                this.consume(TokenTypes.CommaToken);
                this.consume(TokenTypes.Identifier);
                this.Varinit();
                this.Vardefcont();
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Varinit() {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                this.Varinitp();
                break;
            case TokenTypes.CommaToken:
                this.Varinitp();
                break;
            case TokenTypes.EqualsToken:
                this.Varinitp();
                break;
            case TokenTypes.SemicolonToken:
                this.Varinitp();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
    
    
    private Varinitp() {
        switch (this.currentToken.type) {
            case TokenTypes.CloseParenToken:
                return;
                break;
            case TokenTypes.CommaToken:
                return;
                break;
            case TokenTypes.EqualsToken:
                this.consume(TokenTypes.EqualsToken);
                this.Expr();
                break;
            case TokenTypes.SemicolonToken:
                return;
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
}