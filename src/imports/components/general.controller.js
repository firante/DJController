import React, { Component } from 'react';

export default class GeneralControlled extends Component {
  constructor() {
    super();
    this.progressClick = this.progressClick.bind(this);
    this.clickPlayStop = this.clickPlayStop.bind(this);
  }

  progressClick(e) {
    const newSound = (e.pageX - e.target.offsetLeft) * e.target.max / e.target.offsetWidth;
    this.genSound.value = newSound;
    this.props.setVolume(newSound);
  }

  clickPlayStop() {
    this.props.setPlayState(!this.props.played);
  }
  
  render() {
    return (
      <div className="left full-width">
	<div className="two-width mauto">
	  <button
	    className="left mrl5 inl-block"
	    alt='0'
	    onClick={this.clickPlayStop}
	    ref={(bPlay) => { this.bPlay = bPlay; }}>{this.props.played ? 'stop' : 'play'}
	  </button>
	  <progress
	    ref={(genSound) => { this.genSound = genSound; }}
	    className="left soundP inl-block w90"
	    value="1"
	    max="1"
	    onClick={this.progressClick}
	    > </progress>
	</div>
      </div>
    );
  }
}
