locals {
  name_prefix = "${var.project_name}-${var.environment}"
}

# ---------------------------------------------------------------------------
# DB subnet group - tells RDS which (private) subnets it's allowed to live in
# ---------------------------------------------------------------------------
resource "aws_db_subnet_group" "this" {
  name       = "${local.name_prefix}-db-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "${local.name_prefix}-db-subnet-group"
  }
}

# ---------------------------------------------------------------------------
# Auto-generate a strong master password instead of hardcoding one in code.
# Never commit real DB passwords to git - this is why we generate + store
# it in Secrets Manager instead of a variable default.
# ---------------------------------------------------------------------------
resource "random_password" "db_master" {
  length  = 20
  special = true
  # RDS doesn't allow every special character in passwords - restrict to a safe set
  override_special = "!#$%^&*()-_=+"
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name        = "${local.name_prefix}-db-credentials"
  description = "Master credentials for the MiniShop RDS instance"
  recovery_window_in_days = 0
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = var.db_username
    password = random_password.db_master.result
    dbname   = var.db_name
    engine   = "postgres"
    port     = 5432
  })
}

# ---------------------------------------------------------------------------
# The actual RDS instance
# ---------------------------------------------------------------------------
resource "aws_db_instance" "this" {
  identifier     = "${local.name_prefix}-db"
  engine         = "postgres"
  engine_version = "16.14"
  instance_class = var.instance_class

  allocated_storage     = var.allocated_storage
  storage_type           = "gp3"
  db_name                = var.db_name
  username                = var.db_username
  password                = random_password.db_master.result

  db_subnet_group_name   = aws_db_subnet_group.this.name
  vpc_security_group_ids = [var.rds_security_group_id]

  multi_az            = var.multi_az
  publicly_accessible = false # private subnet only - never expose a DB directly to the internet

  backup_retention_period = 7
  skip_final_snapshot     = var.skip_final_snapshot
  final_snapshot_identifier = var.skip_final_snapshot ? null : "${local.name_prefix}-db-final-snapshot"

  deletion_protection = false # dev only - flip to true for prod so `terraform destroy` can't accidentally nuke the DB

  tags = {
    Name = "${local.name_prefix}-db"
  }
}
