import { FormErrors } from '../redux/forms'

export interface WithErrors {
    errors: FormErrors
}

export type FormProps = WithErrors
