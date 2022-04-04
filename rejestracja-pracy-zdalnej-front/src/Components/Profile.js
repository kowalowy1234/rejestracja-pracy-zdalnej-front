

const Profile = (props) => {
  return (
    <div className="profile">
      <p><i className="pi pi-user" style={{fontSize: '2rem'}}></i>{props.type}</p>
      <p>Firma: {props.companyName}</p>
    </div>
  )
}

export default Profile