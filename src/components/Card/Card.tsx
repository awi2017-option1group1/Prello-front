import * as React from 'react'
import { Card as SmCard, CardContent, CardDescription, CardMeta } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import Spinner from '../common/Spinner'
import AssigneesAvatar from '../AssigneesAvatar'
import LabelsList from '../common/LabelsList'

import CardModel from '../../models/Card'

import './card.css'

export interface CardProps extends StateProps {
    id: number 
    card: CardModel
}

const Card: React.StatelessComponent<CardProps> = (props) => {
    if (props.loading) {
        return (
            <SmCard>
                <Spinner />
            </SmCard>
        )
    }

    return (
        <SmCard>
            <CardContent>
                <AssigneesAvatar assignees={props.card.members} />
                <CardMeta>
                    <LabelsList labels={props.card.tags} maxToDisplay={2} />
                </CardMeta>
                <CardDescription>
                    {props.card.name}
                </CardDescription>
            </CardContent>
        </SmCard>
    )
}

export default Card
