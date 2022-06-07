import axios from "axios";
import { useEffect, useState } from "react";
import endpoints from "../endpoints";

const usePairMinutesToUser = (userIds, filter, token) => {

  const [minutesByUser, setMinutesByUser] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {

    setMinutesByUser([]);
    setUsersData([]);

    let minutePromises = [];
    let userPromises = [];

    if (userIds.length){
    minutePromises = userIds.map(e => 
      axios.get(`${endpoints.workedMinutes}${e}/?group_by=${filter}`,{
        headers: {'Authorization': `Token ${token}`}
      }).then(response => setMinutesByUser(prevResults => [...prevResults, response.data[0]]))
      .catch(() => setMinutesByUser(prevResults => [...prevResults, {idPracownika: e, przepracowaneMinuty: 0}])));

    userPromises = userIds.map(e => 
      axios.get(`${endpoints.usersAndRegister}${e}/`,{
        headers: {'Authorization': `Token ${token}`}
      }).then(response => setUsersData(prevResults => [...prevResults, response.data])));
    }

    Promise.all(userPromises, minutePromises);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIds, filter]);

  const minuteLabels = [];
  const userLabels = [];

  if(minutesByUser.length === usersData.length){
    for(let i = 0; i < minutesByUser.length; i++) {
      for(let j = 0; j < usersData.length; j++) {
        if (minutesByUser[i].idPracownika === usersData[j].id) {
          minuteLabels.push(minutesByUser[i].przepracowaneMinuty);
          userLabels.push(`${usersData[j].first_name} ${usersData[j].last_name}`);
          break;
        }
      }
    }
  }
  
  sessionStorage.setItem('userLabels', JSON.stringify(userLabels));
  sessionStorage.setItem('minuteLabels', JSON.stringify(minuteLabels));
  return [userLabels, minuteLabels];
}

export default usePairMinutesToUser;