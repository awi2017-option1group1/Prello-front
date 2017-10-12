import { IList } from '../lists/types'
import { ITag } from '../tags/types'

export type IUserRoleInBoard = {
    userId: number,
    role: string
}

export type IBoard = {
    id: number,
    title: string,
    isPrivate: boolean,
    lists: IList[],
    tags: ITag[],
    userRole: IUserRoleInBoard[]
}
