import {peopleList} from '../../persons';

import * as actionTypes from '../actionTypes';

const initialState = {
    persons: peopleList,
    currentPerson: {
        data: null,
        relatives: null
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_PERSONS):
            return state;
        case(actionTypes.SORT_PERSONS):
            return{
                ...state,
                persons: action.sortedPersons
            };
        case(actionTypes.ADD_CURRENT_PERSON):
            return{
                ...state,
                currentPerson: {
                    ...state.currentPerson,
                    data: action.currentPerson
                }
            };
        case(actionTypes.UPDATE_CURRENT_PERSON):
            return{
                ...state,
                persons: action.updatedPersons,
                currentPerson: {}
            };            
        case(actionTypes.ADD_CURRENT_PERSON_RELATIVES):
            return{
                ...state,
                currentPerson: {
                    ...state.currentPerson,
                    relatives: action.relatives
                }
            }
        case(actionTypes.SORT_RELATIVES):
            return{
                ...state,
                currentPerson: {
                    ...state.currentPerson,
                    relatives: action.relatives
                }
            }            
        default:
            return state;
    }
}

export default reducer;