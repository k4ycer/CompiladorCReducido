import { AlphabetCR } from './../constants/AlphabetCR';
import { StatesCR } from '../constants/StatesCR';
import { FSMCR } from './FSMCR';
import { Lexer, FSM, Token } from 'k4ycer-lexer';
import { TokenTypes } from '../constants/TokenTypes';
import { TextToToken } from '../constants/TextToToken';

export class LexerCR extends Lexer{
    constructor(input: string){
        super(input, new FSMCR(), TokenTypes.EndOfFileToken, [TokenTypes.EndOfFileToken, TokenTypes.WhiteSpace, TokenTypes.NewLineTrivia]);
    }

    recognizeToken(accepted: boolean, analyzedString: string, acceptingState: number): Token{
        let tokenType = TextToToken[analyzedString]; 
        let token;        

        // Integer literal
        if(acceptingState == StatesCR.Integer){
            token = new Token(TokenTypes.IntegerLiteral, TokenTypes[TokenTypes.IntegerLiteral], analyzedString, this.line, this.column);            
            return token;
        }

        // Double literal
        if(acceptingState == StatesCR.Double){
            token = new Token(TokenTypes.DoubleLiteral, TokenTypes[TokenTypes.DoubleLiteral], analyzedString, this.line, this.column);            
            return token;
        }

        // End of line
        if(acceptingState == StatesCR.EndOfLine){
            token = new Token(TokenTypes.NewLineTrivia, TokenTypes[TokenTypes.NewLineTrivia], analyzedString, this.line, this.column);
            return token;
        }

        // Identifier or other token
        if(tokenType == null || tokenType == undefined){
            token = new Token(TokenTypes.Identifier, TokenTypes[TokenTypes.Identifier], analyzedString, this.line, this.column);                
        }else{
            token = new Token(tokenType, TokenTypes[tokenType], analyzedString, this.line, this.column);
        }

        return token;
    }

    increasePointers(token: Token){
        if(token.type == TokenTypes.NewLineTrivia){
            this.line++;
            this.column = 0;
            this.position += token.value.length;
        }else{
            this.column += token.value.length;
            this.position += token.value.length;
        }        
    }    
}