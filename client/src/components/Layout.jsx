import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

function Layout({ children, title, description, keywords, author }) {
  //we can use {children} or props
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

//SEO parpuse
Layout.defaultProps = {
  title: "RAF-Store shop now",
  description: "This is my Mern stack ecommerce app",
  Keywords: "react, node js ,express js, Mongodb",
  author: "Rafiul Alam Bhuiyan",
};
