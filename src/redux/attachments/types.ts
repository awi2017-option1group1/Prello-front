import { ICard } from '../cards/types'

export type IAttachment = {
    id: number,
    URL: string,
    pos: number,
    name: string,
    date: Date,
    card: ICard
}
