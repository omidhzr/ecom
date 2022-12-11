/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addProduct } from '../redux/features/admin/adminService';
import AddProductsComponent from '../components/AddProductsComponent';


const AddProducts = () => {
    // const [title, setTitle] = useState<string>('');
    // const [description, setDescription] = useState<string>('');
    // const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null);
    // const [imageError, setImageError] = useState<string>('');
    // const [successMsg, setSuccessMsg] = useState<string>('');
    // const [uploadError, setUploadError] = useState<string>('');
    // const [uploading, setUploading] = useState<boolean>(false);
    // const [progress, setProgress] = useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [error, setError] = useState<string>('');

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const handleProductImg = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile);
                // setImageError('');
            } else {
                setImage(null);
                // setImageError('please select a valid image file type (png or jpg)');
            }
        } else {
            // setImageError('please select your file');
        }
    };

    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.adminReducer.error);
    // eslint-disable-next-line no-var
    var progres = useAppSelector((state) => state.adminReducer.progress);

    const handleAddProduct = async (product: { title: string; description: string; price: number; }) => {
        // make a copy of the product object with types that match the database
        const productToUpload = {
            title: product.title,
            description: product.description,
            price: product.price,
            image: image
        };

        // console.debug(productToUpload);
        await dispatch(addProduct(productToUpload))
            .then(() => {
                // setSuccessMsg('Product added successfully');
            })
            .catch((error) => {
                console.error(error);
                // setUploadError(error.message);
            });

    };


    return <AddProductsComponent error={error} handleAddProduct={handleAddProduct} handleProductImg={handleProductImg} progress={progres} />;

};





export default AddProducts;
