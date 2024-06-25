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
    null: ($) => "null",
    identifier: ($) =>
      token(seq(letter, repeat(choice(letter, unicodeDigit, "-")))),
    _quoted_identifier: ($) => seq('"', $.identifier, '"'),
    value: ($) =>
      choice(
        $.string_literal,
        $.true,
        $.false,
        $.null,
        $.numeric_literal,
        $.map,
        $.tuple,
      ),
    tuple: ($) =>
      seq(
        "[",
        optional($._newline),
        optional(
          seq(
            $.value,
            repeat(seq(",", optional($._newline), $.value)),
            optional(","),
          ),
        ),
        optional($._newline),
        "]",
      ),
    map: ($) =>
      seq(
        "{",
        choice($._newline),
        repeat(
          seq(
            choice($.identifier, $._quoted_identifier),
            choice("=", ":"),
            $.value,
            seq(optional(/,/), choice($._newline)),
          ),
        ),
        "}",
      ),
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
