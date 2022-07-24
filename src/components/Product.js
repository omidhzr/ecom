import React from 'react'

export const Product = ({product}) => {
    
    const handleAddToCart=()=>{
        console.log(product?.title + ' with price: ' + product?.price +' added to your cart!' );
    }   
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={product.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{product.title}</div>
            <div className='product-text description'>{product.description}</div>
            <div className='product-text price'>$ {product.price}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
        </div> 
    )
}