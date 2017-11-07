import { ICheckItem } from '../checkItems/types'

export type ICheckList = {
    id: number,
    name: string,
    pos: number,
    cardId: number,
    checkItems: ICheckItem[]
}
