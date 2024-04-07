// import React, { useState, useEffect } from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import * as XLSX from "xlsx"; // Import XLSX for Excel export

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   // Get all products with ratings
//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/get-product");
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong");
//     }
//   };

//   // Lifecycle method
//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   // Function to export products as Excel
//   const exportProductsToExcel = () => {
//     const dataForExport = products.map((p) => ({
//       "Product Name": p.name,
//       "Product Description": p.description,
//       Price: p.price,
//       Quantity: p.quantity,
//       Shipping: p.shipping === "1" ? "Yes" : "No",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
//     XLSX.writeFile(workbook, "products.xlsx");
//   };

//   return (
//     <Layout>
//       <div className="row dashboard">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9 ">
//           <h1 className="text-center">All Products List</h1>
//           <button
//             onClick={exportProductsToExcel}
//             className="btn btn-primary mb-3"
//           >
//             Export as Excel
//           </button>
//           <div className="d-flex flex-wrap">
//             {products?.map((p) => (
//               <Link
//                 key={p._id}
//                 to={`/dashboard/admin/product/${p.slug}`}
//                 className="product-link"
//               >
//                 <div className="card m-2" style={{ width: "18rem" }}>
//                   <img
//                     src={`/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{p.name}</h5>
//                     <p className="card-text">{p.description}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Products;




import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import { jsPDF } from "jspdf"; // Import jsPDF for PDF export

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products with ratings
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Function to export products as Excel
  // Function to export products as Excel
const exportProductsToExcel = () => {
  const dataForExport = products.map((p) => ({
    "Product Name": p.name,
    "Product Description": p.description,
    Price: p.price,
    Quantity: p.quantity,
    Shipping: p.shipping === "1" ? "Yes" : "No", // Correctly display "Yes" or "No"
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  XLSX.writeFile(workbook, "products.xlsx");
};

// Function to export products as PDF
const exportProductsToPDF = () => {
  const doc = new jsPDF();

  doc.text("All Products List", 10, 10);
  const dataForExport = products.map((p, index) => [
    index + 1,
    p.name,
    p.description,
    p.price,
    p.quantity,
    p.shipping === "1" ? "Yes" : "No", // Correctly display "Yes" or "No"
  ]);

  doc.autoTable({
    head: [
      ["#", "Product Name", "Product Description", "Price", "Quantity", "Shipping"],
    ],
    body: dataForExport,
  });

  doc.save("products.pdf");
};


  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex justify-content-center">
            <button
              onClick={exportProductsToExcel}
              className="btn btn-primary mr-3"
            >
              Export as Excel
            </button>
            <button
              onClick={exportProductsToPDF}
              className="btn btn-primary"
            >
              Download as PDF
            </button>
          </div>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
