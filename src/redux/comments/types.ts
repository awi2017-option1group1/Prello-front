import { IUser } from '../users/types'

export type IComment = {
    id: number,
    content: string,
    createdDate: Date,
    updatedDate: Date,
    user: IUser
}
