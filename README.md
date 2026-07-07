# MiniShop — AWS DevOps E-Commerce Project

A small e-commerce platform (product catalog, cart, checkout) built to demonstrate
a real, production-pattern AWS DevOps workflow: containerized app, infrastructure
as code, managed database, load-balanced compute, CDN-hosted frontend, and CI/CD.

## Architecture

```
                              ┌─────────────────────┐
                              │      CloudFront       │
                              │   (CDN, HTTPS, SPA)   │
                              └──────────┬───────────┘
                                         │
                              ┌──────────▼───────────┐
                              │     S3 (private)      │
                              │   React frontend      │
                              └───────────────────────┘

                              ┌───────────────────────┐
    Internet ───────────────▶│   Application Load     │
                              │   Balancer (public)    │
                              └──────────┬─────────────┘
                                         │
                         VPC             │  private subnets
                    ┌────────────────────▼────────────────────┐
                    │            ECS Fargate Service            │
                    │         (Node/Express container)          │
                    └────────────────────┬────────────────────┘
                                         │
                              ┌──────────▼───────────┐
                              │   RDS PostgreSQL       │
                              │   (private subnet)     │
                              └───────────────────────┘

              Secrets Manager ── DB credentials, injected at container start
              CloudWatch ── logs, dashboards, alarms (CPU, 5xx, latency)
              ECR ── Docker image registry
              GitHub Actions ── CI/CD for both backend and frontend
```

## Why these choices

- **Fargate over EC2** — no servers to patch/manage; pay only for running tasks.
  Tradeoff: less control over the underlying host, slightly higher per-vCPU cost
  than reserved EC2 at scale.
- **Single NAT Gateway in dev** — halves NAT cost vs. one-per-AZ. Fine for dev
  since a NAT outage just means temporary loss of outbound internet from private
  subnets, not app downtime (the app doesn't depend on outbound internet at
  runtime). Would switch to one-per-AZ for prod HA.
- **RDS in private subnets, `publicly_accessible = false`** — the database is
  never reachable from the internet, only from ECS tasks via a chained security
  group (ALB → ECS → RDS, each layer only trusts the one before it).
- **Secrets Manager over hardcoded env vars** — DB credentials are generated
  randomly by Terraform and never appear in code, task definitions, or git
  history.
- **S3 + CloudFront for the frontend instead of serving it from the same
  container** — decouples frontend deploys from backend deploys, and the
  frontend gets true CDN caching/edge delivery for free.
- **GitHub Actions over AWS CodePipeline** — free for public/small repos, and a
  more universally recognized skill outside of AWS-specific environments.

## Repo structure

```
backend/            Node/Express API (products, cart, checkout)
frontend/           React (Vite) SPA
infra/
  modules/
    network/          VPC, subnets, NAT, security groups
    rds/               PostgreSQL, Secrets Manager
    ecs/               ECR, cluster, ALB, task definition, service, IAM
    frontend/          S3 + CloudFront
    monitoring/        CloudWatch dashboard + alarms
  environments/
    dev/               Wires all modules together for the dev environment
.github/workflows/    CI/CD pipelines (backend, frontend)
```

## Local development

```bash
cd backend
cp .env.example .env
npm install
docker compose up -d      # local Postgres
npm run db:migrate
npm run db:seed
npm run dev                # http://localhost:4000

cd ../frontend
cp .env.example .env       # VITE_API_URL=http://localhost:4000
npm install
npm run dev                 # http://localhost:5173
```

## Deploying infrastructure

```bash
cd infra/environments/dev
terraform init
terraform plan
terraform apply
```

Then build/push the backend image and sync the frontend build to S3 (see
`.github/workflows/` for the exact commands — the same steps run automatically
on every push to `main` once GitHub secrets are configured).

## Required GitHub Actions secrets

| Secret | Used for |
|---|---|
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Both pipelines |
| `BACKEND_API_URL` | Frontend build (points at the ALB DNS name) |
| `FRONTEND_BUCKET_NAME` | Frontend deploy (from `terraform output`) |
| `CLOUDFRONT_DISTRIBUTION_ID` | Frontend deploy cache invalidation |

## Known limitations / next steps

- No HTTPS on the ALB yet (needs a custom domain + ACM certificate)
- No auto-scaling policy on the ECS service (fixed `desired_count`)
- No WAF in front of CloudFront/ALB
- Payment is simulated, not integrated with a real processor
- Cart is in-memory (not DynamoDB) — fine for a single task, would need a
  shared store before running more than one backend replica

_Last updated: Tue Jul  7 04:22:12 UTC 2026_
