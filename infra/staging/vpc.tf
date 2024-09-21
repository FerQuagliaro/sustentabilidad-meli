module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "meli"
  cidr = "10.0.0.0/16"

  azs              = ["us-east-1a", "us-east-1b"]
  public_subnets   = ["10.0.0.0/24", "10.0.1.0/24"]
  private_subnets  = []
  database_subnets = ["10.0.200.0/24", "10.0.201.0/24"]

  enable_nat_gateway   = true
  enable_dns_hostnames = true

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }
}
