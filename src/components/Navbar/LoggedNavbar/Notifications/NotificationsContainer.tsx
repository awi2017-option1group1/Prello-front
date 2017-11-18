import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../../../redux/RootReducer'
import { actionCreators as notificationsActionsCreators } from '../../../../redux/notifications/actions'
import { INotification } from '../../../../redux/notifications/types'

import Notifications from './Notifications'

interface PropsFromState {
    notifications: INotification[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    deleteUserNotifications: () => void
}

const mapStateToProps = (state: RootState) => {
    return {
        notifications: state.notification.notifications,
        error: state.notification.error,
        loading: state.notification.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadData: () => { dispatch(notificationsActionsCreators.fetchNotifications()) },
        deleteUserNotifications: () => { dispatch(notificationsActionsCreators.deleteAllFromUser()) }
    }
}

const NotificationsContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
        mapStateToProps,
        mapDispatchToProps
    )(Notifications)
)

export default NotificationsContainer
