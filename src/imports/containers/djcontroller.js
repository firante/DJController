import { connect } from 'react-redux';
import { add_sounds, play_sound, set_volume, set_play_state } from '../redux/actions';
import DJController from '../components/djcontroller';

const mapStateToProps = state => ({ sounds: state.sounds, playSound: state.play_sound, volume: state.volume, played: state.played });
const mapUploadNewSounds = (dispatch, ownProps) => ({
  setPlaySound: (section, fileName, fileIndex, file) => {
    dispatch(play_sound(section, fileName, fileIndex,  file));
  },
  setVolume: (volume) => {
    dispatch(set_volume(volume));
  },
  setPlayState: (played) => {
    dispatch(set_play_state(played));
  }
  
}); 

const DJControl = connect(mapStateToProps, mapUploadNewSounds)(DJController);


export default DJControl;
