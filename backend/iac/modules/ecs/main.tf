locals {
  name_prefix = "${var.project_name}-${var.environment}"
}

# ---------------------------------------------------------------------------
# ECR - where the Docker image lives
# ---------------------------------------------------------------------------
resource "aws_ecr_repository" "this" {
  name                 = "${local.name_prefix}-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true # allow terraform destroy to succeed even if images exist

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${local.name_prefix}-backend-ecr"
  }
}

# Keep only the last 10 images so ECR storage doesn't grow forever
resource "aws_ecr_lifecycle_policy" "this" {
  repository = aws_ecr_repository.this.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 10 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
      action = { type = "expire" }
    }]
  })
}

# ---------------------------------------------------------------------------
# ECS Cluster
# ---------------------------------------------------------------------------
resource "aws_ecs_cluster" "this" {
  name = "${local.name_prefix}-cluster"

  setting {
    name  = "containerInsights"
    value = "disabled" # enable later if you want deeper per-task metrics (small extra cost)
  }
}

# ---------------------------------------------------------------------------
# CloudWatch Logs - where container stdout/stderr goes
# ---------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "this" {
  name              = "/ecs/${local.name_prefix}-backend"
  retention_in_days = 14 # avoid unbounded log storage cost
}

# ---------------------------------------------------------------------------
# IAM: Task Execution Role - used by ECS itself to pull the image, write
# logs, and read the DB secret. NOT the same as the app's own permissions.
# ---------------------------------------------------------------------------
resource "aws_iam_role" "execution" {
  name = "${local.name_prefix}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "execution_managed" {
  role       = aws_iam_role.execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Extra permission needed on top of the managed policy: read the specific
# Secrets Manager secret so the task definition can inject DB credentials
# as environment variables at container startup.
resource "aws_iam_role_policy" "execution_secrets" {
  name = "${local.name_prefix}-execution-secrets-access"
  role = aws_iam_role.execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["secretsmanager:GetSecretValue"]
      Resource = [var.db_secret_arn]
    }]
  })
}

# ---------------------------------------------------------------------------
# IAM: Task Role - the app's OWN permissions at runtime (e.g. if it later
# needs to call S3, SQS, etc.). Empty for now, kept separate from the
# execution role on purpose - this is the least-privilege pattern.
# ---------------------------------------------------------------------------
resource "aws_iam_role" "task" {
  name = "${local.name_prefix}-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}
