export interface WithLoadingProps {
    loading?: boolean
}

export interface WithErrorsProps {
    error?: string
}

export interface MatchParams {
    [key: string]: string
}

export interface WithMatchProps {
    match?: {
        params: MatchParams
    }
}

export type StateProps = WithLoadingProps & WithErrorsProps & WithMatchProps
