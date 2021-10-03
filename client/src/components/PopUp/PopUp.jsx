import React from 'react';
import { Link } from 'react-router-dom';

import './PopUp.css';

export default function PopUp(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <Link to="/countries">HOME</Link>
      </div>
    </div>
  ) : (
    ''
  );
}
