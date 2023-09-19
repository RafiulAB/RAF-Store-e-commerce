import React from "react";
import Layout from "../components/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 align-self-center">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 align-self-center">
          <h2>Privacy Notice</h2>
          <p>
            We know that you care how information about you is used and shared,
            and we appreciate your trust that we will do so carefully and
            sensibly. This Privacy Notice describes how Amazon.com and its
            affiliates (collectively "Amazon") collect and process your personal
            information through Amazon websites, devices, products, services,
            online and physical stores, and applications that reference this
            Privacy Notice (together "Amazon Services"). By using Amazon
            Services, you are consenting to the practices described in this
            Privacy Notice.
            <br />
            We receive and store any information you provide in relation to
            Amazon Services. Click here to see examples of what we collect. You
            can choose not to provide certain information, but then you might
            not be able to take advantage of many of our Amazon Services.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
