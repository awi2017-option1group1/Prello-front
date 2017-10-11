import { ICard } from '../cards/types'

export type IList = {
    id: number,
    title: string, 
    rank: number,
    cards: ICard[],
}
