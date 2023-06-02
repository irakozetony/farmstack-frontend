import React, {useEffect, useState} from 'react'
import Layout from "../components/Layout";
import {useNavigate, useParams} from "react-router-dom";
import FormInput from "../components/FormInput";

// const appUrl = "http://localhost:8000/"
const appUrl = "https://farmstack-backend.onrender.com/"

const Car = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [price, setPrice] = useState(null)
    const [error, setError] = useState([])
    const [isPending, setIsPending] = useState(false)
    const onChange = e=>{
        setPrice(e.target.value)
    }
    const getCar = async ()=>{
        const res = await fetch(`${appUrl}cars/`+id)

        if(!res.ok){
            setError("Error fetching car")
        }
        else{
            const data = await res.json()
            setCar(data)
            setPrice(data.price)
        }
        setIsPending(false)
    }

    const handleDelete = async ()=>{
        const response = await fetch(`${appUrl}cars/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            const data = await response.json()
            let errArray = data.detail.map(el=>{
                return `${el.loc[1]} - ${el.msg}`
            })
            setError(errArray)
        }
        else{
            setError([])
            navigate("/cars")
        }
    }

    const updatePrice =async()=>{
        const response = await fetch(`${appUrl}cars/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({price})
        })

        const data = await response.json()
        if(!response.ok){
            let errArray = data.detail.map(el=>{
                return `${el.loc[1]} - ${el.msg}`
            })
            setError(errArray)
        }
        else{
            setError([])
            getCar()
        }
    }

    useEffect(()=>{
        getCar(id)
    }, [id])
    return (
        <Layout>
            {isPending &&
                <div className="bg-red-500 w-full text-white text-lg">
                    <h2>Loading car...</h2>
                </div>
            }
            {error &&
                <ul className="flex flex-col mx-auto text-center">
                    {
                        error && error.map(
                            (el, index)=>(
                                <li key={index} className="my-2 p-1 border-2 border-red-700 max-w-md mx-auto">{el}</li>
                            )
                        )
                    }
                </ul>
            }
            {car &&
                <div className="flex flex-col justify-between items-center min-h-full">
                    <div className="font-bold text-xl text-gray-60 my-3">
                        {car.brand} {car.make}
                    </div>
                    <div className="max-w-xl">
                        <img src="https://via.placeholder.com/960x550.png?text=IMAGINE+A+CAR" alt="A car"/>
                    </div>
                    <div className="flex flex-col items-center font-normal text-lg">
                        <div>
                            Price: <span className="font-semibold text-orange-600 text-cl">{car.price}</span>
                        </div>
                        <div>Year: {car.year}</div>
                        <div>Km: {car.km}</div>
                    </div>

                    <div className="flex flex-row">
                        <FormInput
                            label="Change price"
                            placeholder={price}
                            type="number"
                            value={price}
                            onChange={onChange}
                            required
                        />

                        <button
                            onClick={updatePrice}
                            className="bg-yellow-500 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80"
                        >
                            Edit price
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-red-700 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80"
                        >Delete car</button>
                    </div>
                    <p>Warning: deleting is permanent</p>
                </div>

            }
        </Layout>
    )
}
export default Car
