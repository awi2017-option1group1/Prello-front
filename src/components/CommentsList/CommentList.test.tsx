/*import * as React from 'react'
import { shallow } from 'enzyme'
import { Card, CardGroup } from 'semantic-ui-react'

import CardsList from './CardsList'

describe('<CardsList />', () => {
    it('should display empty text if no cards', () => {
        const assigneesAvatar = shallow(
            <CardsList 
                cards={[]}
                emptyText="Test Empty"
            />
        )
        expect(assigneesAvatar.find(CardGroup).length).toBe(1)
        expect(assigneesAvatar.find('p').text()).toBe('Test Empty')
    })

    it('should not display empty text if we have cards', () => {
        const assigneesAvatar = shallow(
            <CardsList 
                cards={[1]}
                emptyText="Test Empty"
            />
        )
        expect(assigneesAvatar.find(CardGroup).length).toBe(1)
        expect(assigneesAvatar.find('p').length).toBe(0)
        expect(assigneesAvatar.find(Card).length).toBe(0)
    })    
})*/
