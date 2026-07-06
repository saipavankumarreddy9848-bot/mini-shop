resource "aws_ecs_service" "this" {
  name            = "${local.name_prefix}-backend-service"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.private_subnet_ids # tasks live in private subnets, no public IP
    security_groups  = [var.ecs_tasks_security_group_id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.this.arn
    container_name    = "backend"
    container_port    = var.container_port
  }

  # Give the ALB time to register a healthy target before ECS considers
  # a deployment "done" - prevents flapping during rollouts.
  health_check_grace_period_seconds = 30

  depends_on = [aws_lb_listener.http]

  lifecycle {
    ignore_changes = [task_definition] # CI/CD will update this via `aws ecs update-service`, not terraform apply, once we get to that step
  }
}
