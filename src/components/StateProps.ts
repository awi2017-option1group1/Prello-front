export interface WithLoadingProps {
    loading?: boolean
}

export interface WithErrorsProps {
    error?: string
}

export type StateProps = WithLoadingProps & WithErrorsProps
