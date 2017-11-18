import * as React from 'react'

import { ICheckItem } from '../../redux/checkItems/types'

import { StateProps } from '../StateProps'
import Spinner from '../common/Spinner'

import CheckItem from '../CheckItem'

export interface CheckItemsProps extends StateProps {
    checkListId: number
    checkItems: ICheckItem[]
}

class CheckItems extends React.Component<CheckItemsProps> {
    constructor(props: CheckItemsProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData!()
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <section id="checkItem-lists" className="checkItem-lists">
                {this.props.checkItems.map(checkItem => (
                    <CheckItem 
                        checkItem={checkItem} 
                        key={checkItem.id || -1} 
                        checkListId={this.props.checkListId} 
                    />
                ))}
            </section>
        )
    }
}

export default CheckItems
