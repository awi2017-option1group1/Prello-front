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

export const config: Config = {
    env: process.env.NODE_ENV,

    server: {
        host: process.env.HOST,
        port: process.env.PORT,
        apiSuffix: process.env.API_SUFFIX,
        authSuffix: process.env.AUTH_SUFFIX
    }
}
