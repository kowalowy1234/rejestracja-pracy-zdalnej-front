import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../endpoints';
import ChartComponent from './ChartComponent';


const Stats = (props) => {

  const [users, setUsers] = useState([])

  const [allUsers, setAllUsers] = useState([])

  // pobieranie przefiltrowanej listy pracowników tylko z danej firmy
  useEffect(() => {

    axios.get(endpoints.usersAndRegister, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    }).then(response => {

      console.log(response.data);

      const employees = response.data;
      
      let employeesFiltered = employees.filter(user => {
        return (Number(user.firma) === Number(props.companyId)) && (user.is_superuser === false);
      });

      console.log(employeesFiltered); 

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

  return (
    <div className="screen-container">
      <div className='stats-header'>
        <h3>Wybierz pracowników</h3>
        <MultiSelect 
          selectedItemsLabel={`Wybrano ${users.length} pracowników`} 
          maxSelectedLabels={1} filter={true} 
          placeholder="Pracownicy" 
          value={users} 
          options={allUsers} 
          onChange={(e) => setUsers(e.value)}   
        />
      </div>
      <ChartComponent />
    </div>
  )
}

export default Stats