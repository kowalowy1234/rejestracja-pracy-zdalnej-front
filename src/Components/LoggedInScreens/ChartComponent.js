import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import endpoints from '../../endpoints';

const ChartComponent = ({usersData, token, filter}) => {

  const [nameLabelsState, setNameLabels] = useState(sessionStorage.getItem('nameLabels'));
  const [minutesByUser, setMinutesByUser] = useState(sessionStorage.getItem('minuteLabels'));

  let promises = [];
  let users = []

  for(let i = 0; i < usersData.length ; i++){
    promises.push(
      axios.get(`${endpoints.usersAndRegister}${usersData[i]}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        users.push(response.data);
      })
    )
  }

  var nameLabels = []

  Promise.all(promises).then(() => {
    for(let i = 0; i < users.length; i++){
      nameLabels.push({id: users[i].id, data: users[i].first_name + ' ' + users[i].last_name});
    }
    sessionStorage.setItem('nameLabels', JSON.stringify(nameLabels));
  });


  let promises2 = [];
  let minutes = [];

  for(let i = 0; i < usersData.length ; i++){
    promises2.push(
      axios.get(`${endpoints.workedMinutes}${usersData[i]}/?group_by=${filter}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then(response => {
        minutes.push(response.data[0]);
      }).catch(() => {
        minutes.push({idPracownika: usersData[i], przepracowaneMinuty: 0})
      })
    )
  }

  let minutesLabels = [];

  Promise.all(promises2).then(() => {
    for(let i = 0; i < users.length; i++){
        minutesLabels.push(minutes[i]);
    }
    sessionStorage.setItem('minuteLabels', JSON.stringify(minutesLabels));
  });


  useEffect(() => {
    setNameLabels(sessionStorage.getItem('nameLabels'));
  }, [nameLabelsState])

  let label1 = [];
  let label2 = [];

  const findMinutesIn = (id, minutesArray) => {
    let minutes;
    for(let i = 0; i < minutesArray.length; i++){
      if(id === minutesArray[i].idPracownika){
        minutes = minutesArray[i].przepracowaneMinuty;
        break;
      }
    }
    return minutes;
  }

  if(sessionStorage.getItem('nameLabels') && sessionStorage.getItem('minuteLabels')){
    let usersFromStorage = JSON.parse(sessionStorage.getItem('nameLabels'));
    let minutesFromStorage = JSON.parse(sessionStorage.getItem('minuteLabels'));

    for(let i = 0; i < usersFromStorage.length; i++) {
      label1.push(usersFromStorage[i].data);
      label2.push(findMinutesIn(usersFromStorage[i].id, minutesFromStorage))
    }
  }

  const [basicData] = useState({
      labels: label1,
      datasets: [
          {
              label: 'Przepracowane minuty',
              backgroundColor: '#FFA726',
              data: label2,
          }
      ]
  });

  const getLightTheme = () => {
      
      let horizontalOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

      return {
          horizontalOptions
      }
  }

  const { horizontalOptions } = getLightTheme();

  return (
      <div>
          <div className="card">
              <Chart type="bar" data={basicData} options={horizontalOptions} />
          </div>
      </div>
  )
}

export default ChartComponent;