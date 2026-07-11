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
        PORT: "3004"
      },
      error_file: "./local/pm2-error.log",
      out_file: "./local/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
