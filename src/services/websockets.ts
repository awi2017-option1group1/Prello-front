import * as io from 'socket.io-client'

import { config } from '../config'

import { ILoggedUser } from '../redux/users/types'

export type Payload<T> = T & {
    requester: ILoggedUser
}

export class WSClient {

    private initialized: boolean
    private client: SocketIOClient.Socket | null

    constructor() {
        this.initialized = false
        this.client = null
    }

    public initialize() {
        if (this.isInitialized()) {
            return
        }

        this.client = io(config.server.host, { 
            path: `/${config.server.realtimeSuffix}`,
            transports: ['websocket']
        })

        this.initialized = true
    }

    public on(event: string, callback: Function) {
        if (!this.isInitialized()) {
            throw new Error('WSClient is not initialized')
        }

        this.client!.on(event, callback)
    }

    /* tslint:disable */
    public emit(event: string, ...args: any[]) {
    /* tslint:enable */
        if (!this.isInitialized()) {
            throw new Error('WSClient is not initialized')
        }

        this.client!.emit(event, ...args)
    }

    private isInitialized() {
        return this.initialized
    }

}

export const wsClient = new WSClient()
