const nextRuntimeDotenv = require('next-runtime-dotenv');
const withConfig = nextRuntimeDotenv({
    // path: '.env',
    public: [
        'API_URL',
        'SECRET'
    ],
    server: [
        'API_URL',
        'SECRET'
    ]
});

module.exports = withConfig({
    webpack: (config, {isServer}) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            };
        }

        return config
    }
});
