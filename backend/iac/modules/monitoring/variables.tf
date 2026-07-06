variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "ecs_cluster_name" {
  type = string
}

variable "ecs_service_name" {
  type = string
}

variable "alb_arn_suffix" {
  description = "The ALB's arn_suffix attribute (needed for CloudWatch metric dimensions)"
  type        = string
}

variable "target_group_arn_suffix" {
  description = "The target group's arn_suffix attribute"
  type        = string
}

variable "alarm_email" {
  description = "Email address to notify on alarms. Leave empty to skip SNS/email setup."
  type        = string
  default     = ""
}
