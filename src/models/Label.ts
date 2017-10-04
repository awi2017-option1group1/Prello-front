export type Color = 
    'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' |
    'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'black'

export default interface Label {
    title: string
    color: Color
}
