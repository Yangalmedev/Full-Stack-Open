
const Notification = ({notif}) => {
  if (notif === null){
    return null;
  }

  const notifStyle = {
    color: 'green',
    border: '3px solid green',
    padding: '10px ',
    background: 'lightgrey',
    borderRadius: '5px',
    fontSize: '20px'
  }


  return(
    <div>
      <p style={notifStyle}> {notif} </p>
    </div>
  )
}

export default Notification;