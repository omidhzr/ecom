/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import AddProducts from '../components/AddProducts';
import EditProducts from '../components/EditProducts';


const Admin = ({}) => {
  // set state of products with type
  const [products, setProducts] = useState < any > ([]);
  const [successMsg, setSuccessMsg] = useState < string > ('');
  const [error, setError] = useState < string > ('');
  const [addProductsButtonClicked, setAddProducts] = useState < boolean > (false);
  const [editProductsButtonClicked, setEditProducts] = useState < boolean > (false);

  return (
    <div className="container-fluid">
      <div className="row">
        <br></br>
        <br></br>
        <h1>Admin Page</h1>
        <hr />
        <Button
          variant="warning"
          onClick={() => setEditProducts(!editProductsButtonClicked)}
        >
            Edit Products
        </Button>
        <br></br>
        <Button
          variant="primary"
          onClick={() => setAddProducts(!addProductsButtonClicked)}
        >
            Add Products
        </Button>
        <br />


        <div className="col-md-12">

          {successMsg && <div className="success-msg">{successMsg}</div>}
          {error ? <p>{error}</p> : null}

          {/* button to toggle Add products when clicked */}

          {addProductsButtonClicked
            ? (
              <AddProducts/>
            )
            : null}

          <br></br>

          {editProductsButtonClicked && (
            <EditProducts/>
          )}
        </div>

      </div>

    </div> // end of container
  );
};

export default Admin;