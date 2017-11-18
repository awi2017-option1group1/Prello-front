export type ISearchObject = {
    title: string,
    description: string,
    link: string
}

export type ISearchCategory = {
    [name: string]: ITampon
}

export type ITampon = {
    name: string,
    results: ISearchObject[]
}
