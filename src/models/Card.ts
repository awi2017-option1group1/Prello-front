import Label from './Label'

export default interface Card {
    title: string
    labels: Label[]
    percent: number
    assignees: string[]
}
