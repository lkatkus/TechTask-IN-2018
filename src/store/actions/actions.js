import * as actionTypes from '../actionTypes';

export const addPersons = (persons) => {
    return{
        type: actionTypes.ADD_PERSONS,
        persons
    }
};

export const sortPersons = (sortedPersons) => {
    return{
        type: actionTypes.SORT_PERSONS,
        sortedPersons
    }
};

export const addCurrentPerson = (currentPerson) => {
    return{
        type: actionTypes.ADD_CURRENT_PERSON,
        currentPerson
    }
};

export const updateCurrentPerson = (updatedPersons) => {
    return{
      type: actionTypes.UPDATE_CURRENT_PERSON,
      updatedPersons
  }
};

export const addCurrentPersonRelatives = (relatives) => {
    return{
        type: actionTypes.ADD_CURRENT_PERSON_RELATIVES,
        relatives
    }
};

export const sortRelatives = (relatives) => {
  return{
      type: actionTypes.SORT_RELATIVES,
      relatives
  }
};