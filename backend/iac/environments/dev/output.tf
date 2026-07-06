output "vpc_id" {
  value = module.network.vpc_id
}

output "public_subnet_ids" {
  value = module.network.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.network.private_subnet_ids
}

output "alb_security_group_id" {
  value = module.network.alb_security_group_id
}

output "ecs_tasks_security_group_id" {
  value = module.network.ecs_tasks_security_group_id
}

output "rds_security_group_id" {
  value = module.network.rds_security_group_id
}

output "db_instance_endpoint" {
  value = module.rds.db_instance_endpoint
}

output "db_secret_arn" {
  value = module.rds.db_secret_arn
}

output "ecr_repository_url" {
  value = module.ecs.ecr_repository_url
}

output "alb_dns_name" {
  value = module.ecs.alb_dns_name
}



output "frontend_url" {
  value = module.frontend.website_url
}

output "dashboard_url" {
  value = module.monitoring.dashboard_url
}