/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { storage, db } from '../config/config';
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearError, setError } from '../redux/features/admin/adminSlice';
import { fetchProducts } from '../redux/features/product/productService';
import { editProduct, deleteProduct } from '../redux/features/admin/adminService';
import EditProductsComponent from '../components/EditProductsComponent';

const EditProducts = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.authReducer.error);

    // const [products, setProducts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMsg, setSuccessMsg] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);
    const [editButtonActive, setEditButton] = useState<boolean>(false);
    const [pid, setPid] = useState<string>('');

    const getProducts = async () => {
        const produkts = useAppSelector((state) => state.productReducer.products);
        return produkts;
    };
    //     setLoading(true);
    //     // dispatch clearError from adminSlice
    //     dispatch(clearError());
    //     // fetch products using productSlice redux and service
    //     try {
    //         const productsArray = await dispatch(fetchProducts());
    //         setProducts(productsArray);
    //     } catch (error: any) {
    //         console.debug(error);
    //     }


    // try {
    //     const products = await getDocs(collection(db, 'Products'));
    //     const productsArray = products.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data()
    //     }));
    //     setProducts(productsArray);
    //     setLoading(false);
    // } catch (error: any) {
    //     // setError(error.message);
    //     setLoading(false);
    // }
    // };
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    // use selector to get products from redux store
    const products = useAppSelector((state) => state.productReducer.products);

    // console.debug('products', products);

    // useEffect(() => {
    //     getProducts();
    // }, []);

    const deletePrd = async (id: any, url: any) => {
        // setLoading(true);
        dispatch(clearError());

        try {
            // dispatch deleteProduct from productSlice redux and service
            await dispatch(deleteProduct({ id, url }));
            // await deleteDoc(doc(db, 'Products', id));
            // await deleteObject(ref(storage, url));
            // // timeout for success message
            // setSuccessMsg('Product deleted successfully');
            // setTimeout(() => {
            //     setSuccessMsg('');
            // }, 2000);
            // setLoading(false);
            // getProducts();
            dispatch(fetchProducts());

        } catch (error: any) {
            // setError(error.message);
            dispatch(clearError());
            // refresh this page
            // setTimeout(() => {
            //     window.location.reload();
            // }, 3000);
            // setLoading(false);
        }
    };

    // edit product data information in firebase firestore and firebase storage database when edit button is clicked and product data is changed
    const editPrd = async (id: any, title: any, description: any, price: any) => {
        // setLoading(true);
        dispatch(clearError());
        // setError('');

        // console.debug('editPrd', id, title, description, price);

        try {
            // dispatch editProduct from productSlice redux and service
            await dispatch(editProduct({ id, title, description, price }));

            // await updateDoc(doc(db, 'Products', id), {
            //     title,
            //     price,
            //     description,
            //     url
            // });
            // await updateObject(ref(storage, url), {
            //     name,
            //     price,
            //     description,
            //     category,
            //     quantity
            // }); // updateObject is used to update the image in firebase storage database
            // setSuccessMsg('Product Edited successfully');
            // setTimeout(() => {
            //     setSuccessMsg('');
            // }, 2000);
            // setLoading(false);
            dispatch(fetchProducts());

        } catch (error: any) {
            // setError(error.message);
            // console.debug(error);
            dispatch(setError(error.message));
            setLoading(false);
        }
    };
    const handleEdit = (pid: any) => {
        // console.debug('handleEdit', pid);
        setPid(pid); // set pid to the product id so that we can update only that row in the table
        setEdit(true);
        setEditButton(true);
    };

    return <EditProductsComponent products={products} loading={loading} successMsg={successMsg} error={error} deleteProduct={deletePrd} editProduct={editPrd} edit={edit} pid={pid} handleEdit={handleEdit} editButtonActive={editButtonActive} setEdit={setEdit} setEditButton={setEditButton} setPid={setPid} />;
};

export default EditProducts;
