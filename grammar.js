const unicodeLetter = /\p{L}/,
  unicodeDigit = /[0-9]/,
  unicodeChar = /./,
  unicodeValue = unicodeChar,
  letter = choice(unicodeLetter, "_");

module.exports = grammar({
  name: "tfvars",
  externals: ($) => [$._newline, $._indent, $._dedent],
  extras: ($) => [/\s/, $.comment],
  rules: {
    // source_file: ($) => "hello",
    source_file: ($) => repeat(choice($.block)),
    comment: ($) =>
      token(
        choice(
          seq("//", /.*/),
          seq("#", /.*/),
          seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),
        ),
      ),
    true: ($) => "true",
    false: ($) => "false",
    identifier: ($) =>
      token(seq(letter, repeat(choice(letter, unicodeDigit, "-")))),
    value: ($) => choice($.string_literal, $.true, $.false, $.numeric_literal),
    block: ($) => seq($.identifier, "=", $.value, choice($._newline)),
    string_literal: ($) => token(seq('"', repeat(/[^"]|(\\\")/), '"')),
    numeric_literal: ($) =>
      token(
        seq(
          repeat1(/[0-9]/),
          optional(seq(".", repeat1(/[0-9]/))),
          optional(
            seq(choice("e", "E"), optional(choice("+", "-")), repeat1(/[0-9]/)),
          ),
        ),
      ),
  },
});
