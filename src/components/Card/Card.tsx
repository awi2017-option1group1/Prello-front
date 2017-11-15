import * as React from 'react'
import { Progress, Card as SmCard, CardContent, CardDescription, CardMeta } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import AssigneesAvatar from '../AssigneesAvatar'
import LabelsList from '../common/LabelsList'

import { ICard } from '../../redux/cards/types'
import { ITag } from '../../redux/tags/types'
import { IUser } from '../../redux/users/types'

import './card.css'

export interface CardProps extends StateProps {
    card: ICard
    labels: ITag[]
    assignees: IUser[]
    
    onClick: () => void
}

class Card extends React.Component<CardProps> {
        constructor(props: CardProps) {
            super(props)
        }
    
        componentWillMount() {
            this.props.loadData!()
        }
    
        render() {
            return (
                <SmCard onClick={this.props.onClick}>
                    <CardContent>
                        <AssigneesAvatar assignees={this.props.assignees} />
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
