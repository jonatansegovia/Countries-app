import React from 'react';
import { Link } from 'react-router-dom';

import s from './PopUp.module.css';

export default function PopUp(props) {
  return props.trigger ? (
    <div className={s.popup}>
      <div className={s['popup-inner']}>
        <div className={s['popup-inner_items']}>
          {props.children}
          <Link to="/countries">HOME</Link>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}
