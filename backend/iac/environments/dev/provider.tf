terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Using local state for now while we're building this out.
  # Once this is stable, switch to a remote backend so state is safe
  # and shareable (needed once we add CI/CD in a later step):
  #
  # backend "s3" {
  #   bucket         = "minishop-terraform-state-<your-unique-suffix>"
  #   key            = "dev/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "minishop-terraform-locks"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
