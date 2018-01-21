import { connect } from 'react-redux';
import { add_sounds, play_sound } from '../redux/actions';
import Upload from '../components/upload';

const mapStateToProps = state => ({ sounds : state.sounds, playSound: state.play_sound });
const mapUploadNewSounds = (dispatch, ownProps) => ({
  addSounds: (sounds) => {
    dispatch(add_sounds(sounds));
  },

  setPlaySound: (section, fileName, fileIndex, file) => {
    dispatch(play_sound(section, fileName, fileIndex, file));
  }
  
}); 

const uploadedSounds = connect(mapStateToProps, mapUploadNewSounds)(Upload);


export default uploadedSounds;
