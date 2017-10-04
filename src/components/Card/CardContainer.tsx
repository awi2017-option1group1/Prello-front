import * as React from 'react'
import { setTimeout } from 'timers'

import Card from './DraggableCard'
import CardModel from '../../models/Card'

import { StateProps } from '../StateProps'

const randomCards: CardModel[] = [
    {
        title: 'Steve wants to add you to the group best friends',
        labels: [
            {
                title: 'Low',
                color: 'olive'
            },
            {
                title: 'Zendesk',
                color: 'green'
            }
        ],
        percent: 0,
        assignees: ['steve', 'elliot', 'jenny']
    },
    {
        title: 'Molly wants to add you to the group musicians',
        labels: [{
            title: 'Urgent',
            color: 'red'
        }],
        percent: 20,
        assignees: ['daniel']
    },
    {
        title: 'Steve wants to add you to the group best friends',
        labels: [{
            title: 'P1',
            color: 'violet'
        }],
        percent: 40,
        assignees: ['elliot', 'daniel']
    },
    {
        title: 'Jenny requested permission to view your contact details',
        labels: [
            {
                title: 'Urgent',
                color: 'red'
            },
            {
                title: 'Test',
                color: 'teal'
            },
            {
                title: 'UI',
                color: 'orange'
            }
        ],
        percent: 60,
        assignees: []
    },
    {
        title: 'Molly wants to add you to the group musicians',
        labels: [],
        percent: 80,
        assignees: ['jenny']
    },
    {
        title: 'Jenny requested permission to view your contact details',
        labels: [{
            title: 'UI',
            color: 'orange'
        }],
        percent: 100,
        assignees: ['elliot', 'jenny']
    }
]

interface CardContainerProps {
    id: number
}

interface CardContainerState extends StateProps {
    key: number
    card: CardModel | null
}

class CardContainer extends React.Component<CardContainerProps, CardContainerState> {
    constructor(props: CardContainerProps) {
        super(props)
        this.state = {
            loading: true,
            card: null,
            key: Math.random() * 100000
        }
    }

    componentWillMount() {
        // Fetch
        setTimeout(
            () => {
                this.setState({
                    loading: false,
                    card: randomCards[Math.floor(Math.random() * 6)]
                })
            }, 
            Math.random() * 10 + 130)
    }

    render() {
        return (
            <Card 
                error={this.state.error} 
                loading={this.state.loading} 
                id={this.state.key}
                card={this.state.card!}
            />
        )
    }
}

export default CardContainer
