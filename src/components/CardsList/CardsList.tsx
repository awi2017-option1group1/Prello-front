import { CardGroup } from 'semantic-ui-react'
import * as React from 'react'

import Card from '../Card'

import './cards-list.css'

export interface CardsListProps {
    id: number
    cards: number[]
    emptyText: string
}

const CardsList: React.StatelessComponent<CardsListProps> = (props) => (
    <CardGroup className="cards-list">
        {!props.cards.length && <p className="cards-list cards-list-no-content">{props.emptyText}</p>}
        {props.cards.map(id => <Card id={id} key={id} />)}
    </CardGroup>
)

export default CardsList
