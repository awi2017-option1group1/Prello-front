import * as React from 'react'
import { CardGroup } from 'semantic-ui-react'

import { StateProps } from '../StateProps'
import { ICard } from '../../redux/cards/types'

import Spinner from '../common/Spinner'
import Card from '../Card'

import './cards-list.css'

export interface CardsListProps extends StateProps {
    listId: number
    cards: ICard[]
    emptyText: string

    open: (card: ICard) => void
}

class CardsList extends React.Component<CardsListProps> {
    constructor(props: CardsListProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData!()
    }

    render() {
        if (this.props.loading) {
            return (
                <CardGroup className="cards-list">
                    <Spinner />
                </CardGroup>
            )
        }
    
        return (
            <CardGroup className="cards-list">
                {!this.props.cards.length && <p className="cards-list cards-list-no-content">{this.props.emptyText}</p>}
                {this.props.cards.map(card => 
                    <Card card={card} key={card.id || -1} onClick={() => this.props.open(card)} />
                )}
            </CardGroup>
        )
    }
}

export default CardsList
