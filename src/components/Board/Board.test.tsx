/*
import * as React from 'react'
import { shallow } from 'enzyme'

import Board from './Board'
import Spinner from '../common/Spinner'
import SplitHeader from '../common/SplitHeader'

const boardType = {
    title: 'Test',
    lists: []
}

describe('<Board />', () => {
    it('should display a Spinner while loading', () => {
        const board = shallow(
            <Board 
                loading={true}
                error={undefined}
                board={boardType}
                setTitle={() => null} 
            />
        )
        expect(board.find(Spinner).length).toBe(1)
        expect(board.find(SplitHeader).length).toBe(0)
        expect(board.find('#task-lists').length).toBe(0)
    }) 
    
    it('should display a Board', () => {
        const board = shallow(
            <Board 
                loading={false}
                error={undefined}
                board={boardType}
                setTitle={() => null} 
            />
        )
        expect(board.find(Spinner).length).toBe(0)
        expect(board.find(SplitHeader).length).toBe(1)
        expect(board.find('#task-lists').length).toBe(1)
    })     
})
*/
