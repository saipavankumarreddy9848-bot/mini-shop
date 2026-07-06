output "ecr_repository_url" {
  description = "Push Docker images here"
  value       = aws_ecr_repository.this.repository_url
}

output "cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "service_name" {
  value = aws_ecs_service.this.name
}

output "alb_dns_name" {
  description = "Public URL of the app - visit this in a browser once deployed"
  value       = aws_lb.this.dns_name
}

output "alb_arn_suffix" {
  description = "Needed for CloudWatch ALB metrics"
  value       = aws_lb.this.arn_suffix
}

output "target_group_arn_suffix" {
  description = "Needed for CloudWatch target group metrics"
  value       = aws_lb_target_group.this.arn_suffix
}
