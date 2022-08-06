// not used yet
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../config/Config";
import { onSnapshot, collection } from "firebase/firestore";

export default function GetNumberOfCartItems() {
  //use state to set totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(collection(db, "Cart " + user.uid), (snapshot) => {
          // console.log(snapshot);
          const qty = snapshot.docs.length;
          // console.log(qty);
          setTotalProducts(qty);
        });
      }
    });
  }, []);
  return totalProducts;
}
