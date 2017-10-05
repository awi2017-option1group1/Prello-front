export const LOGIN = 'LOGIN'
export const LOGGED = 'LOGGED'

export type Actions = {
    LOGIN: {
        type: typeof LOGIN,
        email: string,
        password: string,
    },
    LOGIN_RESPONSE: {
        type: typeof LOGGED
    }
}

export const actionCreators = {
    login: (email: string, password: string): Actions[typeof LOGIN] => {
        // call api
        // call().then(response => dispatch(logged(response)))
        return {
            type: LOGIN,
            email,
            password
        }
    }
}
