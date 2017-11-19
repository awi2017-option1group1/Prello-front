import * as io from 'socket.io-client'

import { config } from '../config'

import { ILoggedUser } from '../redux/users/types'

export type Payload<T> = T & {
    requester: ILoggedUser
}

export class WSClient {

    private initialized: boolean
    private client: SocketIOClient.Socket | null
    
    private ready: boolean
    /* tslint:disable */
    private pendingEvents: any[]
    /* tslint:enable */

    constructor() {
        this.initialized = false
        this.client = null
        this.ready = false
        this.pendingEvents = []

        this.sendAllPendingEvents = this.sendAllPendingEvents.bind(this)
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

        this.client!.on('authorized', () => this.sendAllPendingEvents())
    }

    /* tslint:disable */
    public emit(event: string, ...args: any[]) {
    /* tslint:enable */
        if (!this.isInitialized()) {
            throw new Error('WSClient is not initialized')
        }

        this.client!.emit(event, ...args)
    }

    /* tslint:disable */
    public emitOnReady(event: string, ...args: any[]) {
    /* tslint:enable */
        if (!this.ready) {
            this.pendingEvents.push({
                event,
                args
            })
        } else {
            this.client!.emit(event, ...args)
        }
    }

    private sendAllPendingEvents() {
        this.ready = true
        this.pendingEvents.forEach(e => this.emit(e.event, ...e.args))
    }

    private isInitialized() {
        return this.initialized
    }

}

export const wsClient = new WSClient()
