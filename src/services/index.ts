import * as rp from 'request-promise'

class Api {

    private static DEFAULT_OPTIONS = {
        json: true
    } 

    constructor(private baseUrl: string) {
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
    }

    get(url: string, options: {} = {}) {
        return rp.get(
            this.toUrl(url), 
            Object.assign({}, Api.DEFAULT_OPTIONS, options)
        )
    }

    post(url: string, data: {} = {}, options: {} = {}) {
        return rp.post(
            this.toUrl(url), 
            Object.assign({}, Api.DEFAULT_OPTIONS, { body: data }, options)
        )
    }

    put(url: string, data: {} = {}, options: {} = {}) {
        return rp.put(
            this.toUrl(url), 
            Object.assign({}, Api.DEFAULT_OPTIONS, { body: data } , options)
        )
    }

    delete(url: string, options: {} = {}) {
        return rp.delete(
            this.toUrl(url), 
            Object.assign({}, Api.DEFAULT_OPTIONS, options)
        )
    }

    private toUrl(relativeUrl: string) {
        return `${this.baseUrl}${relativeUrl}`
    }

}

export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'https://prello-api.herokuapp.com'
    } else {
        return 'http://localhost:5000'
    }
}

export const API = new Api(getBaseUrl())
