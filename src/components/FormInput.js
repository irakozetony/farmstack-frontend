import React from 'react'

const FormInput = (props) => {
    const {label, placeholder, type, onChange, name} = props;
    return (
        <div className="formInput my-2 flex flex-row items-center">
            <label className="font-small">{label}</label>
            <input
                className="p-1 mx-1 rounded-md border-gray-300 flex-1"
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
        </div>
    )
}
export default FormInput
