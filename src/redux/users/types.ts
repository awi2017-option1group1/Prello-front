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
    firstName: string,
    lastName: string,
    speudo: string,
    biography: Text,
    notificationEnabled: boolean,
    email: string,
    password: string,
    boardRole: IBoardRole[],
    teamRole: ITeamRole[]
}
