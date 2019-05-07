export enum TokenTypes{
    //Keywords
    ElseKeyword,
    BreakKeyword,
    ElseIfKeyword,
    IfKeyword,
    ForKeyword,
    WhileKeyword,
    ReturnKeyword,
    IntKeyword,
    DoubleKeyword,

    //Operators
    MinusToken,
    MinusMinusToken,
    PlusToken,
    PlusPlusToken,
    AsteriskToken,
    SlashToken,
    PercentToken,
    ExclamationToken,
    AmpersandAmpersandToken,
    BarBarToken,
    EqualsEqualsToken, 
    EqualsToken,
    ExclamationEqualsToken,
    GreaterThanToken,
    LessThanToken,
    GreaterThanEqualsToken,
    LessThanEqualsToken,

    //Literals
    IntegerLiteral,
    DoubleLiteral,

     //Identifiers
    Identifier,

    OpenParenToken,
    OpenBraceToken,
    CloseBraceToken,
    CloseParenToken,
    DotToken,
    ColonToken,
    SemicolonToken,
    CommaToken,   

    // Others
    PesoToken,
    EndOfFileToken,
    WhiteSpace,
    NewLineTrivia,
}