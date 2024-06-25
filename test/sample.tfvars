env = "test"

secret_path = "secret/thanos/test/aws"

thanos_values_file = "values/values-test.yaml"

namespace = "default"

bucket_name = "vitfor-test-thanos-bucket"

bucket_key = "thanos/test.tfstate"

region = "eu-west-2"

tf_state_bucket = "vitfor-test-terraform-state"

tags = {
  "Service" = "Dan"
  "Team" = "Dans Team"
  "Environment" = "Test"
}

vault_address = "http://127.0.0.1:8200/"

commonAnnotations = {
    "anotribe" = "dan"
    "anodomain" = "my_ano_domain"
    "anosquad" = "dan_squad_ano"
  }
