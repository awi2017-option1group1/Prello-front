import * as React from 'react'
import { setTimeout } from 'timers'

import { StateProps } from '../StateProps'

import Board from './DnDContextBoard'
import BoardModel from '../../models/Board'

interface BoardContainerProps {
    id: number
}

interface BoardContainerState extends StateProps {
    board: BoardModel | null
}

class BoardContainer extends React.Component<BoardContainerProps, BoardContainerState> {
    constructor(props: BoardContainerProps) {
        super(props)
        this.state = {
            loading: true,
            board: null
        }

        this.setTitle = this.setTitle.bind(this)
    }

    componentWillMount() {
        // Fetch
        setTimeout(
            () => {
                this.setState({
                    loading: false,
                    board: {
                        title: 'Hello',
                        lists: [1, 5, 8]
                    }
                })
            }, 
            130)
    }

    setTitle(title: string) {
        this.setState({
            board: {
                ...this.state.board!,
                title
            }
        })
    }

    render() {
        return (
            <Board 
                error={this.state.error} 
                loading={this.state.loading} 
                board={this.state.board!} 
                setTitle={this.setTitle} 
            />
        )
    }
}

export default BoardContainer
