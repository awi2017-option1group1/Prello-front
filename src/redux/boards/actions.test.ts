// import thunk from 'redux-thunk'
// import * as nock from 'nock'
// import configureMockStore from 'redux-mock-store'

// import { getBaseUrl } from '../../services/http'

// import { CREATE_BOARD, CREATE_BOARD_SUCCESS, 
//     BOARD_ERROR, BOARD_SUCCESS, 
//     REMOVE_BOARD, UPDATE_BOARD } from './actions'
// import { actionCreators } from './actions'

// import { IBoard } from './types'

// describe('Board sync actions', () => {

//     it('should return a error action', () => {
//         const expectedAction = {
//             type: BOARD_ERROR,
//             error: 'did not created',
//         }
//         expect(actionCreators.boardError('did not created')).toEqual(expectedAction)
//     }),
//     it('should return a success action', () => {
//         const expectedAction = {
//             type: BOARD_SUCCESS, 
//             successMessage: 'Created successfully',
//         }
//         expect(actionCreators.boardSuccess('Created successfully')).toEqual(expectedAction)
//     }),

//     it('should return a create board action', () => {
//         const expectedAction = {
//             type: CREATE_BOARD,
//             title: '',
//             isPrivate: false,
//             lists: [],
//             tags: [],
//             userRole: [],
//         }
//         expect(actionCreators.createBoardRequest('', false, [], [], [])).toEqual(expectedAction)
//     }),
//     it('should return a success create board action', () => {
//         const expectedAction = {
//             type: CREATE_BOARD_SUCCESS,
//             board: {
//                 id: 1,
//                 title: '',
//                 isPrivate: false,
//                 lists: [],
//                 tags: [],
//                 userRole: [],
//             }
//         }
//         const board: IBoard = {
//             id: 1,
//             title: '',
//             isPrivate: false,
//             lists: [],
//             tags: [],
//             userRole: [],
//         }
//         expect(actionCreators.createBoardSuccess(board)).toEqual(expectedAction)
//     }),

//     it('should return a remove board action', () => {
//         const expectedAction = {
//             type: REMOVE_BOARD
//         }
//         expect(actionCreators.removeBoardRequest(1)).toEqual(expectedAction)
//     }),

//     it('should return an update board request action', () => {
//         const boardTest: IBoard = {
//                 id: 1,
//                 title: '',
//                 isPrivate: false,
//                 lists: [],
//                 tags: [],
//                 userRole: [],
//         }
//         const expectedAction = {
//             type: UPDATE_BOARD,
//             board: boardTest
//         }
//         expect(actionCreators.updateBoardRequest(boardTest)).toEqual(expectedAction)
//     })
// })

// const mockStore = configureMockStore([thunk])

// describe('Board async actions', () => {
//     afterEach(() => {
//         nock.cleanAll()
//     })

//     it('should create CREATE_BOARD_SUCCESS when success create response is received', () => {
//         nock(getBaseUrl())
//             .post('/boards')
//             .reply(200, {   board: {
//                                 id: 1,
//                                 title: '',
//                                 isPrivate: false,
//                                 lists: [],
//                                 tags: [],
//                                 userRole: [],
//                             } 
//                         })

//         const expectedActions = [
//             {   type: CREATE_BOARD,
//                 title: '',
//                 isPrivate: false,
//                 lists: [],
//                 tags: [],
//                 userRole: [], 
//             },
//             { 
//                 type: CREATE_BOARD_SUCCESS,
//                 board: {
//                     id: 1,
//                     title: '',
//                     isPrivate: false,
//                     lists: [],
//                     tags: [],
//                     userRole: [],
//                 }
//             }
//         ]
//         const store = mockStore({ boards: {} })

//         return store.dispatch(actionCreators.createBackendBoard({
//                 id: 1,
//                 title: '',
//                 isPrivate: false,
//                 lists: [],
//                 tags: [],
//                 userRole: [],
//             })).then(() => {
//             expect(store.getActions()).toEqual(expectedActions)
//         })
//     })

//     it('should return a BOARD_SUCCESS when the remove is done', () => {
//         nock(getBaseUrl())
//             .delete('/boards')
//             .reply(200, { message: 'successfully deleted' })

//         const expectedActions = [
//             { type: REMOVE_BOARD },
//             { type: BOARD_SUCCESS, successMessage: 'successfully deleted' }
//         ]
//         const store = mockStore({ boards: [{
//             id: 1,
//             title: '',
//             isPrivate: false,
//             lists: [],
//             tags: [],
//             userRole: []
//         }]})

//         return store.dispatch(actionCreators.removeBackendBoard(1)).then(() => {
//             expect(store.getActions()).toEqual(expectedActions)
//         })
//     }),

//     it('should return a new board when the update is done', () => {
//         nock(getBaseUrl())
//         .put('/boards/1')
//         .reply(200, {board: {
//             id: 1,
//             title: 'test',
//             isPrivate: false,
//             lists: [],
//             tags: [],
//             userRole: [], 
//         }})

//         const boardTest: IBoard = {
//             id: 1, 
//             title: 'test', 
//             isPrivate: false, 
//             lists: [], 
//             tags: [],
//             userRole: []
//         }
        
//         const expectedActions = [
//             { type: UPDATE_BOARD, board: boardTest},
//             {
//                 type: CREATE_BOARD_SUCCESS,
//                 board: {
//                     id: 1,
//                     title: 'test',
//                     isPrivate: false,
//                     lists: [],
//                     tags: [],
//                     userRole: [], 
//                 }
//             }
//         ]
//         const store = mockStore({ boards: [
//             {
//                 id: 1,
//                 title: '',
//                 isPrivate: false,
//                 lists: [],
//                 tags: [],
//                 userRole: []
//             }]})

//         return store.dispatch(actionCreators.updateBackendBoard({
//             id: 1, 
//             title: 'test', 
//             isPrivate: false, 
//             lists: [], 
//             tags: [],
//             userRole: []
//         })).then(() => {
//                 expect(store.getActions()).toEqual(expectedActions)
//             })
//     })
// })
