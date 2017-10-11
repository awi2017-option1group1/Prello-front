import { IBoard } from '../boards/types'

type IUserRoleInTeam = {
    userId: number,
    role: string
}

export type ITeam = {
    id: number,
    name: string,
    description: Text,
    isPrivate: boolean,
    boards: IBoard[],
    userRole: IUserRoleInTeam[]
}
