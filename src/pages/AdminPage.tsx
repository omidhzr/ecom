/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from 'react-bootstrap';
import AddProducts from '../containers/AddProducts';
import EditProducts from '../containers/EditProducts';
import ShowOrders from '../containers/ShowOrders';



const AdminPage = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <br />
          <br />
          <h1 className="text-center">Admin Dashboard</h1>
          <hr />
          <br />

          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">

                <AddProducts />

              </div>

              {/* // add border to the right of the edit products component */}
              <div className="col-md-6 border-start">


                <div className="col-md-6">

                  <ShowOrders />

                </div>
              </div>

            </div>

            <br />
            <hr />

            <EditProducts />

          </div>

        </div>
      </div>
    </div> // end of container
  );
};

export default AdminPage;
