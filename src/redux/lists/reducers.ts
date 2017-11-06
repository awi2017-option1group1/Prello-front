import { ADD_LIST, REMOVE_LIST } from './actions'
import { RootAction } from '../RootAction'
import { IList } from '../lists/types'

export type State = IList[]

const defaultValue: State = []

export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {

            case ADD_LIST:
                return [...state, {
                    id: action.id,
                    title: action.title,
                }]

            case REMOVE_LIST:
                return [
                    ...state.slice(0, action.index),
                    ...state.slice(action.index + 1)
                ]

            default:
                return state
            }

}

export const actionCreators = {
    fetchBoardRequest: (): Actions[typeof FETCH_BOARD] => ({
        type: FETCH_BOARD
    }),
    fetchBoardRequestError: (error: string): Actions[typeof FETCH_BOARD_ERROR] => ({
        type: FETCH_BOARD_ERROR,
        error
    }),
    fetchBoardRequestSuccess: (board: IBoard): Actions[typeof FETCH_BOARD_SUCCESS] => ({
        type: FETCH_BOARD_SUCCESS,
        board
    }),
    fetchBoard: (boardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardRequest())
            return API.get(`/boards/${boardId}`).then(
                board => dispatch(actionCreators.fetchBoardRequestSuccess(board)),
                error => dispatch(actionCreators.fetchBoardRequestError(error.error.error))
            )
        }
    }
    
}
