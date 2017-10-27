export interface FormError {
    field: string,
    message: string
}

export type FormErrors = Array<FormError>
