import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../endpoints';
import ChartComponent from './ChartComponent';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import usePairMinutesToUser from '../../CustomHooks/usePairMinutesToUser';


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

    })
  }, [])

  const filterOptions = [
    {label: 'Dzień', value: 'day'},
    {label: 'Tydzień', value: 'week'},
    {label: 'Miesiąc', value: 'month'},
    {label: 'Rok', value: 'year'},
  ];

  const stats = usePairMinutesToUser(users, filter, props.token);

  return (
    <div className="screen-container">
      <h2 style={{marginBottom: '20px'}}><i className='pi pi-chart-line' style={{fontSize: '20px', marginRight: '10px'}}></i>Ekran statystyk</h2>
      <hr style={{width: '100%', backgroundColor: 'rgb(233, 233, 233)', border: '1px solid rgb(233, 233, 233)', marginBottom: '20px'}}></hr>
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
      <ChartComponent usersData={users} token={props.token} filter={filter} stats={stats}/>
    </div>
  )
}

export default Stats