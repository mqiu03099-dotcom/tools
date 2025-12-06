module.exports = {
  apps: [
    {
      name: "tools",
      exec_mode: "cluster",
      instances: "max",
      script: "./server/index.mjs",
      cwd: ".output",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
      env_dev: {
        PORT: 3001,
        NODE_ENV: "development",
      },
    },
  ],
};

