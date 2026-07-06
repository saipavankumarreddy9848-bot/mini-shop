variable "project_name" {
  description = "Name prefix used for tagging and naming all resources"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. dev, staging, prod)"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "azs" {
  description = "Availability zones to spread subnets across"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets (one per AZ, same order as var.azs)"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets (one per AZ, same order as var.azs)"
  type        = list(string)
}

variable "single_nat_gateway" {
  description = "If true, create only one NAT gateway (shared by all private subnets) to save cost. Set false for prod-grade HA (one NAT per AZ)."
  type        = bool
  default     = true
}
