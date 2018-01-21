import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class UploadSection extends Component {
  constructor() {
    super();
  }

  cutSoundName(val) {
    return val.name.substring(0, val.name.lastIndexOf('.'));
  }

  setPlay(val, ind) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.setPlaySound(this.props.section, val.name, ind, event.target.result);
    };
    reader.readAsDataURL(val);
  }
  
  renderSoundsList() {
    const currentSectionFiles = this.props.sounds
	  .filter(val=>val.section === this.props.section);
    if(!currentSectionFiles.length) return null;
    return currentSectionFiles[0].files.map((val, ind) => (
      <Link to="/dj-controller">
	<li
	  key={`upload_${this.props.section}_${ind}`}
	  onClick={(e) => this.setPlay(val, ind) }> { this.cutSoundName(val) }
	</li>
      </Link>
      )
    );
  }
  
  render() {
    return (
      <div className="upload_section main-section">
	<div className="subsection">
	  <input
	    id={`input${this.props.section}`}
	    className="input-file"
	    multiple
	    type="file"
	    accept="audio/*"
	    onChange={(e) => this.props.addSounds({
	      files: Array.prototype.slice.call(e.target.files),
	      section: this.props.section	      
	    })} />
	    <label htmlFor={`input${this.props.section}`}>Choose a file</label>
	    <div className="list-of-file">
	      <ul>
		{this.renderSoundsList()}
	      </ul>
	    </div>
	</div>
      </div>
    );
  }
}





