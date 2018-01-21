import { combineReducers } from 'redux';
import { ADD_SOUNDS, PLAY_SOUND, SET_VOLUME, SET_PLAY_STATE } from './actions';

function sounds(state = [], action) {
  switch (action.type) {
  case ADD_SOUNDS:
    const currentNumber = state.filter(val=>val.section === action.sounds.section);
    const newState = currentNumber.length ?
	  {
	    files: currentNumber[0].files.concat(action.sounds.files),
	    section: action.sounds.section
	  } :
	  action.sounds;

    return [
      ...state.filter(val=>val.section !== action.sounds.section),
      {
	...newState
      }
    ];
  default:
    return state;
  }
}

function play_sound(state=[], action) {
  switch (action.type) {
  case PLAY_SOUND:
    return [
      ...state.filter(val=>val.section !== action.section),
      {
	section: action.section,
	fileName: action.fileName,
	fileIndex: action.fileIndex,
	file: action.file
      }
    ];
  default:
    return state;
  }
}

function volume(state=1, action) {
  switch (action.type) {
  case SET_VOLUME:
    return action.volume;
  default:
    return state;
  }
}

function played(state=false, action) {
  switch (action.type) {
  case SET_PLAY_STATE:
    return action.played;
  default:
    return state;
  }
}

const djapp = combineReducers({ sounds, play_sound, volume, played });

export default djapp;
