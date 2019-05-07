import { TokenTypes } from './model/constants/TokenTypes';
import { LexerCR } from './model/classes/LexerCR';
import { Component } from '@angular/core';
import { Token } from 'k4ycer-lexer';
import { SyntacticAnalyzerCR } from './model/classes/SyntacticAnalyzerCR';
import { SymbolTable } from './model/classes/SymbolTable';
import { SemanticTypes } from './model/constants/SemanticTypes';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'ExamenFinal';

	lexer: LexerCR;
	syntacticAnalyzer: SyntacticAnalyzerCR;
	symbolTableUI: SymbolTable;
	lexicalMsgUi: string;
	syntacticMsgUi: string;
	semanticMsgUi: string;
	errorMsgUi: string;
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
			this.lexicalMsgUi = "Lexical analysis successful";
		}catch(e){
			this.errorMsgUi = "Error en analizador lexico: " + e.message;
			return
		}	

		// Add $ token at the end        
		tokens.push(new Token(TokenTypes.PesoToken, TokenTypes[TokenTypes.PesoToken], "$", null, null));
		
		console.log("Input: ", input);
		console.log("Tokens: ", tokens);

		this.syntacticAnalyzer.setTokens(tokens);

		try{
			this.syntacticAnalyzer.analyze();

			// Checamos que este main
			if(!this.syntacticAnalyzer.symbolTable.getSymbols().find(s => s.token.value == "main")){
				throw new Error("Error semantico: No se encontro la funcion main");
			}

			// Todo salio bien
			this.syntacticMsgUi = "Syntactic analysis successful";
			this.semanticMsgUi = "Semantic analysis successful";
			console.log("Tabla de simbolos", this.syntacticAnalyzer.symbolTable);
			this.showSymbolTable(this.syntacticAnalyzer.symbolTable);
		}catch(e){
			this.errorMsgUi = "Error en analizador: " + e.message;
			return;
		}	
	}

	showSymbolTable(symbolTable: SymbolTable){
		this.symbolTableUI = symbolTable;
		this.symbolTableUI.getSymbols().map(symbol => symbol.semanticTypeString = SemanticTypes[symbol.semanticType]);
		this.symbolTableUI.getSymbols().sort((a, b) => a.scope - b.scope);		
	}
}
