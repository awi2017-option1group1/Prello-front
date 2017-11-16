import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/checkItems/actions'
import { ICheckItem } from '../../redux/checkItems/types'

import CheckItem from './CheckItem'

interface CheckItemContainerProps {
    checkItem: ICheckItem
    checkListId: number
}

interface PropsFromState {
    checkItem: ICheckItem
}

interface PropsFromDispatch {
    update: (name: string) => void
    setState: (state: boolean) => void
    delete: () => void
}

const mapStateToProps = (state: RootState, ownProps: CheckItemContainerProps) => {
    return {
        checkItem: ownProps.checkItem,
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckItemContainerProps) => {
    return {
        update: (name: string) => {
            dispatch(actionCreators.updateCheckItem(ownProps.checkListId, ownProps.checkItem, { name }))
        },

        setState: (state: boolean) => {
            dispatch(actionCreators.updateCheckItem(ownProps.checkListId, ownProps.checkItem, { state }))
        },

        delete: () => {
            dispatch(actionCreators.removeCheckItem(ownProps.checkListId, ownProps.checkItem))
        }
    }
}

const CheckItemContainer = connect<PropsFromState, PropsFromDispatch, CheckItemContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CheckItem)

export default CheckItemContainer
