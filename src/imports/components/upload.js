import React, { Component } from 'react';
import UploadSection from './uppload.section.js';
import { Link } from 'react-router-dom';

const Upload = (props) => (
  <div className="upload_container">
    <UploadSection
      {...props}
      section="1"
      />
    <UploadSection
      {...props}
      section="2"/>
    <div className="upload_container">
      <Link className="go-to-controller" to="/dj-controller"> Go to controller </Link>
    </div>
  </div>
);

export default Upload;
