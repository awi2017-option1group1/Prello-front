import { SemanticCOLORS } from 'semantic-ui-react'

import { semanticColors } from './color'

const randColor = (): SemanticCOLORS => {
    return semanticColors[Math.floor((Math.random() * 13))] as SemanticCOLORS
}

export default randColor
