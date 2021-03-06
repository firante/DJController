export const ADD_SOUNDS = 'ADD_SOUNDS';
export const PLAY_SOUND = 'PALY_SOUND';
export const SET_VOLUME = 'INC_VOLUME';
export const SET_PLAY_STATE = 'SET_PLAY_STATE';


export const add_sounds = sounds => ({ type: ADD_SOUNDS, sounds });
export const set_volume = volume => ({ type: SET_VOLUME, volume });
export const set_play_state = played => ({ type: SET_PLAY_STATE, played });
export const play_sound = (section, fileName, fileIndex, file) => ({ type: PLAY_SOUND, section, fileName, fileIndex, file });
