module "strapi-database" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 3.0"

  identifier = "meli-strapi"

  engine            = "postgres"
  engine_version    = "11"
  instance_class    = "db.t2.small"
  allocated_storage = 20

  name     = "meli_sustentabilidad"
  username = "meli"
  password = "StrongPass22"
  port     = "5432"

  vpc_security_group_ids = [aws_security_group.strapi-database.id]

  maintenance_window = "Sun:00:00-Sun:03:00"
  backup_window      = "03:00-06:00"

  tags = {
    Owner       = "user"
    Environment = "dev"
  }

  # DB subnet group
  subnet_ids = module.vpc.database_subnets

  # DB parameter group
  family = "postgres11"

  # DB option group
  major_engine_version = "11"

  # Database Deletion Protection
  deletion_protection = true
}

resource "aws_security_group" "strapi-database" {
  name        = "strapi-database"
  description = "Allow inbound traffic on port 5432 from public subnets"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description      = "Postgres from public subnets"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = module.vpc.public_subnets_cidr_blocks
    ipv6_cidr_blocks = []
  }

  egress {
    description      = "Allow all egress traffic"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "meli-strapi"
  }
}
