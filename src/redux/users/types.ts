export type IUser = {
    id: number,
    fullName?: string,
    username: string,
    bio?: string,
    notificationsEnabled: boolean,
    email: string,
    password: string,
    uuidToken?: string | null,
    avatarColor?: string
}

export type ILoggedUser = {
    uid: number,
    email: string,
    username: string,
    avatarColor: string
}
