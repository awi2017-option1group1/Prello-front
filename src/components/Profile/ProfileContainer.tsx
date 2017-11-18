import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/users/actions'
import { IUser } from '../../redux/users/types'
import Profile from './Profile'

interface PropsFromState {
    user: IUser
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    setFullName: (fullName: string) => void
    setEmail: (email: string) => void
    setPseudo: (pseudo: string) => void
    setBio: (bio: string) => void
    toggleNotifications: () => void
    setPassword: (password: string) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.user,
        error: state.user.error,
        loading: state.user.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadData: () => { dispatch(actionCreators.fetchUser()) },

        setFullName: (fullName: string) => {
            dispatch(actionCreators.updateUser({ fullName: fullName }))
        },
        setEmail: (email: string) => {
            dispatch(actionCreators.updateUser({ email: email }))
        },
        setPseudo: (pseudo: string) => {
            dispatch(actionCreators.updateUser({ username: pseudo }))
        },
        setBio: (bio: string) => {
            dispatch(actionCreators.updateUser({ bio: bio }))
        },
        toggleNotifications: () => {
            dispatch(actionCreators.toggleNotifications())
        },
        setPassword: (password: string) => {
            dispatch(actionCreators.updateUser({ password: password }))
        }
    }
}

const ProfileContainer = connect<PropsFromState, PropsFromDispatch, {}>(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

export default ProfileContainer
