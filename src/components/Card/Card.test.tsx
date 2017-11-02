import * as React from 'react'
import { shallow } from 'enzyme'
import { CardContent } from 'semantic-ui-react'

import Card from './Card'
import ICard from './../../models/Card'
// import Spinner from '../common/Spinner'
// import AssigneesAvatar from '../AssigneesAvatar'

const cardType: ICard = {
    name: 'Test',
    desc: 'Test descr', 
    due: null,
    dueComplete: null,
    pos: 1,
    tags: [],
    members: [],
    list: null,
    tasksList: [],
    comments: [],
    attachments: [],
}

describe('<Card />', () => 

    it('should test', () => {
        const card = shallow(
            <Card 
                id={1}
                card={cardType}
            />
        )
        console.log("CARD CONTENT = " + card.find(CardContent.name))
        expect(card.find(CardContent).length).toBe(1)
    })
    
    /*
    it('should display a Spinner while loading', () => {
        const card = shallow(
            <Card 
                id={1}
                card={cardType}
            />
        )
        expect(card.find(Spinner).length).toBe(1)
        expect(card.find(CardContent).length).toBe(0)
    })
    */

    /*
    it('should display a Card with progress bar', () => {
        const card = shallow(
            <Card 
                loading={false}
                id={1}
                error={undefined}
                card={cardType} 
            />
        )
        expect(card.find(Spinner).length).toBe(0)
        expect(card.find(CardContent).length).toBe(1)
        expect(card.find(CardDescription).children().text()).toBe('Test')   
        expect(card.find(Progress).length).toBe(1)   
        expect(card.find(AssigneesAvatar).props().assignees).toEqual(['toto'])   
    }) */

    /*
    it('should display a Card without progress bar', () => {
        const card = shallow(
            <Card 
                loading={false}
                id={1}
                error={undefined}
                card={{ ...cardType, percent: 0, assignees: [] }} 
            />
        )
        expect(card.find(Spinner).length).toBe(0)
        expect(card.find(CardContent).length).toBe(1)
        expect(card.find(CardDescription).children().text()).toBe('Test')   
        expect(card.find(Progress).length).toBe(0)
        expect(card.find(AssigneesAvatar).props().assignees).toEqual([])   
    })   */     
})
