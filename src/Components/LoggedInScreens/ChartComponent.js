import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

const ChartComponent = ({stats}) => {

  const [basicData, setBasicData] = useState({
    labels: stats[0][0],
    datasets: [
      {
        label: 'Przepracowane minuty',
        backgroundColor: '#FFA726',
        data: stats[1][0],
      }
    ]
  });

  useEffect(() => {
    setBasicData({
      labels: stats[0][0],
      datasets: [
        {
          label: 'Przepracowane minuty',
          backgroundColor: '#FFA726',
          data: stats[1][0],
        }
      ]
    })
  }, [stats]);


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