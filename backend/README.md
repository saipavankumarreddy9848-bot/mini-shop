# MiniShop Backend

Simple e-commerce REST API: products, cart, checkout, orders.
Currently uses in-memory data stores as stand-ins for RDS (products/orders)
and DynamoDB (cart) — swapping those in is our next step (Terraform + DB
wiring) once this local version is confirmed working.

## Run locally

```bash
cd backend
cp .env.example .env
npm install
npm run dev      # nodemon, auto-reload
# or: npm start
```

Server runs on `http://localhost:4000` by default.

## Run with Docker

```bash
docker build -t minishop-backend .
docker run -p 4000:4000 minishop-backend
```

## API reference

| Method | Path                       | Description                          |
|--------|-----------------------------|---------------------------------------|
| GET    | /health                    | Health check (used by ALB)            |
| GET    | /api/products               | List products (`?category=`, `?search=`) |
| GET    | /api/products/:id           | Get one product                       |
| GET    | /api/cart                   | View current cart                     |
| POST   | /api/cart/items              | Add item `{ productId, quantity }`    |
| PUT    | /api/cart/items/:productId   | Update quantity `{ quantity }`        |
| DELETE | /api/cart/items/:productId   | Remove item from cart                 |
| POST   | /api/checkout                | Place order `{ customer: {name,email,address} }` |
| GET    | /api/orders                  | List all orders (debug/admin)         |
| GET    | /api/orders/:id              | Get one order                         |

Cart is tracked via an `x-cart-id` header. The server generates one on
first request and echoes it back — the frontend should store it (e.g.
localStorage) and send it on every request.

## Quick test flow

```bash
# 1. List products
curl http://localhost:4000/api/products

# 2. Add to cart (save the x-cart-id header from the response!)
curl -i -X POST http://localhost:4000/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"productId":"p001","quantity":2}'

# 3. View cart (reuse the x-cart-id)
curl http://localhost:4000/api/cart -H "x-cart-id: <id-from-step-2>"

# 4. Checkout
curl -X POST http://localhost:4000/api/checkout \
  -H "Content-Type: application/json" \
  -H "x-cart-id: <id-from-step-2>" \
  -d '{"customer":{"name":"Jane Doe","email":"jane@example.com","address":"123 Main St"}}'
```

## Next steps (per our build plan)

1. ~~Local app with dummy data~~ ✅
2. ~~Dockerize~~ ✅
3. Terraform: network module (VPC, subnets, security groups)
4. Terraform: RDS module — swap `orderStore`/`products` for real Postgres queries
5. Terraform: ECS + ALB module — deploy this container
6. Manual deploy, confirm reachable
7. Terraform: S3 + CloudFront for frontend
8. GitHub Actions CI/CD pipeline
9. CloudWatch monitoring
