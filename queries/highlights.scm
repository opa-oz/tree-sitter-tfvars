(comment) @comment

(identifier) @constant

[
  (quoted_identifier)
  (string_literal)
] @string

(map (identifier) @property)

[
  ":"
  "="
] @punctuation.delimiter


[
  "["
  "]"
  "{"
  "}"
]  @punctuation.bracket

[
  (true)
  (false)
  (null)
] @constant.builtin

(numeric_literal) @number

