

const ErrorMessage = ( {errorMes} ) => {
  if(errorMes === null){
    return null;
  }

  return (
    <div className="errorStyle">
      {errorMes}
    </div>
  )
}

export default ErrorMessage;