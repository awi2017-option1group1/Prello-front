import * as React from 'react'

import { ICheckList } from '../../redux/checkLists/types'

import { StateProps } from '../StateProps'
import Spinner from '../common/Spinner'

import CheckList from '../CheckList'

export interface CheckListsProps extends StateProps {
    checkLists: ICheckList[]
}

class CheckLists extends React.Component<CheckListsProps> {
    constructor(props: CheckListsProps) {
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
            <section id="checkList-lists" className="checkList-lists">
                {this.props.checkLists.map(checkList => <CheckList checkList={checkList} key={checkList.id || -1}/>)}
            </section>
        )
    }
}

export default CheckLists
