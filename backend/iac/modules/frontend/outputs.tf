output "bucket_name" {
  description = "Upload built frontend files here (aws s3 sync dist/ s3://<this>)"
  value       = aws_s3_bucket.frontend.id
}

output "website_url" {
  description = "Public URL of the frontend (S3 static website hosting)"
  value       = "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}"
}
