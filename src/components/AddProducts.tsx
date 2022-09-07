import React, { useState } from 'react';
import { storage, db } from '../config/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import ProgressBar from 'react-bootstrap/ProgressBar';

const AddProducts = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  // define state for image with type of file
  const [image, setImage] = useState<File | null>(null);
  // const [image, setImage] = useState<File>(null);
  const [imageError, setImageError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');

  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

  const handleProductImg = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError('');
      } else {
        setImage(null);
        setImageError('please select a valid image file type (png or jpg)');
      }
    } else {
      setImageError('please select your file');
    }
  };

  const handleAddProducts = (e: any) => {
    e.preventDefault();
    // console.log(title, description, price);
    // console.log(image);

    const storageRef = ref(storage, '/product-images/' + image?.name);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const uploadTask = uploadBytesResumable(storageRef, image!);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
        setUploading(true);
        // console.log(prog);
      },
      (error) => setUploadError(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(db, 'Products'), {
            title,
            description,
            price: Number(price),
            url
          })
            .then(() => {
              setUploading(false);
              setSuccessMsg('Product added successfully');
              setTitle('Product ');
              setDescription('Lorem ipsum dolor sit amet');
              setPrice(10);
              // empty html input file element
              const fileInput = document.getElementById('file') as HTMLInputElement;
              fileInput.value = '';

              // document.getElementById("file").innerText = "";
              setImageError('');
              setUploadError('');
              setTimeout(() => {
                setSuccessMsg('');
              }, 3000);
            })
            .catch((error: any) => setUploadError(error.message));
        });
      }
    );
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h3>Add Products</h3>
      <hr></hr>
      {successMsg && <div className="success-msg">{successMsg}</div>}
      <br/>
      {error ? <p>{error}</p> : null}
      <br/>
      <form
        autoComplete="off"
        className="form-group"
        onSubmit={handleAddProducts}
      >
        <label>Product Title</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <br></br>
        <label>Product Description</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <br></br>
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
        ></input>
        <br></br>
        <label>Upload Product Image</label>
        <input
          type="file"
          id="file"
          className="form-control"
          required
          onChange={handleProductImg}
        ></input>

        {imageError && (
          <>
            <br></br>
            <div className="error-msg">{imageError}</div>
          </>
        )}
        <br />
        {uploading && (
          <div>
            <ProgressBar variant="success" now={progress} />
          </div>
        )}
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn btn-success btn-md"
            disabled={uploading}
          >
            SUBMIT
          </button>
        </div>
      </form>
      {uploadError && (
        <>
          <br />
          <div className="error-msg">{uploadError}</div>
        </>
      )}
    </div>
  );
};

export default AddProducts;
