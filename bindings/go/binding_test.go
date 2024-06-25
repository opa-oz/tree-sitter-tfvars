package tree_sitter_tfvars_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-tfvars"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tfvars.Language())
	if language == nil {
		t.Errorf("Error loading Tfvars grammar")
	}
}
