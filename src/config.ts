export interface ServerConfig {
    host: string
    port: number
    apiSuffix: string
    authSuffix: string
}

export interface Config {
    env: 'development' | 'production' | 'test'

    server: ServerConfig
}

// Add default value because the env variables
// are not set with the hot-reload activated
export const config: Config = {
    env: process.env.NODE_ENV || 'development',

    server: {
        host: process.env.SERVER_HOST || 'http://localhost',
        port: process.env.PORT || 3000,
        apiSuffix: process.env.API_SUFFIX || 'api',
        authSuffix: process.env.AUTH_SUFFIX || 'auth'
    }
}
