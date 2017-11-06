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
    env: 'development',

    server: {
        host: 'http://localhost',
        port: 3000,
        apiSuffix: 'api',
        authSuffix: 'auth'
    }
}
