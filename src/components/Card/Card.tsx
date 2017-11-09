import * as React from 'react'
import { Progress, Card as SmCard, CardContent, CardDescription, CardMeta } from 'semantic-ui-react'

import AssigneesAvatar from '../AssigneesAvatar'
import LabelsList from '../common/LabelsList'

import { ICard } from '../../redux/cards/types'

import './card.css'

export interface CardProps {
    card: ICard

    onClick: () => void
}

const Card: React.StatelessComponent<CardProps> = (props) => (
    <SmCard onClick={props.onClick}>
        <CardContent>
            <AssigneesAvatar assignees={[]} />
            <CardMeta>
                <LabelsList labels={[]} maxToDisplay={2} />
            </CardMeta>
            <CardDescription>
                {props.card.name}
            </CardDescription>
        </CardContent>
        {0 !== 0 &&
            <Progress percent={0} indicating={true} attached="bottom" />
        }
    </SmCard>
)

export default Card
