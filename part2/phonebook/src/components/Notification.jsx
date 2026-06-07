
const Notification = ({ notif }) => {
  if (notif === null) {
    return null
  }

  return (
    <div className="notif">
      {notif}
    </div>
  )
}

export default Notification