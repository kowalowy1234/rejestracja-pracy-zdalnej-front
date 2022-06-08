import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import endpoints from '../../endpoints';

const ChartComponent = ({ users, filter }) => {

  const [basicData, setBasicData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Przepracowane minuty',
        backgroundColor: '#FFA726',
        data: [],
      }
    ]
  });

  useEffect(() => {
    axios.get(`${endpoints.workedMinutes}?group_by=${filter}`)
    .then(response => {
      const stats = response.data;
      const nameLabels = stats.map(element => `${element.user.first_name} ${element.user.last_name}`);
      const minuteLabels = stats.map(element => element.przepracowaneMinuty);
      setBasicData({
        labels: nameLabels,
        datasets: [
          {
            label: 'Przepracowane minuty',
            backgroundColor: '#FFA726',
            data: minuteLabels,
          }
        ]
      });
    })
    .catch(
      setBasicData({
        labels: [],
        datasets: [
          {
            label: 'Przepracowane minuty',
            backgroundColor: '#FFA726',
            data: [],
          }
        ]
      }));
  }, [users, filter])


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

  const notify = {
    day: 'Brak statystyk z wczorajszego dnia.',
    week: 'Brak statystyk z poprzedniego tygodnia',
    month: 'Brak statystyk z poprzedniego miesiąca',
    year: 'Brak statystyk z poprzedniego roku',
  }

  let notification = '';

  if(filter === 'day')
    notification = <p>{notify.day}</p>;
  else if (filter === 'week')
    notification = <p>{notify.week}</p>;
  else if (filter === 'month')
    notification = <p>{notify.day}</p>;
  else
    notification = <p>{notify.year}</p>

  return (
      <div>
          <div className="card">
              {basicData.labels.length && basicData.datasets[0].data.length ?
              <Chart type="bar" data={basicData} options={horizontalOptions} /> : null}

              {!basicData.labels.length && !basicData.datasets[0].data.length?
              notification: null}
          </div>
      </div>
  )
}

export default ChartComponent;