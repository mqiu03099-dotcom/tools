module.exports = {
  apps: [
    {
      name: "milk-frog-admin",
      script: ".output/server/index.mjs",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "3004",
        POSTGRES_HOST: "localhost",
        POSTGRES_PORT: "5432",
        POSTGRES_DATABASE: "milk_frog_admin",
        POSTGRES_USER: "postgres",
        POSTGRES_PASSWORD: "root",
        WECHAT_APP_ID: "wx394b878feb6c7786",
        WECHAT_APP_SECRET: "84f13a5aed45bf9bd7a0c5969a9fa6e1"
      },
      error_file: "./local/pm2-error.log",
      out_file: "./local/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
