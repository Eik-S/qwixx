locals {
  website_domain_name = "qwixx.eikemu.com"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"

  # created in https://github.com/Eik-S/tracemap
  backend "s3" {
    bucket         = "eike-terraform-state"
    key            = "state/qwixx/terraform.tfstate"
    encrypt        = true
    dynamodb_table = "eike-terraform_tf_lockid"
  }
}

provider "aws" {
  region = "eu-central-1"
}

module "restriced_admin" {
  source              = "./restricted-admin"
  website_domain_name = local.website_domain_name
  # created in https://github.com/Eik-S/tracemap
  github_oidc_arn = "arn:aws:iam::643625685022:oidc-provider/token.actions.githubusercontent.com"
}

module "cdn" {
  source              = "./cdn"
  website_domain_name = local.website_domain_name
}

module "website" {
  source         = "./static-website"
  domain_name    = local.website_domain_name
  cloudfront_arn = module.cdn.cloudfront_arn
}


