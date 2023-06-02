import React, {useEffect, useState} from 'react'
import Layout from "../components/Layout";
import Card from "../components/Card";

// const appUrl = "http://localhost:8000/"
const appUrl = "https://farmstack-backend.onrender.com/"
const Cars = () => {
    const [cars, setCars] = useState([]);
    const [brand, setBrand] = useState('');
    const [isPending, setIsPending] = useState(true);
    useEffect(()=>{
        fetch(`${appUrl}cars?brand=${brand}`)
            .then(response => response.json())
            .then(json => setCars(json))
        setIsPending(false)
    }, [brand])

    const handleChangeBrand = e=>{
        setCars([])
        setBrand(e.target.value)
        setIsPending(true)
    }
    return (
        <Layout>
            <h2>Cars - {brand?brand: "All brands"}</h2>
            <div>
                <label htmlFor="cars">
                    Choose a brand:
                </label>
                <select name="cars" id="cars" onChange={handleChangeBrand}>
                    <option value="">All cars</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Citroen">Citroen</option>
                    <option value="Renault">Renault</option>
                    <option value="Opel">Opel</option>
                </select>
            </div>
            <div>
                {isPending && <div>
                    <h2>Loading cars, brand: {brand}...</h2>
                </div>}
                <div>
                    { cars && cars.map(
                        el =>{
                            return (
                                <Card key={el._id} car={el} />
                            )
                        }
                    )}
                </div>
            </div>
        </Layout>
    )
}
export default Cars
