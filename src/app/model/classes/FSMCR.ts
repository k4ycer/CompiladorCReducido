import { AlphabetCR } from './../constants/AlphabetCR';
import { FSM } from 'k4ycer-lexer';
import { StatesCR } from '../constants/StatesCR';

export class FSMCR extends FSM{
    constructor(){
        let alphabet: string[] = Object.keys(AlphabetCR).map(k => AlphabetCR[k as any]);
        let states: number[] = FSM.EnumToArray(StatesCR);
        let initialState: number = StatesCR.Initial;
        let acceptingStates: number[] = [StatesCR.IdentifierStart, StatesCR.IdentifierPart, StatesCR.Exclamation, StatesCR.ExclamationEqualsEquals, StatesCR.ExclamationEquals, StatesCR.StringLiteralEnd, StatesCR.Percent, StatesCR.Ampersand, StatesCR.AmpersandAmpersand, StatesCR.OpenParen, StatesCR.CloseParen, StatesCR.Asterisk, StatesCR.Plus, StatesCR.PlusPlus, StatesCR.Comma, StatesCR.Minus, StatesCR.Integer, StatesCR.Slash, StatesCR.SingleLineComment, StatesCR.MultiLineCommentPart, StatesCR.MultiLineCommentEndStart, StatesCR.MultiLineCommentEnd, StatesCR.Semicolon, StatesCR.LessThan, StatesCR.LessThanEquals, StatesCR.Equals, StatesCR.EqualsEquals, StatesCR.GreaterThan, StatesCR.OpenBracket, StatesCR.CloseBracket, StatesCR.OpenBrace, StatesCR.CloseBrace, StatesCR.Bar, StatesCR.BarBar, StatesCR.WhiteSpace, StatesCR.EndOfLine, StatesCR.GreaterThanEquals, StatesCR.MinusMinus, StatesCR.CharacterLiteralEnd, StatesCR.Double];

        super(alphabet, states, initialState, acceptingStates);
    }

    buildTransitionTable(){
        // Line feed, carriage return
        this.addTransition(StatesCR.Initial, StatesCR.EndOfLine, AlphabetCR.carriageReturn);
        this.addTransition(StatesCR.Initial, StatesCR.EndOfLine, AlphabetCR.lineFeed);
        this.addTransition(StatesCR.EndOfLine, StatesCR.EndOfLine, AlphabetCR.lineFeed);

        // Whitespace
        this.addTransition(StatesCR.Initial, StatesCR.WhiteSpace, AlphabetCR.tab);
        this.addTransition(StatesCR.Initial, StatesCR.WhiteSpace, AlphabetCR.verticalTab);
        this.addTransition(StatesCR.Initial, StatesCR.WhiteSpace, AlphabetCR.formFeed);
        this.addTransition(StatesCR.Initial, StatesCR.WhiteSpace, AlphabetCR.space);

        //Identifiers
        let identifierStartInputs = [AlphabetCR.A, AlphabetCR.B, AlphabetCR.C, AlphabetCR.D, AlphabetCR.E, AlphabetCR.F, AlphabetCR.G, AlphabetCR.H, AlphabetCR.I, AlphabetCR.J, AlphabetCR.K, AlphabetCR.L, AlphabetCR.M, AlphabetCR.N, AlphabetCR.O, AlphabetCR.P, AlphabetCR.Q, AlphabetCR.R, AlphabetCR.S, AlphabetCR.T, AlphabetCR.U, AlphabetCR.V, AlphabetCR.W, AlphabetCR.X, AlphabetCR.Y, AlphabetCR.Z, AlphabetCR.a, AlphabetCR.b, AlphabetCR.c, AlphabetCR.d, AlphabetCR.e, AlphabetCR.f, AlphabetCR.g, AlphabetCR.h, AlphabetCR.i, AlphabetCR.j, AlphabetCR.k, AlphabetCR.l, AlphabetCR.m, AlphabetCR.n, AlphabetCR.o, AlphabetCR.p, AlphabetCR.q, AlphabetCR.r, AlphabetCR.s, AlphabetCR.t, AlphabetCR.u, AlphabetCR.v, AlphabetCR.w, AlphabetCR.x, AlphabetCR.y, AlphabetCR.z];
        let identifierPartInputs = identifierStartInputs.concat([AlphabetCR._0, AlphabetCR._1, AlphabetCR._2, AlphabetCR._3, AlphabetCR._4, AlphabetCR._5, AlphabetCR._6, AlphabetCR._7, AlphabetCR._8, AlphabetCR._9, AlphabetCR._]);        
        this.addTransitionMultipleInputs(StatesCR.Initial, StatesCR.IdentifierStart, identifierStartInputs);
        this.addTransitionMultipleInputs(StatesCR.IdentifierStart, StatesCR.IdentifierPart, identifierPartInputs);
        this.addTransitionMultipleInputs(StatesCR.IdentifierPart,StatesCR.IdentifierPart, identifierPartInputs);

        // Exclamation
        this.addTransition(StatesCR.Initial, StatesCR.Exclamation, AlphabetCR.exclamation);
        this.addTransition(StatesCR.Exclamation, StatesCR.ExclamationEquals, AlphabetCR.equals);
        this.addTransition(StatesCR.ExclamationEquals, StatesCR.ExclamationEqualsEquals, AlphabetCR.equals);    

        // Percent
        this.addTransition(StatesCR.Initial, StatesCR.Percent, AlphabetCR.percent);

        // Ampersand
        this.addTransition(StatesCR.Initial, StatesCR.Ampersand, AlphabetCR.ampersand);
        this.addTransition(StatesCR.Ampersand, StatesCR.AmpersandAmpersand, AlphabetCR.ampersand);

        // Open Paren
        this.addTransition(StatesCR.Initial, StatesCR.OpenParen, AlphabetCR.openParen);

        // Close Paren
        this.addTransition(StatesCR.Initial, StatesCR.CloseParen, AlphabetCR.closeParen);

        // Asterisk
        this.addTransition(StatesCR.Initial, StatesCR.Asterisk, AlphabetCR.asterisk);

        // Plus
        this.addTransition(StatesCR.Initial, StatesCR.Plus, AlphabetCR.plus);
        this.addTransition(StatesCR.Plus, StatesCR.PlusPlus, AlphabetCR.plus);

        // Comma
        this.addTransition(StatesCR.Initial, StatesCR.Comma, AlphabetCR.comma);

        // Minus
        this.addTransition(StatesCR.Initial, StatesCR.Minus, AlphabetCR.minus);
        this.addTransition(StatesCR.Minus, StatesCR.MinusMinus, AlphabetCR.minus);

        // Minus numeric literal
        this.addTransitionMultipleInputs(StatesCR.Minus, StatesCR.Integer, [AlphabetCR._0, AlphabetCR._1, AlphabetCR._2, AlphabetCR._3, AlphabetCR._4, AlphabetCR._5, AlphabetCR._6, AlphabetCR._7, AlphabetCR._8, AlphabetCR._9]);

        //Integer Literal
        this.addTransitionMultipleInputs(StatesCR.Initial, StatesCR.Integer, [AlphabetCR._0, AlphabetCR._1, AlphabetCR._2, AlphabetCR._3, AlphabetCR._4, AlphabetCR._5, AlphabetCR._6, AlphabetCR._7, AlphabetCR._8, AlphabetCR._9]);
        this.addTransitionMultipleInputs(StatesCR.Integer, StatesCR.Integer, [AlphabetCR._0, AlphabetCR._1, AlphabetCR._2, AlphabetCR._3, AlphabetCR._4, AlphabetCR._5, AlphabetCR._6, AlphabetCR._7, AlphabetCR._8, AlphabetCR._9]);

        // Double Literal
        this.addTransition(StatesCR.Integer, StatesCR.DoubleStart, AlphabetCR.dot);
        this.addTransitionMultipleInputs(StatesCR.DoubleStart, StatesCR.Double, [AlphabetCR._0, AlphabetCR._1, AlphabetCR._2, AlphabetCR._3, AlphabetCR._4, AlphabetCR._5, AlphabetCR._6, AlphabetCR._7, AlphabetCR._8, AlphabetCR._9]);
        this.addTransitionMultipleInputs(StatesCR.Double, StatesCR.Double, [AlphabetCR._0, AlphabetCR._1, AlphabetCR._2, AlphabetCR._3, AlphabetCR._4, AlphabetCR._5, AlphabetCR._6, AlphabetCR._7, AlphabetCR._8, AlphabetCR._9]);

        // Slash
        this.addTransition(StatesCR.Initial, StatesCR.Slash, AlphabetCR.slash);
        this.addTransition(StatesCR.Slash, StatesCR.SingleLineComment, AlphabetCR.slash);
        this.addTransition(StatesCR.Slash, StatesCR.MultiLineCommentPart, AlphabetCR.asterisk);

        // Semicolon
        this.addTransition(StatesCR.Initial, StatesCR.Semicolon, AlphabetCR.semicolon);

        // Less than
        this.addTransition(StatesCR.Initial, StatesCR.LessThan, AlphabetCR.lessThan);
        this.addTransition(StatesCR.LessThan, StatesCR.LessThanEquals, AlphabetCR.equals);

        // Equals
        this.addTransition(StatesCR.Initial, StatesCR.Equals, AlphabetCR.equals);
        this.addTransition(StatesCR.Equals, StatesCR.EqualsEquals, AlphabetCR.equals);

        // Greater than
        this.addTransition(StatesCR.Initial, StatesCR.GreaterThan, AlphabetCR.greaterThan);
        this.addTransition(StatesCR.GreaterThan, StatesCR.GreaterThanEquals, AlphabetCR.equals);

        // Open bracket
        this.addTransition(StatesCR.Initial, StatesCR.OpenBracket, AlphabetCR.openBracket);

        // Close bracket
        this.addTransition(StatesCR.Initial, StatesCR.CloseBracket, AlphabetCR.closeBracket);

        // Open brace
        this.addTransition(StatesCR.Initial, StatesCR.OpenBrace, AlphabetCR.openBrace);

        // Close brace
        this.addTransition(StatesCR.Initial, StatesCR.CloseBrace, AlphabetCR.closeBrace);

        // Bar
        this.addTransition(StatesCR.Initial, StatesCR.Bar, AlphabetCR.bar);        
        this.addTransition(StatesCR.Bar, StatesCR.BarBar, AlphabetCR.bar);        
    }
}