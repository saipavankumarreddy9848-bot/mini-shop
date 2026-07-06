variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "public_subnet_ids" {
  description = "Public subnets for the ALB"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "Private subnets for the ECS tasks"
  type        = list(string)
}

variable "alb_security_group_id" {
  type = string
}

variable "ecs_tasks_security_group_id" {
  type = string
}

variable "container_port" {
  description = "Port the app listens on inside the container"
  type        = number
  default     = 4000
}

variable "task_cpu" {
  description = "Fargate task CPU units (256 = 0.25 vCPU)"
  type        = string
  default     = "256"
}

variable "task_memory" {
  description = "Fargate task memory in MB"
  type        = string
  default     = "512"
}

variable "desired_count" {
  description = "How many task copies to run"
  type        = number
  default     = 1
}

variable "db_secret_arn" {
  description = "ARN of the Secrets Manager secret holding DB credentials (from the rds module)"
  type        = string
}

variable "db_instance_address" {
  description = "RDS hostname (from the rds module), passed to the container as DB_HOST"
  type        = string
}

variable "image_tag" {
  description = "Docker image tag to deploy. Defaults to 'latest'; CI/CD will override this with a commit SHA."
  type        = string
  default     = "latest"
}
