terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
  backend "s3" {
    bucket  = "terraform-state.chispalab.co"
    key     = "meli-sustentabilidad"
    profile = "meli"
    region  = "us-east-1"
  }
}

provider "aws" {
  profile = "meli"
  region  = "us-east-1"
}

resource "aws_ecs_cluster" "meli" {
  name = "meli-sustentabilidad"
}

resource "aws_cloudwatch_log_group" "frontend" {
  name = "/ecs/sustentabilidad/frontend"

  retention_in_days = 7

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }
}

resource "aws_cloudwatch_log_group" "backend" {
  name = "/ecs/sustentabilidad/strapi"

  retention_in_days = 7

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }
}

module "backend_service" {
  source = "github.com/ChispaHub/simple-ecs-service?ref=v0.3.2"

  vpc_id              = module.vpc.vpc_id
  ecs_cluster_id      = aws_ecs_cluster.meli.id
  vpc_subnets         = module.vpc.public_subnets
  assign_public_ip    = true
  name                = "meli-backend"
  desired_count       = "0"
  memory              = "512"
  cpu                 = "256"
  container_name      = "strapi"
  container_port      = 1337
  certificate_arn     = aws_acm_certificate.meli_com.arn
  volumes             = []
  container_image_tag = "v0.1.0"
  environment = [
    {
      name  = "BROWSER"
      value = "false"
    },
    {
      name  = "STRAPI_LOG_FORCE_COLOR"
      value = "false"
    },
    {
      name  = "STRAPI_LOG_PRETTY_PRINT"
      value = "false"
    },
    {
      name  = "STRAPI_DISABLE_UPDATE_NOTIFICATION"
      value = "true"
    },
    {
      name  = "STRAPI_HIDE_STARTUP_MESSAGE"
      value = "true"
    },
    {
      name  = "DATABASE_CLIENT"
      value = "postgres"
    },
    {
      name  = "DATABASE_NAME"
      value = module.strapi-database.db_instance_name
    },
    {
      name  = "DATABASE_HOST"
      value = module.strapi-database.db_instance_address
    },
    {
      name  = "DATABASE_PORT"
      value = module.strapi-database.db_instance_port
    },
    {
      name  = "DATABASE_USERNAME"
      value = "meli"
    },
    {
      name  = "DATABASE_PASSWORD"
      value = "StrongPass22"
    },
    {
      name  = "AWS_ACCESS_KEY_ID"
      value = "XXXXXXXXXXXXXXXX"
    },
    {
      name  = "AWS_ACCESS_SECRET"
      value = "n0s6mjY5nh/XXXXXXXXXXXXXXX"
    },
    {
      name  = "AWS_REGION"
      value = "us-east-1"
    },
    {
      name  = "AWS_BUCKET"
      value = "sustentabilidad-bucket"
    }
  ]
  log_configuration = {
    logDriver = "awslogs",
    options = {
      "awslogs-group"         = "/ecs/sustentabilidad/strapi",
      "awslogs-region"        = "us-east-1",
      "awslogs-stream-prefix" = "ecs"
    }
  }
}

module "frontend_service" {
  source = "github.com/ChispaHub/simple-ecs-service?ref=v0.3.2"

  vpc_id              = module.vpc.vpc_id
  ecs_cluster_id      = aws_ecs_cluster.meli.id
  vpc_subnets         = module.vpc.public_subnets
  assign_public_ip    = true
  name                = "meli-frontend"
  desired_count       = "0"
  memory              = "512"
  cpu                 = "256"
  container_name      = "frontend"
  container_port      = 3000
  certificate_arn     = aws_acm_certificate.meli_com.arn
  volumes             = []
  container_image_tag = "v0.1.0"
  environment = [
    {
      "name"  = "API_URL",
      "value" = "https://api.sustentabilidadmercadolibre.com"
    },
    {
      "name"  = "SESSION_SECRET",
      "value" = "0LsJPeFB/vKgPVghtGonlq3iCvduWgO2Hfto5yTLdbtdnQraLVNJKgZNIHb4M/Ux"
    }
  ]

  log_configuration = {
    logDriver = "awslogs",
    options = {
      "awslogs-group"         = "/ecs/sustentabilidad/frontend",
      "awslogs-region"        = "us-east-1",
      "awslogs-stream-prefix" = "ecs"
    }
  }
}
