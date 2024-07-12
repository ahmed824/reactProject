import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Utils/baseUrl';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';

export default function Products() {
    const [Products, setProducts] = useState([])
    const getAllProducts = async () => {
        let { data } = await axios.get(`${baseUrl}/products`)
        console.log(data.data);
        setProducts(data.data)
    }
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <div className="container">
                {Products.length != 0 ? <div className="row">
                    <Product Products={Products} />
                </div> : <Loading />}
            </div>
        </>
    )
}
