import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../endpoints';
import ChartComponent from './ChartComponent';
import { Dropdown } from 'primereact/dropdown';


const Stats = (props) => {

  const [users, setUsers] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

  const [filter, setFilter] = useState('day');

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterOptions = [
    {label: 'Wczorajszy dzień', value: 'day'},
    {label: 'Ostatni tydzień', value: 'week'},
    {label: 'Ostatni miesiąc', value: 'month'},
    {label: 'Poprzedni rok', value: 'year'},
  ];

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
      <ChartComponent filter={filter} users={users} />
    </div>
  )
}

export default Stats