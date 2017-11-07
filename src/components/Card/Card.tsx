import * as React from 'react'
import { Progress, Card as SmCard, CardContent, CardDescription, CardMeta } from 'semantic-ui-react'

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
                <AssigneesAvatar assignees={props.card.assignees} />
                <CardMeta>
                    <LabelsList labels={props.card.labels} maxToDisplay={2} />
                </CardMeta>
                <CardDescription>
                    {props.card.title}
                </CardDescription>
            </CardContent>
            {props.card.percent !== 0 &&
                <Progress percent={props.card.percent} indicating={true} attached="bottom" />
            }
        </SmCard>
    )
}

export default Card
