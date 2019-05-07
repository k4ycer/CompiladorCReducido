import { TokenTypes } from './model/constants/TokenTypes';
import { LexerCR } from './model/classes/LexerCR';
import { Component } from '@angular/core';
import { Token } from 'k4ycer-lexer';
import { SyntacticAnalyzerCR } from './model/classes/SyntacticAnalyzerCR';
import { SymbolTable } from './model/classes/SymbolTable';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'ExamenFinal';

	lexer: LexerCR;
	syntacticAnalyzer: SyntacticAnalyzerCR;
	public input: string;

	ngOnInit(){
		this.lexer = new LexerCR("");
		this.syntacticAnalyzer = new SyntacticAnalyzerCR([], new SymbolTable());
	}

	readFile(e){
		let file = e.target.files[0];
		if(!file){
			return;
		}

		let reader = new FileReader();
		reader.onload = (ef) => {
			this.input = (<any>ef).target.result;
			this.compile(this.input);
		}
		reader.readAsText(file);
	}	

	compile(input: string){
		let tokens: Token[];

		this.lexer.setInput(input);
		try{
			tokens = this.lexer.tokenize();		
		}catch(e){
			console.log("Error en analizador lexico: " + e.message );
			return
		}	

		// Add $ token at the end        
		tokens.push(new Token(TokenTypes.PesoToken, TokenTypes[TokenTypes.PesoToken], "$", null, null));
		
		console.log("Input: ", input);
		console.log("Tokens: ", tokens);

		this.syntacticAnalyzer.setTokens(tokens);

		try{
			this.syntacticAnalyzer.analyze();
			console.log("Sintacticamente valido");
			console.log("Tabla de simbolos", this.syntacticAnalyzer.symbolTable);
		}catch(e){
			console.log("Error en analizador sintáctico: " + e.message );
			return;
		}	
	}
}
