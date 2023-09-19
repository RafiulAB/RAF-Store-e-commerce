import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "./AdminMenu";

const Users = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2> All users</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
