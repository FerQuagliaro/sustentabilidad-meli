terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
  backend "s3" {
    bucket  = "terraform-state.chispalab.co"
    key     = "meli"
    profile = "chispalab"
    region  = "us-east-1"
  }
}

provider "aws" {
  profile = "chispalab-meli"
  region  = "us-east-1"
}

resource "aws_ecs_cluster" "meli" {
  name = "meli"
}

resource "aws_cloudwatch_log_group" "frontend" {
  name = "/ecs/frontend"

  retention_in_days = 7

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }
}

resource "aws_cloudwatch_log_group" "backend" {
  name = "/ecs/strapi"

  retention_in_days = 7

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }
}


module "frontend_service" {
  source = "github.com/ChispaHub/simple-ecs-service?ref=v0.3.2"

  vpc_id              = module.vpc.vpc_id
  ecs_cluster_id      = aws_ecs_cluster.meli.id
  vpc_subnets         = module.vpc.public_subnets
  assign_public_ip    = true
  name                = "meli-frontend"
  desired_count       = "1"
  memory              = "512"
  cpu                 = "256"
  container_name      = "frontend"
  container_port      = 3000
  certificate_arn     = aws_acm_certificate.sustentabilidad_com.arn
  volumes             = []
  container_image_tag = "v0.3.3"
  environment = [
    {
      name  = "SESSION_SECRET"
      value = "0LsJPeFB/vKgPVghtGonlq3iCvduWgO2Hfto5yTLdbtdnQraLVNJKgZNIHb4M/Ux"
    },
    {
      name  = "GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL"
      value = "meli-sheets-user@mercado-libre-341320.iam.gserviceaccount.com"
    },
    {
      name  = "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"
      value = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDXq/9QML2KhS8w\nbA+F4aHog01MQy6JpeI+DwvBPHr62Iixf7d11EX+QEYuCqLQsRqCPPY6RKya709I\nd/5nm2tgoiPCt8VAIFJq5yGpAwJQddr5aT0RjBZpyVexF/M/rSO6BkffpZQL8O0u\nw7pa4YEXeornJnKky2scIc96WRQ9vP5YzIBvLb/21EstAVEgWxC4oejCOqS+cDXk\ndRrQU7rQKtgYxTbujDJPBYZL2nA0ZNCZHXSwT5/G06AgsAmRoKMgXNiXwljdOxZD\n+u4Zx4gZfuQk0Unx3aJZxv2Z/+17Az0g35TP9pHAPxYa76KwAbFtPZ+TPKsdJ0ue\nAlgQcQ9JAgMBAAECggEAGrhr8Uvand/+nteSjEYuTLwAzo0nxcTMPR9Y19v2CiBb\n/i7KRHJUaindMAzgC25X0BE8ue8iee8ikeJQ/hXkxbQM7W3ehcGDaIyCkHmnlp+l\nbb92whbqu3hHMbEbkXTyb1SiIMC3UQvsXN4B14rnFyk27qjGLSnpNzLurVQ+RGAs\n22rZ+FeUPkI+pnYoHk3ClJzSHLSfXRLNGBAvmsgws+iddTY+GH6ZAOif0UpcMVO3\n5cwA76HsW7ClHGmpzLVOekZPJMBu+DxDfxzo7lqD2B1nqzx/r886Ynmd64+rNN2B\n7j0kjCWQM0uFF1l06bnWSnxNub7E9/C7SR1xW8vYoQKBgQDyqbbVSmF1HntyNHhM\nnQFf6OWwDs1lIiO4GQrjimIKWhvSKquOLiog4lz4pr2ExSzbln0+ERvakMO1MT8D\nQc0+iX2A/86vPxphsZQ90I0VgTxdnRdsDujnCoFrhTDdHvfXYFKYWv5uF2QaJC3A\nojB+AIq9hQa1RMMfbwcb1azEoQKBgQDjhoQ/I/oKomr4sJ/rrHyz7Mu8/29Hpusx\nZLOrDxM7cp2xre7tpU5Hr1RSU6I3C7upFsqcpuBAY8A6SnWwKQC8qGi179fU5qvp\nkD2M5BEUc0rsQKnNKqyeqNknts/ByQ8/FyM7/FZrHZpFgyYGcqtMkPsv5eDHetkA\nnKl5hXqhqQKBgDoEc685MmXjHNaoTt7aZvq8XzYhw9/bMrkQW7cdXeVlt+Meypea\n1/22wU295+/3iIsTxuvxATzXgcMvfAZWVDEQhE40WwExUChtYakJ1MGAfaNQLMps\nIikjLOA9HvqvLchzwiulDdHai9doMPwuivOFQ6aeSIVMZG5+iC+SfdUhAoGADZlD\nnDZ9Qld0x0pfNInJpkNX5gLqVsD+O6SGLIopHxt5m14G8sM3i4dKJeWDw4B7Bd8r\n2vMKYi7UFWfP4uiAd8YlBALCxqHG0p3hX+NdtfgyGS7AN1f+mzkCSaJehnmK5L1w\nSKyLSbmqN89f3XDLFjdwG+vEZIfOIoA6jN3Sd4kCgYAkHwRgMDLRWugKOnsFH0+k\nYQDFPfSWbNBJQKazPLx6cPAZCnoNY04pN5lyi1hgqld9NF8MpxXoLl1aNaCwT+O2\n1NJI3LJ1jK/GghlEZSUJz2ppdmQJ8O/oFICWZx37ZDEqaof2SDjVKDiHg8hA5w+w\nYB+MrCT7EQJK1akDl+RG6g==\n-----END PRIVATE KEY-----\n"
    }
  ]

  log_configuration = {
    logDriver = "awslogs",
    options = {
      "awslogs-group"         = "/ecs/frontend",
      "awslogs-region"        = "us-east-1",
      "awslogs-stream-prefix" = "ecs"
    }
  }
}

module "backend_service" {
  source = "github.com/ChispaHub/simple-ecs-service?ref=v0.3.2"

  vpc_id              = module.vpc.vpc_id
  ecs_cluster_id      = aws_ecs_cluster.meli.id
  vpc_subnets         = module.vpc.public_subnets
  assign_public_ip    = true
  name                = "meli-backend"
  desired_count       = "1"
  memory              = "512"
  cpu                 = "256"
  container_name      = "backend"
  container_port      = 1337
  certificate_arn     = aws_acm_certificate.sustentabilidad_com.arn
  volumes             = []
  container_image_tag = "v0.2.5"
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
      value = "XXXXXXXXXXXXXXX"
    },
    {
      name  = "AWS_ACCESS_SECRET"
      value = "XXXXXXXXXXXXXXXXX"
    },
    {
      name  = "AWS_REGION"
      value = "us-east-1"
    },
    {
      name  = "AWS_BUCKET"
      value = "meli-sustentabilidad-bucket"
    }
  ]

  log_configuration = {
    logDriver = "awslogs",
    options = {
      "awslogs-group"         = "/ecs/strapi",
      "awslogs-region"        = "us-east-1",
      "awslogs-stream-prefix" = "ecs"
    }
  }
}
