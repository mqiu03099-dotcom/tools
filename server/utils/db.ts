import pg from "pg";
import { useRuntimeConfig } from "#imports";

const { Pool } = pg;

let pool: pg.Pool | undefined;

export function getDbPool() {
  if (pool) {
    return pool;
  }

  const config = useRuntimeConfig();

  pool = new Pool({
    host: config.postgresHost,
    port: Number(config.postgresPort),
    database: config.postgresDatabase,
    user: config.postgresUser,
    password: config.postgresPassword
  });

  return pool;
}

export async function withDbClient<T>(handler: (client: pg.PoolClient) => Promise<T>) {
  const client = await getDbPool().connect();

  try {
    return await handler(client);
  } finally {
    client.release();
  }
}
