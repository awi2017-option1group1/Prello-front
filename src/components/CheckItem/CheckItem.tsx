import * as React from 'react'

import { ICheckItem } from '../../redux/checkItems/types'

import { StateProps } from '../StateProps'

import { Checkbox } from 'semantic-ui-react'

import Spinner from '../common/Spinner'
import PageNotFound from '../../routes/PageNotFound'

export interface CheckItemProps extends StateProps {
    checkItem: ICheckItem
}

class CheckItem extends React.Component<CheckItemProps> {

    componentDidMount() {
        this.props.loadData!()
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <PageNotFound />
        }

        return (
            <section id="checkItem">
                <Checkbox label={this.props.checkItem.name}/>
            </section>
        )
    }
}

export default CheckItem
