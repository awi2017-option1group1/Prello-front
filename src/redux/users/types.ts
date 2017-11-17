type IBoardRole = {
    boardId: number,
    role: string
}

type ITeamRole = {
    teamId: number,
    role: string
}

export type IUser = {
    id: number,
    fullName?: string,
    username: string,
    bio?: string,
    notificationsEnabled: boolean,
    email: string,
    password: string,
    uuidToken?: string | null,
    boardRole?: IBoardRole[],
    teamRole?: ITeamRole[]
}

export type ILoggedUser = {
    uid: number,
    email: string,
    username: string
}
