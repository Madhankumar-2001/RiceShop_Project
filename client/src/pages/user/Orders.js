// import React, { useState, useEffect } from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useAuth } from "../../context/auth";
// import moment from "moment";
// import * as XLSX from "xlsx"; // Import XLSX for Excel export

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const { data } = await axios.get("/api/v1/auth/orders");
//         setOrders(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (auth?.token) {
//       getOrders();
//     }
//   }, [auth?.token]);

//   // Calculate total amount for each order
//   const calculateTotalAmount = (order) => {
//     let total = order.products.reduce((acc, product) => acc + product.price, 0);
//     return total.toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//     });
//   };

//   const exportOrdersToExcel = () => {
//     const formattedOrders = orders.map((o) => ({
//       Status: o.status,
//       Buyer: o.buyer.name,
//       Date: moment(o.createAt).format("YYYY-MM-DD HH:mm:ss"), // Format date as needed
//       Payment: o.payment.success ? "Success" : "Failed",
//       Quantity: o.products.length,
//       "Total Amount": calculateTotalAmount(o),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
//     XLSX.writeFile(workbook, "user_orders.xlsx");
//   };

//   return (
//     <Layout title={"Your Orders"}>
//       <div className="container-fluid p-2 m-2 dashboard">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-center">All Orders</h1>
//             <button onClick={exportOrdersToExcel} className="btn btn-primary mb-3">
//               Download as Excel
//             </button>
//             {orders?.map((o, i) => {
//               return (
//                 <div className="border rounded shadow-sm mb-3" key={o._id}>
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Buyer</th>
//                         <th scope="col">Date</th>
//                         <th scope="col">Payment</th>
//                         <th scope="col">Quantity (in bags)</th>
//                         <th scope="col">Total Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>{i + 1}</td>
//                         <td>{o?.status}</td>
//                         <td>{o?.buyer?.name}</td>
//                         <td>{moment(o?.createAt).fromNow()}</td>
//                         <td>{o?.payment?.success ? "Success" : "Failed"}</td>
//                         <td>{o?.products?.length}</td>
//                         <td>{calculateTotalAmount(o)}</td> {/* Display total amount */}
//                       </tr>
//                     </tbody>
//                   </table>
//                   <div className="container">
//                     {o?.products?.map((p, j) => (
//                       <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                         <div className="col-md-4">
//                           <img
//                             src={`/api/v1/product/product-photo/${p._id}`}
//                             alt={p.name}
//                             width="300px"
//                             height={"200px"}
//                           />
//                         </div>
//                         <div className="col-md-8">
//                           <p>{p.name}</p>
//                           <p>{p.description.substring(0, 30)}</p>
//                           <p>Price : {p.price}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Orders;



import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import jsPDF from "jspdf"; // Import jsPDF for PDF export
import "jspdf-autotable"; // Import jsPDF autotable plugin for table generation in PDF

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/orders");
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  // Calculate total amount for each order
  const calculateTotalAmount = (order) => {
    let total = order.products.reduce((acc, product) => acc + product.price, 0);
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const exportOrdersToExcel = () => {
    const formattedOrders = orders.map((o) => ({
      Status: o.status,
      "Product Name": o?.products?.[0]?.name || "", // Display first product name next to status
      Buyer: o.buyer.name,
      Date: moment(o.createdAt).format("YYYY-MM-DD"), // Format date as "YYYY-MM-DD"
      Payment: o.payment.success ? "Success" : "Failed",
      Quantity: o.products.length,
      "Total Amount": calculateTotalAmount(o),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "user_orders.xlsx");
  };

  const exportOrdersToPDF = () => {
    const doc = new jsPDF();
    doc.text("Your Orders", 10, 10);
    doc.autoTable({
      head: [["#", "Status", "Product Name", "Buyer", "Date", "Payment", "Quantity", "Total Amount"]],
      body: orders.map((o, i) => [
        i + 1,
        o.status,
        o?.products?.[0]?.name || "", // Display first product name next to status
        o?.buyer?.name || "",
        moment(o.createdAt).format("YYYY-MM-DD"),
        o.payment?.success ? "Success" : "Failed",
        o.products?.length || 0,
        calculateTotalAmount(o),
      ]),
    });
    doc.save("user_orders.pdf");
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-2 m-2 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <div className="d-flex justify-content-start mb-3"> {/* Change justify-content to start */}
              <button onClick={exportOrdersToExcel} className="btn btn-primary mr-2">
                Download as Excel
              </button>
              <button onClick={exportOrdersToPDF} className="btn btn-primary">
                Download as PDF
              </button>
            </div>
            {orders?.map((o, i) => {
              return (
                <div className="border rounded shadow-sm mb-3" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity (in bags)</th>
                        <th scope="col">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.products?.[0]?.name || ""}</td> {/* Display first product name */}
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).format("YYYY-MM-DD")}</td> {/* Format date as "YYYY-MM-DD" */}
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        <td>{calculateTotalAmount(o)}</td> {/* Display total amount */}
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, j) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            width="300px"
                            height={"200px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
