output "db_instance_endpoint" {
  description = "Connection endpoint for the database (host:port)"
  value       = aws_db_instance.this.endpoint
}

output "db_instance_address" {
  description = "Hostname of the database (no port)"
  value       = aws_db_instance.this.address
}

output "db_name" {
  value = aws_db_instance.this.db_name
}

output "db_secret_arn" {
  description = "ARN of the Secrets Manager secret holding DB credentials - ECS task definitions will reference this"
  value       = aws_secretsmanager_secret.db_credentials.arn
}
