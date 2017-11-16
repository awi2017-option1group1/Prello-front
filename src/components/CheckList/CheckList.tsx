import * as React from 'react'
import { Input, Button, Segment, Label, Progress } from 'semantic-ui-react'

import { ICheckList } from '../../redux/checkLists/types'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'

import EditableTitle from '../common/EditableTitle'
import ConfirmModal from '../common/ConfirmModal/ConfirmModal'
import Spinner from '../common/Spinner'
import PageNotFound from '../../routes/PageNotFound'

import CheckItems from './../CheckItems'

import './check-list.css'

export interface CheckListProps extends StateProps {
    checkList: ICheckList

    numberItemsCompleted: number
    numberItems: number

    setTitle: (title: string) => void
    delete: () => void
    createCheckItem: (title: string) => void
}

interface CheckListState {
    value: string
}

class CheckList extends React.Component<CheckListProps, CheckListState> {
    constructor(props: CheckListProps) {
        super(props)
        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit() {
        this.props.createCheckItem(this.state.value)
        this.setState({
            value: ''
        })  
    }

    handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' && this.state.value !== '') {
            this.handleSubmit()
        }
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <PageNotFound />
        }

        return (
            <Segment className="check-list">
                {this.props.numberItemsCompleted !== 0 &&
                    <Progress 
                        percent={(this.props.numberItemsCompleted / this.props.numberItems) * 100} 
                        indicating={true} 
                        attached="top" 
                    />
                }

                <Label ribbon={true} color="olive" className="task-counter">
                    {this.props.numberItemsCompleted} / {this.props.numberItems} item(s)
                </Label>

                <SplitHeader>
                    <EditableTitle
                            type="h3"
                            content={this.props.checkList.name}
                            onSubmit={this.props.setTitle}
                    />
                    <ConfirmModal
                        trigger={
                            <Button
                                icon="trash"
                                circular={true}
                                size="small"
                                color="red"
                            />
                        }
                        title="Confirm delete"
                        content={`Are you sure you want to delete check-list '${this.props.checkList.name}'? `}
                        confirmButton="Yes, delete"
                        cancelButton="No, cancel"
                        onConfirm={this.props.delete}
                    />
                </SplitHeader>

                <CheckItems checkListId={this.props.checkList.id} />

                <Input 
                    className="add-task"
                    transparent={true} 
                    placeholder="Add task..." 
                    onChange={this.handleChange} 
                    onKeyPress={this.handleKeyPress}
                    value={this.state.value}
                />
            </Segment>
        )
    }
}

export default CheckList
