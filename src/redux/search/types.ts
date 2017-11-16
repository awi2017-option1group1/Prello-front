export type ISearchObject = {
    name: string,
    description: string,
    link: string
}

export type ISearchCategory = {
    name: string,
    results: ISearchObject[],
}
