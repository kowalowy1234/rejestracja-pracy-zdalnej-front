import axios from "axios";
import { useState } from "react";
import endpoints from "../endpoints";

const useGetStatsBy = (token, ids, groupMethod) => {
  
  let minutes = [];

  let promises = [];

  for(let i = 0; i < ids.length ; i++){
    promises.push(
      axios.get(`${endpoints.workedMinutes}${ids[i]}/?group_by=${groupMethod}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        minutes.push(response.data[0]);
      }).catch(() => {
        minutes.push({idPracownika: ids[i], przepracowaneMinuty: 0})
      })
    )
  }

  Promise.all(promises);
  
  return minutes;
}

export default useGetStatsBy;