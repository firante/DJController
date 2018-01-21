import React, { Component } from 'react';
import PlaySection from './play.section';
import GeneralControlled from './general.controller';
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router-dom';

const  DJController = (props) => {
  if(props.sounds.length) {
    return (
      <div className="left full-width">
	<GeneralControlled
	  {...props} />
	<div className="left full-width">
	  <PlaySection
	    {...props}
	    section="1" />
	  <PlaySection
	    {...props}
	    section="2" />
	</div>
	<div className="upload_container">
	  <Link className="go-to-controller" to="/upload"> to upload</Link>
	</div>
      </div>
    );
  } else {
    alert('You don\'t have any selected file. /n Please select at lease one media file!');
    return (
      <Redirect to="/upload" />
    );
  }
};

export default DJController;
