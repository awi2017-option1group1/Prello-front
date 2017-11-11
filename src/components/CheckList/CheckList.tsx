import * as React from 'react'
import { Input, Accordion, Checkbox } from 'semantic-ui-react'

import { ICheckList } from '../../redux/checkLists/types'

import { StateProps } from '../StateProps'

import EditableTitle from '../common/EditableTitle'
import Spinner from '../common/Spinner'
import PageNotFound from '../../routes/PageNotFound'

import CheckItems from './../CheckItems'

export interface CheckListProps extends StateProps {
    checkList: ICheckList
    setTitle: (title: string) => void
}

class CheckList extends React.Component<CheckListProps> {
    state = { activeCheckList: -1 }

    componentDidMount() {
        this.props.loadData!()
    }

    handleClick = (e: React.SyntheticEvent<HTMLDivElement>, titleProps: {index: number}) => {
        const { index } = titleProps
        const { activeCheckList } = this.state
        const newIndex = activeCheckList === index ? -1 : index
        this.setState({ activeCheckList: newIndex })
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <PageNotFound />
        }

        const { activeCheckList } = this.state

        return (
            <section id="checkList">
                <Accordion styled={true} fluid={true} />
                <Accordion.Title
                            active={activeCheckList === 0}
                            index={0}
                            onClick={this.handleClick}
                >
                    <EditableTitle
                            type="h3"
                            content={this.props.checkList.name + ' = ' + this.props.checkList.id+ ' & CARD ID = '
             + this.props.checkList.cardId}
                            onSubmit={this.props.setTitle}
                    />
                </Accordion.Title>
                <Accordion.Content active={activeCheckList === 0}>
                    <CheckItems checkListId={this.props.checkList.id} />
                    <Input fluid={true} placeholder="New Task" />
                </Accordion.Content>
            </section>
        )
    }
}

export default CheckList
