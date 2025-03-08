import React from 'react'

const FormButtonComponent = ({type, classes, onClickCallback, isDisabled, displayText = "Button"}) => {
  return (
    <>
      <button type={type} className={classes} onClick={onClickCallback} disabled={isDisabled} >
        {displayText}
        </button>
    </>
  )
}

export default FormButtonComponent
