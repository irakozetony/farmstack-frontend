import React, {useState} from 'react'
import Layout from "../components/Layout";
import {useNavigate} from "react-router-dom";
import FormInput from "../components/FormInput";

const NewCar = () => {
    const emptyCar = {
        "brand": "",
        "make":"",
        "year": null,
        "cm3": null,
        "price": null,
    }

    const inputs = [
        {
            id: "brand",
            name: "brand",
            type: "text",
            placeholder: "Brand",
            label: "Brand"
        },
        {
            id: "make",
            name: "make",
            type: "text",
            placeholder: "Make",
            label: "Make"
        },
        {
            id: "year",
            name: "year",
            type: "text",
            placeholder: "Year",
            label: "Year"
        },
        {
            id: "price",
            name: "price",
            type: "text",
            placeholder: "Price",
            label: "Price"
        },
        {
            id: "cm3",
            name: "cm3",
            type: "text",
            placeholder: "Cm3",
            label: "Cm3"
        },
        {
            id: "km",
            name: "km",
            type: "text",
            placeholder: "Km",
            label: "Km"
        },
    ]

    const [newCar, setNewCar] = useState(emptyCar);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = e=>{
        e.preventDefault()
        console.log(newCar)
        addCar(newCar)
    }

    const onChange = e=>{
        setNewCar({...newCar, [e.target.name]: e.target.value })
    }

    const handleReset = e =>{
        setNewCar(emptyCar)
    }

    const addCar = async (newCar) =>{
        const response = await fetch("http://localhost:8000/cars/",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newCar)
            })
        const data = await response.json()

        if(!response.ok){
            let errArray = data.detail.map(el =>{
                return `${el.loc[1]} - ${el.msg}`
            })
            setError(errArray)
        }
        else{
            setError([])
            navigate('/cars')
        }
    }
    return (
        <Layout>
            <div>
                <h1>Insert a new car</h1>
            </div>
            <div>New car status: {JSON.stringify(newCar)}</div>
            {error && <ul>
                {error && error.map(
                        (el, index)=>(<li key={index}>{el}</li>)
                    )
                }
            </ul>}
            <div>
                <form onSubmit={handleSubmit}>
                    {inputs.map((input)=>(
                        <FormInput
                            key={input.id}
                            name={input.name}
                            {...input}
                            value={newCar[input.name]}
                            onChange={onChange}
                            required />
                    ))}
                    <button type="submit" onClick={handleSubmit}>Insert</button>
                    <button type="reset" onClick={handleReset}>Reset</button>
                </form>
            </div>
        </Layout>
    )
}
export default NewCar
