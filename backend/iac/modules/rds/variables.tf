variable "project_name" {
  description = "Name prefix used for tagging and naming all resources"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. dev, staging, prod)"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs to place the RDS instance in (from the network module)"
  type        = list(string)
}

variable "rds_security_group_id" {
  description = "Security group ID that allows inbound Postgres traffic from ECS tasks (from the network module)"
  type        = string
}

variable "db_name" {
  description = "Name of the initial database to create"
  type        = string
  default     = "minishop"
}

variable "db_username" {
  description = "Master username for the database"
  type        = string
  default     = "minishop_admin"
}

variable "instance_class" {
  description = "RDS instance class. db.t4g.micro is the smallest/cheapest ARM option, good for dev."
  type        = string
  default     = "db.t4g.micro"
}

variable "allocated_storage" {
  description = "Storage size in GB"
  type        = number
  default     = 20
}

variable "multi_az" {
  description = "Whether to run a standby replica in a second AZ. Keep false for dev to avoid doubling cost."
  type        = bool
  default     = false
}

variable "skip_final_snapshot" {
  description = "Skip taking a final snapshot on destroy. true is convenient for dev (faster, no leftover snapshot cost); should be false for prod."
  type        = bool
  default     = true
}
