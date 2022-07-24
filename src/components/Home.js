import React,{useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import {auth,db} from '../config/Config'
import { getDocs, collection } from "firebase/firestore"; 
import {onAuthStateChanged} from 'firebase/auth'


export const Home = (props) => {
    // state of products
    const [products, setProducts] = useState([]);

    // getting current user
    function GetCurrentUser(){
        const [user, setUser] = useState(null);
        useEffect(()=>{
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setUser(user?.displayName);
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);
    
    // getting products
    const getProducts = async ()=>{
        const products = await getDocs(collection(db, 'Products'));
        const productsArray = [];
        for (var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    return (
        <>
            <Navbar user={user} />           
            <br />
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products}/>
                    </div>
                </div>
            )}

            {products.length < 1 && (
                <div className='container-fluid'>Please Wait A Moment! ...</div>
            )}
        </>
    )
}