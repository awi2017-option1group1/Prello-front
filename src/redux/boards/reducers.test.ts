// import { reducer } from './reducers'
// import { TEST } from '../testActions'
// import { CREATE_BOARD, REMOVE_BOARD } from './actions'

// describe('Board reducer', () => {

//     // ------------------------------------------

//     it('should return the initial state', () => {
//         expect(reducer(undefined, { type: TEST })).toEqual({
//             id: -1,
//             title: '',
//             isPrivate: false,
//             lists: [],
//             tags: [],
//         })
//     })

//     // ------------------------------------------

//     it('should handle CREATE_BOARD', () => {
//         expect(reducer(undefined, {
//             type: CREATE_BOARD,
//             title: 'test',
//             isPrivate: false,
//             lists: [],
//             tags: [],
//             userRole: [],
//         }
//     )).toEqual(
//         {
//             title: 'test',
//             isPrivate: false,
//             lists: [],
//             tags: [],
//             userRole: [],
//         }
//     )
//     })

// // ------------------------------------------

//     it('shoul handle REMOVE_BOARD', () => {
//         expect(reducer(undefined, {
//             type: REMOVE_BOARD
//         })).toEqual(
//             null
//         )
//     })
// })
