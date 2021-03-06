export enum StatesCR{
    Initial,
    WhiteSpace,
    IdentifierStart,
    IdentifierPart,
    EndOfLine,
    Exclamation,
    ExclamationEqualsEquals,
    ExclamationEquals,
    StringLiteralPart,
    StringLiteralEnd,
    CharacterLiteralStart,
    CharacterLiteralPart,
    CharacterLiteralEnd,
    EscapeStringInStringLiteral,
    EscapeStringInCharLiteral,
    Percent,
    Ampersand,
    AmpersandAmpersand,
    OpenParen,
    CloseParen,
    Asterisk,
    Plus,
    PlusPlus,
    Comma,
    Minus,
    MinusMinus,
    Integer,
    DoubleStart,
    Double,
    Slash,
    SingleLineComment,
    MultiLineCommentPart,
    MultiLineCommentEndStart,
    MultiLineCommentEnd,
    Semicolon,
    LessThan,
    LessThanEquals,
    Equals,
    EqualsEquals,
    GreaterThan,
    GreaterThanEquals,
    OpenBracket,
    CloseBracket,
    OpenBrace,
    CloseBrace,
    Bar,
    BarBar
}