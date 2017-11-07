import { SemanticCOLORS } from 'semantic-ui-react'

const randColor = (): SemanticCOLORS => {
    const semanticColors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
        'black'
    ]
    return semanticColors[Math.floor((Math.random() * 13))] as SemanticCOLORS
}

export default randColor
