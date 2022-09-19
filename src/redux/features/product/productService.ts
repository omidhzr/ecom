import { db } from '../../../config/config';
import {
  getDocs,
  collection,
} from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const products = await getDocs(collection(db, 'Products'));
        const productsArray: any = [];
        for (const snap of products.docs) {
            const data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            });
        }
        return productsArray;
    }
);


