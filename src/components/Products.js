import React from 'react'
import {Product} from './Product'



export const Products = ({products}) => {

    // console.log(products);
    
    return products.map((produkt)=>(
        <Product key = {produkt.ID} product={produkt}/>
    ))
}