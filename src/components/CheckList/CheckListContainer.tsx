import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'

import { actionCreators as checkListsActionsCreators } from '../../redux/checkLists/actions'
import { actionCreators as checkItemsActionsCreators } from '../../redux/checkItems/actions'

import { ICheckList } from '../../redux/checkLists/types'

import CheckList from './CheckList'

interface CheckListContainerProps {
    checkList: ICheckList
}

interface PropsFromState {
    numberItemsCompleted: number
    numberItems: number
}

interface PropsFromDispatch {
    setTitle: (title: string) => void
    delete: () => void
    createCheckItem: (title: string) => void
}

const mapStateToProps = (state: RootState, ownProps: CheckListContainerProps) => {
    if (ownProps.checkList.id) {
        return {
            numberItemsCompleted: state.checkItems[ownProps.checkList.id].items.filter(i => i.state).length,
            numberItems: state.checkItems[ownProps.checkList.id].items.length
        }
    } else {
        return {
            numberItemsCompleted: 0,
            numberItems: 0
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckListContainerProps) => {
    return {
        setTitle: (title: string) => {
            dispatch(checkListsActionsCreators.updateCheckList(ownProps.checkList, { name: title }))
        },
        
        delete: () => {
            dispatch(checkListsActionsCreators.removeCheckList(ownProps.checkList))
        },

        createCheckItem: (title: string) => {
            dispatch(checkItemsActionsCreators.createCheckItemFromCheckListId(ownProps.checkList.id, { name : title }))
        }
    }
}

const CheckListContainer = connect<PropsFromState, PropsFromDispatch, CheckListContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CheckList)

export default CheckListContainer
