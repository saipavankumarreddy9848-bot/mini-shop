const { Pool } = require('pg');

// Same connection code works for local Docker Postgres AND real RDS -
// only the env vars change between environments. Locally these come from
// backend/.env (pointing at docker-compose's postgres service). In ECS,
// these will be injected from the Secrets Manager secret our Terraform
// RDS module created, via the task definition's `secrets` block.
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'minishop',
  user: process.env.DB_USER || 'minishop_admin',
  password: process.env.DB_PASSWORD || 'localdevpassword',
  // RDS requires SSL; local Docker Postgres doesn't have a cert configured,
  // so only require it outside local dev.
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
});

module.exports = pool;
