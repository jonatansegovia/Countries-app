import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivities, filterByActivity, getCountries } from '../../actions';

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
    <div>
      <label htmlFor="forActivities">Search Activities: </label>
      <select
        name="activity"
        id="forActivities"
        onChange={(e) => handleFilterByActivity(e.target.value)}
      >
        <option disabled>---</option>
        {allActivities.length > 0 &&
          allActivities.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
      </select>
      <button onClick={handleRestart}>RESTART</button>
    </div>
  );
}
