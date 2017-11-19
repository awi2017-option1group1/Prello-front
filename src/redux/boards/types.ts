import { IUser } from '../users/types'

export type IBoard = {
    id: number,
    name: string,
    isPrivate: boolean,
    owner: IUser
}
