import * as React from 'react'
import { Input, Accordion, Checkbox } from 'semantic-ui-react'

import { ICheckList } from '../../redux/checkLists/types'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'

import EditableTitle from '../common/EditableTitle'
import ConfirmModal from '../common/ConfirmModal/ConfirmModal'
import Spinner from '../common/Spinner'
import PageNotFound from '../../routes/PageNotFound'

import CheckItems from './../CheckItems'

export interface CheckListProps extends StateProps {
    checkList: ICheckList
    setTitle: (title: string) => void
    delete: () => void
}

class CheckList extends React.Component<CheckListProps> {

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <PageNotFound />
        }

        return (
            <section id="checkList">
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
                                size='mini'
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
                    <Input fluid={true} placeholder="New Task" />
            </section>
        )
    }
}

export default CheckList
