import React from 'react'

const InputLabelComponent = ({label, id, type = "text"}) => {
  return (
    <div className="form-group">
      <label htmlFor="name" className='text-white'>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        // placeholder="John Doe"
        required=""
      />
    </div>
  )
}

export default InputLabelComponent
