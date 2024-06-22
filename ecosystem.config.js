module.exports = {
    apps: [
      {
        name: 'backend',
        script: './backend/main.js',  // Path to your server entry point
        watch: true,                      // Watch for changes in files
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'my-app',
        script: 'npm',
        args: 'start',
        cwd: './my-app',                  // Current working directory for the client
        interpreter: 'none',              // Don't use any interpreter for npm start
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  