import React, { Component } from 'react';

export default class PlaySection extends Component {
  constructor() {
    super();
    this.clickPlayStop = this.clickPlayStop.bind(this);
    this.ontimeupdate = this.ontimeupdate.bind(this);
    this.playstart = this.playstart.bind(this);
    this.onplayend = this.onplayend.bind(this);
    this.progressClick = this.progressClick.bind(this);
    this.soundClick = this.soundClick.bind(this);
    this.getPlayedIndex = this.getPlayedIndex.bind(this);
    this.getSounds = this.getSounds.bind(this);
    this.prevSound = this.prevSound.bind(this);
    this.nextSound = this.nextSound.bind(this);
    this.incSoundSpeed = this.incSoundSpeed.bind(this);
    this.decSoundSpeed = this.decSoundSpeed.bind(this);
    this.toBegin = this.toBegin.bind(this);

  }

  componentDidMount() {
    this.audio.addEventListener('playing', this.playstart);
    this.getCurrentPlay().file ? this.bPlay.dataset.playstate = 'true' : this.bPlay.dataset.playstate = 'false';
    this.getCurrentPlay().file ? this.bPlay.textContent = 'stop' : this.bPlay.textContent = 'play';
  }

  componentDidUpdate(prevProps) {
    const newVolume =  Math.sqrt(this.pSound.value * this.props.volume);
    this.audio.volume = newVolume;
    if (prevProps.played === this.props.played) return;
    const played = this.props.played;
    played && this.getCurrentPlay().file ? this.bPlay.dataset.playstate = 'true' : this.bPlay.dataset.playstate = 'false';
    played && this.getCurrentPlay().file? this.bPlay.textContent = 'stop' : this.bPlay.textContent = 'play';
    played && this.getCurrentPlay().file? this.audio.play() : this.audio.pause();
    
  }

  cutSoundName(val) {
    return val.name.substring(0, val.name.lastIndexOf('.'));
  }

  playstart() {
    this.audio.addEventListener('timeupdate', this.ontimeupdate);
    this.audio.addEventListener('ended', this.onplayend);
    this.bPlay.dataset.playstate = 'true';
    this.bPlay.textContent = 'stop';
    this.pSound.value = this.pSound.value || this.props.volume;
    this.audio.volume = this.props.volume * this.pSound.value;
    this.props.setPlayState(true);
    
  }
  
  ontimeupdate() {
    this.progress.value = this.audio.currentTime / this.audio.duration;
  }

  getPlayedIndex() {
    return this.props.playSound.filter(val => val.section === this.props.section)[0].fileIndex;
  }

  getSounds() {
    return this.props.sounds.filter(val => val.section === this.props.section)[0].files;
  }
  
  onplayend() {
    const playedIndex = this.getPlayedIndex();
    const sounds = this.getSounds();
    const nextIndex = playedIndex < sounds.length - 1 ? playedIndex + 1 : 0;
    const nextFile = sounds[nextIndex];
    this.setPlay(nextFile, nextIndex);
  }

  getCurrentPlay() {
    return this.props.playSound
      .filter(val => val.section === this.props.section)[0] || {};
  }
  
  progressClick(e) {
    this.progress.value = (e.pageX - e.target.offsetLeft) * e.target.max / e.target.offsetWidth;
    this.audio.currentTime = this.audio.duration * this.progress.value;
  }
  
  soundClick(e) {
    const newVolume = (e.pageX - e.target.offsetLeft) * e.target.max / e.target.offsetWidth;
    this.pSound.value = newVolume;
    this.audio.volume = newVolume * this.props.volume;
  }

  clickPlayStop(e) {
    const playstate = e.target.dataset.playstate === 'false' ? false : true;
    e.target.dataset.playstate = !playstate;
    e.target.textContent = playstate ? 'play' : 'stop';
    playstate ? this.audio.pause() : this.audio.play();
    playstate && this.props.setPlayState(true);
  }

  prevSound() {
    const playedIndex = this.getPlayedIndex();
    const sounds = this.getSounds();
    const prevIndex = playedIndex > 0 ? playedIndex - 1 : sounds.length - 1;
    const prevFile = sounds[prevIndex];
    this.setPlay(prevFile, prevIndex);
  }

  nextSound() {
    const playedIndex = this.getPlayedIndex();
    const sounds = this.getSounds();
    const nextIndex = playedIndex < sounds.length - 1 ? playedIndex + 1 : 0;
    const nextFile = sounds[nextIndex];
    this.setPlay(nextFile, nextIndex);
  }

  toBegin() {
    this.progress.value = 0;
    this.audio.currentTime = 0;
  }  

  incSoundSpeed() {
    this.audio.playbackRate = this.audio.playbackRate + 0.1;
  }
  decSoundSpeed() {
    if (this.audio.playbackRate === 0.1) return;
    this.audio.playbackRate = this.audio.playbackRate - 0.1;
  }
  
  setPlay(val, ind) {
    this.audio.removeEventListener('timeupdate', this.ontimeupdate);
    this.progress.value = 0;
    this.bPlay.alt = '0';
    this.bPlay.textContent = 'play';
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.setPlaySound(this.props.section, val.name, ind, event.target.result);
    };
    reader.readAsDataURL(val);
  }

  renderSounds() {
    const currentSectionFiles = this.props.sounds
	  .filter(val => val.section === this.props.section);
    if(!currentSectionFiles.length) return null;
    return currentSectionFiles[0].files.map((val, ind) => (
      <li
	key={`play_${this.props.section}_${ind}`}
	onClick={(e) => this.setPlay(val, ind)}> {this.cutSoundName(val)} </li>
    ));
  }
  
  render() {
    return (
      <div className="upload_section main-section">
	<div className="subsection">
	  <div className="left full-width">
	    <div className="left full-width ptb10">
	      <progress
		ref={(progress) => { this.progress = progress; }}
		className="left full-width"
		value="0"
		max="1"
		onClick={this.progressClick}
		> </progress>
	    </div>

	    <div className="left full-width">
	      <div className="left three-width mh20">
		
		<button
		  className="left mrl5"
		  data-playstate={false}
		  onClick={this.clickPlayStop}
		  ref={(bPlay) => { this.bPlay = bPlay; }}>play
		</button>
		
		<button
		  className="left mrl5"
		  onClick={this.decSoundSpeed}>Sp -
		</button>
		
		<button
		  className="right mrl5"
		  onClick={this.prevSound}>prev
		</button>
	      </div>

	      
	      <div className="left three-width mh20">
		<progress
		  ref={(pSound) => { this.pSound = pSound; }}
		  className="left full-width soundP"
		  value="0"
		  max="1"
		  onClick={this.soundClick}
		  > </progress>
	      </div>
	      
	      <div className="left three-width mh20">
		
		<button
		  className="left mrl5"
		  onClick={this.nextSound}>next
		</button>
		
		<button
		  className="right mrl5"
		  onClick={this.toBegin}>begin
		</button>

		<button
		  className="right mrl5"
		  onClick={this.incSoundSpeed}>Sp +
		</button>
		
	      </div>
	    </div>
	    
	    <audio
	      ref={(audio) => { this.audio = audio; }}
	      src={this.getCurrentPlay().file}
	      autoPlay>
	    </audio>
	    
	  </div>
	  <div className="left full-width list-of-file">  
	    <ul>
	      {this.renderSounds()}
	    </ul>
	  </div>
	</div>
      </div>
    );
  }
}
