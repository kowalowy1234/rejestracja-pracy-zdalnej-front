import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../endpoints';
import ChartComponent from './ChartComponent';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';


const Stats = (props) => {

  const [users, setUsers] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  const [filter, setFilter] = useState('day');

  // pobieranie przefiltrowanej listy pracowników tylko z danej firmy
  useEffect(() => {

    axios.get(endpoints.usersAndRegister, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    }).then(response => {

      const employees = response.data;
      
      let employeesFiltered = employees.filter(user => {
        return (Number(user.firma) === Number(props.companyId)) && (user.is_superuser === false);
      });

      let employeesMapped = employeesFiltered.map(user => (
        {
          label: `${user.first_name} ${user.last_name} | ${user.email}`,
          value: user.id,
        }
      ))
      setAllUsers(employeesMapped);

    }).catch(error => {
      console.log(error);
    })

  }, [])

  const filterOptions = [
    {label: 'Dzień', value: 'day'},
    {label: 'Tydzień', value: 'week'},
    {label: 'Miesiąc', value: 'month'},
    {label: 'Rok', value: 'year'},
  ];

  return (
    <div className="screen-container">
      <div className='stats-header'>
        <h4>Wybierz pracowników</h4>
        <MultiSelect 
          selectedItemsLabel={`Wybrano ${users.length} pracowników`} 
          maxSelectedLabels={1} filter={true} 
          placeholder="Pracownicy" 
          value={users} 
          options={allUsers} 
          onChange={(e) => setUsers(e.value)}   
        />
      </div>
      <div className='stats-header'>
        <h4>Wybierz zakres sumowania</h4>
        <Dropdown placeholder='Zakres' options={filterOptions} value={filter} onChange={(e) => {setFilter(e.value)}}/>
      </div>
      <Button 
        label='Wyświetl statystyki'
        className="p-button-success stats-button"
        icon='pi pi-chart-bar'
        style={{marginTop: '10px', marginBottom: '10px'}}
        onClick={() => {window.location.reload()}}
      />
      <ChartComponent usersData={users} token={props.token} filter={filter}/>
    </div>
  )
}

export default Stats