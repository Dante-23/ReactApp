import React from 'react'

const InputLabelComponent = ({label, id, type = "text", value, onChangeHandler}) => {
  return (
    <div className="form-group">
      <label htmlFor="name" className='text-white'>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        // placeholder="John Doe"
        required=""
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  )
}

export default InputLabelComponent
