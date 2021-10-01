// import React from 'react';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getActivities, filterByActivity } from '../../actions';

// export default function FilterForActivities() {
//   const dispatch = useDispatch();
//   const allActivities = useSelector((state) => state.activities);

//   useEffect(() => {
//     dispatch(getActivities());
//   }, [dispatch]);

//   const handleFilterByActivity = (act) => {
//     dispatch(filterByActivity(act));
//   };

//   return (
//     <select
//       name="activity"
//       id="forActivities"
//       onChange={(e) => handleFilterByActivity(e.target.value)}
//     >
//       {allActivities.length > 0 &&
//         allActivities.map((act) => (
//           <option key={act.id} value={act.name}>
//             {act.name}
//           </option>
//         ))}
//     </select>
//   );
// }
