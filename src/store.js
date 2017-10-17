import { createStore } from 'redux';

function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

const reducer = (state, action) => {
  if (action.type === "CREATE_CHRONOMETER"){
    return {
      ...state,
      chronometers: state.chronometers.concat({ id: state.chronometers.length,
        title: action.title,
        description:action.description,
        running: false,
        ms: 0,
        minutes: 0,
        seconds: 0,
        hours: 0,
        editChronometer: false }),
      newChronometer: false
    }
  }
  else if (action.type === "EDIT_CHRONOMETER") {
    let chronometers = state.chronometers
    let index = getIndex(true, chronometers, 'editChronometer')
    chronometers[index]['title'] = action.title
    chronometers[index]['description'] = action.description
    chronometers[index]['editChronometer'] = false
    return {
      ...state,
      chronometers: chronometers
    }
  }
  else if (action.type === "NEW_CHRONOMETER_FORM") {
    return {
      ...state,
      newChronometer: true
    }
  }
  else if (action.type === "CANCEL_NEW_CHRONOMETER") {
    return {
      ...state,
      newChronometer: false
    }
  }
  else if (action.type === "EDIT_CHRONOMETER_FORM") {
    let chronometers = state.chronometers
    let index = getIndex(action.id, chronometers, 'id')
    chronometers[index]['editChronometer'] = true
    chronometers[index]['ms'] = action.ms
    chronometers[index]['seconds'] = action.seconds
    chronometers[index]['minutes'] = action.minutes
    chronometers[index]['hours'] = action.hours
    return {
      ...state,
      chronometers: chronometers
    }
  }
  else if (action.type === "DELETE_CHRONOMETER") {
    let chronometers = state.chronometers
    let index = getIndex(action.id, chronometers, 'id')
    chronometers.splice(index, 1)
    return {
      ...state,
      chronometers: chronometers
    }
  }else if (action.type === "CANCEL_EDIT_CHRONOMETER") {
    let chronometers = state.chronometers
    let index = getIndex(true, chronometers, 'editChronometer')
    chronometers[index]['editChronometer'] = false
    return {
      ...state,
      chronometers: chronometers
    }
  }
  return state;
};

export default createStore(reducer, { chronometers: [], newChronometer: false });
