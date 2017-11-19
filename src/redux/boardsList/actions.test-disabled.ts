// import thunk from 'redux-thunk'
// import * as nock from 'nock'

// import configureMockStore from 'redux-mock-store'
// import { getBaseUrl } from '../../services/http'

// import { CREATE_BOARD, CREATE_BOARD_SUCCESS, CREATE_BOARD_ERROR } from './actions/create'
// import { FETCH_BOARDS, FETCH_BOARDS_ERROR, FETCH_BOARDS_SUCCESS } from './actions/fetchAll'

// import { actionCreators } from './actions'

// import { IBoard } from '../boards/types'

// const boardModel: IBoard = {
//     id: 1,
//     name: 'Model Board',
//     isPrivate: true
// }

// const boardModel2: IBoard = {
//     id: 2,
//     name: 'Board 2',
//     isPrivate: false
// }

// const boardDefault: IBoard = {
//     id: -1,
//     name: '',
//     isPrivate: false
// }

// describe('Board sync actions', () => {

//     it('should return a create CREATE_BOARD', () => {
//         const expectedAction = {
//             type: CREATE_BOARD,
//             board: boardModel
//         }
//         expect(actionCreators.createBoardRequest(boardModel)).toEqual(expectedAction)
//     }),
    
//     it('should return a success create CREATE_BOARD_SUCCESS', () => {
//         const expectedAction = {
//             type: CREATE_BOARD_SUCCESS,
//             board: boardModel
//         }
//         expect(actionCreators.createBoardRequestSuccess(boardModel)).toEqual(expectedAction)
//     }),

//     it('should return a remove CREATE_BOARD_ERROR', () => {
//         const expectedAction = {
//             type: CREATE_BOARD_ERROR,
//             error: 'ID requested'
//         }
//         expect(actionCreators.createBoardRequestError('ID requested')).toEqual(expectedAction)
//     }),

//     it('should return an action FETCH_BOARDS', () => {
//         const expectedAction = {
//             type: FETCH_BOARDS
//         }         
//         expect(actionCreators.fetchBoardsRequest()).toEqual(expectedAction)
//     }),

//     it('should return an action FETCH_BOARDS_ERROR', () => {
//         const expectedAction = {
//             type: FETCH_BOARDS_ERROR,
//             error: 'ID requested'
//         }         
//         expect(actionCreators.fetchBoardsRequestError('ID requested')).toEqual(expectedAction)
//     }),

//     it('should return an action FETCH_BOARDS_SUCCESS', () => {
//         const expectedAction = {
//             type: FETCH_BOARDS_SUCCESS,
//             boards: [
//                 boardModel,
//                 boardModel2
//             ]
//         }         
//         expect(actionCreators.fetchBoardsRequestSuccess([boardModel, boardModel2])).toEqual(expectedAction)
//     })
// })

// // const mockStore = configureMockStore([thunk])
// // describe('BoardsList async actions', () => {
// //     afterEach(() => {
// //         nock.cleanAll()
// //     })

// //     it('should create CREATE_BOARD_SUCCESS when success create response is received', () => {
// //         nock(getBaseUrl())
// //             .post('/users/1/boards')
// //             .reply(200, { board: boardModel })

// //         const expectedActions = [
// //             { 
// //                 type: CREATE_BOARD,
// //                 board: boardDefault
// //             },
// //             {   type: CREATE_BOARD_SUCCESS,
// //                 board: boardModel 
// //             },
// //             {
// //                 type: 'SHOW_ALERT_MESSAGE',
// //                 payload: {'msg': 'Content saved!', 'type': 'success'},
// //             }
// //         ]

// //         const store = mockStore({
// //             auth: {
// //                 user: {
// //                     uid: 1
// //                 }
// //             }
// //         })
// //         return store.dispatch(actionCreators.createBoard()).then(() => {
// //             expect(store.getActions()).toEqual(expectedActions)
// //         })
// //     })
// // })
