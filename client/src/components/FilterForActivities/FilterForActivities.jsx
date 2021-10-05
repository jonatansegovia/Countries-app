import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivities, filterByActivity, getCountries } from '../../actions';

import s from '../Home/Home.module.css';

export default function FilterForActivities() {
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const handleFilterByActivity = (act) => {
    dispatch(filterByActivity(act));
  };

  const handleRestart = () => {
    dispatch(getCountries());
  };

  return (
    <div className={s['aside-boxes']}>
      <label htmlFor="forActivities">Activities: </label>
      <select
        name="activity"
        id="forActivities"
        onChange={(e) => handleFilterByActivity(e.target.value)}
      >
        <option selected={true} disabled="disabled">
          ---
        </option>
        {allActivities.length > 0 &&
          allActivities.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
      </select>
      <div>
        <button onClick={handleRestart}>RESTART</button>
      </div>
    </div>
  );
}
