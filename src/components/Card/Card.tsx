import * as React from 'react'
import { Progress, Card as SmCard, CardContent, CardDescription, CardMeta } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import AssigneesAvatar from '../AssigneesAvatar'
import LabelsList from '../common/LabelsList'

import { ICard } from '../../redux/cards/types'
import { ITag } from '../../redux/tags/types'

import './card.css'

export interface CardProps extends StateProps {
    card: ICard
    labels: ITag[]
    shouldBeOpen: boolean

    open: () => void
    onClick: () => void
}

class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props)
    }

    componentWillMount() {
        this.props.loadData!()
        if (this.props.shouldBeOpen) {
            this.props.open()
        }
    }

    render() {
        return (
            <SmCard onClick={this.props.onClick}>
                <CardContent>
                    <AssigneesAvatar assignees={[]} />
                    <CardMeta>
                        <LabelsList labels={this.props.labels} maxToDisplay={2} />
                    </CardMeta>
                    <CardDescription>
                        {this.props.card.name}
                    </CardDescription>
                </CardContent>
                {0 !== 0 &&
                    <Progress percent={0} indicating={true} attached="bottom" />
                }
            </SmCard>
        )
    }
}

export default Card
