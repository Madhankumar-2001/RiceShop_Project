// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import toast from "react-hot-toast";
// // // // // import AdminMenu from "../../components/Layout/AdminMenu";
// // // // // import Layout from "../../components/Layout/Layout";
// // // // // import { useAuth } from "../../context/auth";
// // // // // import moment from "moment";
// // // // // import { Select } from "antd";
// // // // // import * as XLSX from "xlsx"; // Import XLSX for Excel export
// // // // // import jsPDF from "jspdf"; // Import jsPDF for PDF export
// // // // // import "jspdf-autotable"; // Import jsPDF autotable plugin for table generation in PDF

// // // // // const { Option } = Select;

// // // // // const AdminOrders = () => {
// // // // //   const [status, setStatus] = useState([
// // // // //     "Not Process",
// // // // //     "Processing",
// // // // //     "Shipped",
// // // // //     "delivered",
// // // // //     "cancel",
// // // // //   ]);
// // // // //   const [changeStatus, setChangeStatus] = useState("");
// // // // //   const [orders, setOrders] = useState([]);
// // // // //   const [auth, setAuth] = useAuth();

// // // // //   const getOrders = async () => {
// // // // //     try {
// // // // //       const { data } = await axios.get("/api/v1/auth/all-orders");
// // // // //       setOrders(data);
// // // // //     } catch (error) {
// // // // //       console.log(error);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (auth?.token) getOrders();
// // // // //   }, [auth?.token]);

// // // // //   const handleChange = async (orderId, value) => {
// // // // //     try {
// // // // //       const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
// // // // //         status: value,
// // // // //       });
// // // // //       getOrders();
// // // // //     } catch (error) {
// // // // //       console.log(error);
// // // // //     }
// // // // //   };
// // // // //   const exportOrdersToPDF = () => {
// // // // //     const doc = new jsPDF();
// // // // //   // Add Shop name and Address content
// // // // //   doc.text("Annamar rice mandi", 90, 10);
// // // // //     doc.autoTable({
// // // // //       head: [["#", "Status", "Buyer", "Date", "Payment", "Quantity", "Price"]],
// // // // //       body: orders.map((o, i) => [
// // // // //         i + 1,
// // // // //         o.status,
// // // // //         o?.buyer?.name || "",
// // // // //         moment(o.createdAt).format("YYYY-MM-DD"),
// // // // //         o.payment?.success ? "Success" : "Failed",
// // // // //         o.products?.length || 0,
// // // // //         o.products?.reduce((total, product) => total + product.price, 0) || 0,
// // // // //       ]),
// // // // //     });

// // // // //     doc.save("orders.pdf");
// // // // //   };
// // // // //   // Function to export orders as Excel with selected fields
// // // // //   const exportOrdersToExcel = () => {
// // // // //     const selectedFields = orders.map((order) => ({
// // // // //       Status: order.status,
// // // // //       Buyer: order.buyer?.name || "",
// // // // //       Date: moment(order.createAt).format("YYYY-MM-DD"),
// // // // //       Payment: order.payment.success ? "Success" : "Failed",
// // // // //       Quantity: order.products.length,
// // // // //       Price: order.products.reduce((total, product) => total + product.price, 0),
// // // // //     }));

// // // // //     const worksheet = XLSX.utils.json_to_sheet(selectedFields);
// // // // //     const workbook = XLSX.utils.book_new();
// // // // //     XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
// // // // //     XLSX.writeFile(workbook, "orders.xlsx");
// // // // //   };

// // // // //   return (
// // // // //     <Layout title={"All Orders Data"}>
// // // // //       <div className="row dashboard">
// // // // //         <div className="col-md-3">
// // // // //           <AdminMenu />
// // // // //         </div>
// // // // //         <div className="col-md-9">
// // // // //           <h1 className="text-center">All Orders</h1>
// // // // //           <button
// // // // //             onClick={exportOrdersToExcel}
// // // // //             className="btn btn-primary mb-3"
// // // // //           >
// // // // //             Download as Excel
// // // // //           </button>
          
// // // // //           <button onClick={exportOrdersToPDF} className="btn btn-primary" style={{ marginLeft: "10px", marginTop: "-15px" }}>
// // // // //   Download as PDF
// // // // // </button>

// // // // //           {orders.length === 0 ? (
// // // // //             <p className="text-center">No orders available</p>
// // // // //           ) : (
// // // // //             orders.map((o, i) => {
// // // // //               return (
// // // // //                 <div className="border shadow" key={o._id}>
// // // // //                   <table className="table">
// // // // //                     <thead>
// // // // //                       <tr>
// // // // //                         <th scope="col">#</th>
// // // // //                         <th scope="col">Status</th>
// // // // //                         <th scope="col">Buyer</th>
// // // // //                         <th scope="col">Date</th>
// // // // //                         <th scope="col">Payment</th>
// // // // //                         <th scope="col">Quantity</th>
// // // // //                         <th scope="col">Price</th> {/* Added Price column header */}
// // // // //                       </tr>
// // // // //                     </thead>
// // // // //                     <tbody>
// // // // //                       <tr>
// // // // //                         <td>{i + 1}</td>
// // // // //                         <td>
// // // // //                           <Select
// // // // //                             bordered={false}
// // // // //                             onChange={(value) => handleChange(o._id, value)}
// // // // //                             defaultValue={o?.status}
// // // // //                           >
// // // // //                             {status.map((s, i) => (
// // // // //                               <Option key={i} value={s}>
// // // // //                                 {s}
// // // // //                               </Option>
// // // // //                             ))}
// // // // //                           </Select>
// // // // //                         </td>
// // // // //                         <td>{o?.buyer?.name}</td>
// // // // //                         <td>{moment(o?.createAt).fromNow()}</td>
// // // // //                         <td>{o?.payment.success ? "Success" : "Failed"}</td>
// // // // //                         <td>{o?.products?.length}</td>
// // // // //                         {/* Calculate and display total price */}
// // // // //                         <td>{o?.products.reduce((total, product) => total + product.price, 0)}</td>
// // // // //                       </tr>
// // // // //                     </tbody>
// // // // //                   </table>
// // // // //                   <div className="container">
// // // // //                     {o?.products?.map((p, i) => (
// // // // //                       <div className="row mb-2 p-3 card flex-row" key={p._id}>
// // // // //                         <div className="col-md-4">
// // // // //                           <img
// // // // //                             src={`/api/v1/product/product-photo/${p._id}`}
// // // // //                             className="card-img-top"
// // // // //                             alt={p.name}
// // // // //                             width="100px"
// // // // //                             height={"200px"}
// // // // //                           />
// // // // //                         </div>
// // // // //                         <div className="col-md-8">
// // // // //                           <p>{p.name}</p>
// // // // //                           <p>{p.description.substring(0, 30)}</p>
// // // // //                           <p>Price : {p.price}</p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               );
// // // // //             })
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </Layout>
// // // // //   );
// // // // // };

// // // // // export default AdminOrders;





// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import toast from "react-hot-toast";
// // // import AdminMenu from "../../components/Layout/AdminMenu";
// // // import Layout from "../../components/Layout/Layout";
// // // import { useAuth } from "../../context/auth";
// // // import moment from "moment";
// // // import { Select } from "antd";
// // // import * as XLSX from "xlsx"; // Import XLSX for Excel export
// // // import jsPDF from "jspdf"; // Import jsPDF for PDF export
// // // import "jspdf-autotable"; // Import jsPDF autotable plugin for table generation in PDF

// // // const { Option } = Select;

// // // const AdminOrders = () => {
// // //   const [status, setStatus] = useState([
// // //     "Not Process",
// // //     "Processing",
// // //     "Shipped",
// // //     "delivered",
// // //     "cancel",
// // //   ]);
// // //   const [changeStatus, setChangeStatus] = useState("");
// // //   const [orders, setOrders] = useState([]);
// // //   const [auth, setAuth] = useAuth();

// // //   const getOrders = async () => {
// // //     try {
// // //       const { data } = await axios.get("/api/v1/auth/all-orders");
// // //       setOrders(data);
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (auth?.token) getOrders();
// // //   }, [auth?.token]);

// // //   const handleChange = async (orderId, value) => {
// // //     try {
// // //       const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
// // //         status: value,
// // //       });
// // //       getOrders();
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   const exportOrdersToPDF = () => {
// // //     const doc = new jsPDF();
// // //     doc.text("Annamar rice mandi", 90, 10); // Add Shop name and Address content
// // //     doc.autoTable({
// // //       head: [["#", "Status", "Buyer", "Date", "Payment", "Quantity", "Price"]],
// // //       body: orders.map((o, i) => [
// // //         i + 1,
// // //         o.status,
// // //         o?.buyer?.name || "",
// // //         moment(o.createdAt).format("YYYY-MM-DD"), // Corrected date format for PDF
// // //         o.payment?.success ? "Success" : "Failed",
// // //         o.products?.length || 0,
// // //         o.products?.reduce((total, product) => total + product.price, 0) || 0,
// // //       ]),
// // //     });

// // //     doc.save("orders.pdf");
// // //   };

// // //   const exportOrdersToExcel = () => {
// // //     const selectedFields = orders.map((order) => ({
// // //       Status: order.status,
// // //       Buyer: order.buyer?.name || "",
// // //       Date: moment(order.createdAt).format("YYYY-MM-DD"), // Corrected date format for Excel
// // //       Payment: order.payment.success ? "Success" : "Failed",
// // //       Quantity: order.products.length,
// // //       Price: order.products.reduce((total, product) => total + product.price, 0),
// // //     }));

// // //     const worksheet = XLSX.utils.json_to_sheet(selectedFields);
// // //     const workbook = XLSX.utils.book_new();
// // //     XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
// // //     XLSX.writeFile(workbook, "orders.xlsx");
// // //   };

// // //   return (
// // //     <Layout title={"All Orders Data"}>
// // //       <div className="row dashboard">
// // //         <div className="col-md-3">
// // //           <AdminMenu />
// // //         </div>
// // //         <div className="col-md-9">
// // //           <h1 className="text-center">All Orders</h1>
// // //           <button
// // //             onClick={exportOrdersToExcel}
// // //             className="btn btn-primary mb-3"
// // //           >
// // //             Download as Excel
// // //           </button>
          
// // //           <button onClick={exportOrdersToPDF} className="btn btn-primary" style={{ marginLeft: "10px", marginTop: "-15px" }}>
// // //             Download as PDF
// // //           </button>

// // //           {orders.length === 0 ? (
// // //             <p className="text-center">No orders available</p>
// // //           ) : (
// // //             orders.map((o, i) => {
// // //               return (
// // //                 <div className="border shadow" key={o._id}>
// // //                   <table className="table">
// // //                     <thead>
// // //                       <tr>
// // //                         <th scope="col">#</th>
// // //                         <th scope="col">Status</th>
// // //                         <th scope="col">Buyer</th>
// // //                         <th scope="col">Date</th>
// // //                         <th scope="col">Payment</th>
// // //                         <th scope="col">Quantity</th>
// // //                         <th scope="col">Price</th> {/* Added Price column header */}
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                       <tr>
// // //                         <td>{i + 1}</td>
// // //                         <td>
// // //                           <Select
// // //                             bordered={false}
// // //                             onChange={(value) => handleChange(o._id, value)}
// // //                             defaultValue={o?.status}
// // //                           >
// // //                             {status.map((s, i) => (
// // //                               <Option key={i} value={s}>
// // //                                 {s}
// // //                               </Option>
// // //                             ))}
// // //                           </Select>
// // //                         </td>
// // //                         <td>{o?.buyer?.name}</td>
// // //                         <td>{moment(o.createdAt).format("YYYY-MM-DD")}</td> {/* Corrected date format for orders page */}
// // //                         <td>{o?.payment.success ? "Success" : "Failed"}</td>
// // //                         <td>{o?.products?.length}</td>
// // //                         {/* Calculate and display total price */}
// // //                         <td>{o?.products.reduce((total, product) => total + product.price, 0)}</td>
// // //                       </tr>
// // //                     </tbody>
// // //                   </table>
// // //                   <div className="container">
// // //                     {o?.products?.map((p, i) => (
// // //                       <div className="row mb-2 p-3 card flex-row" key={p._id}>
// // //                         <div className="col-md-4">
// // //                           <img
// // //                             src={`/api/v1/product/product-photo/${p._id}`}
// // //                             className="card-img-top"
// // //                             alt={p.name}
// // //                             width="100px"
// // //                             height={"200px"}
// // //                           />
// // //                         </div>
// // //                         <div className="col-md-8">
// // //                           <p>{p.name}</p>
// // //                           <p>{p.description.substring(0, 30)}</p>
// // //                           <p>Price : {p.price}</p>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })
// // //           )}
// // //         </div>
// // //       </div>
// // //     </Layout>
// // //   );
// // // };

// // // export default AdminOrders;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import moment from "moment";
// import { Select } from "antd";
// import * as XLSX from "xlsx"; // Import XLSX for Excel export
// import jsPDF from "jspdf"; // Import jsPDF for PDF export
// import "jspdf-autotable"; // Import jsPDF autotable plugin for table generation in PDF

// const { Option } = Select;

// const AdminOrders = () => {
//   const [status, setStatus] = useState([
//     "Not Process",
//     "Processing",
//     "Shipped",
//     "delivered",
//     "cancel",
//   ]);
//   const [changeStatus, setChangeStatus] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();
//   const [selectedStatus, setSelectedStatus] = useState([]);
//   const [selectedPayment, setSelectedPayment] = useState("");

//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/auth/all-orders");
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   const handleChange = async (orderId, value) => {
//     try {
//       const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
//         status: value,
//       });
//       getOrders();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const applyFilters = () => {
//     // Apply filters to orders based on selectedStatus and selectedPayment
//     // Filter orders array based on selectedStatus checkboxes and selectedPayment radio button
//     const filteredOrders = orders.filter((order) => {
//       const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(order.status);
//       const paymentMatch = selectedPayment === "" || order.payment.success === (selectedPayment === "Success");
//       return statusMatch && paymentMatch;
//     });
//     return filteredOrders;
//   };

//   const exportOrdersToPDF = () => {
//     const filteredOrders = applyFilters();
//     const doc = new jsPDF();
//     doc.text("Annamar rice mandi", 90, 10); // Add Shop name and Address content
//     doc.autoTable({
//       head: [["#", "Status", "Buyer", "Date", "Payment", "Quantity", "Price"]],
//       body: filteredOrders.map((o, i) => [
//         i + 1,
//         o.status,
//         o?.buyer?.name || "",
//         moment(o.createdAt).format("YYYY-MM-DD"), // Corrected date format for PDF
//         o.payment?.success ? "Success" : "Failed",
//         o.products?.length || 0,
//         o.products?.reduce((total, product) => total + product.price, 0) || 0,
//       ]),
//     });

//     doc.save("orders.pdf");
//   };

//   const exportOrdersToExcel = () => {
//     const filteredOrders = applyFilters();
//     const selectedFields = filteredOrders.map((order) => ({
//       Status: order.status,
//       Buyer: order.buyer?.name || "",
//       Date: moment(order.createdAt).format("YYYY-MM-DD"), // Corrected date format for Excel
//       Payment: order.payment.success ? "Success" : "Failed",
//       Quantity: order.products.length,
//       Price: order.products.reduce((total, product) => total + product.price, 0),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(selectedFields);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
//     XLSX.writeFile(workbook, "orders.xlsx");
//   };

//   return (
//     <Layout title={"All Orders Data"}>
//       <div className="row dashboard">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1 className="text-center">All Orders</h1>
//           <div className="mb-3">
//             <label htmlFor="filterByShipping">Filter by Shipping: </label>
//             <Select
//               id="filterByShipping"
//               mode="multiple"
//               placeholder="Select Shipping Status"
//               value={selectedStatus}
//               onChange={(value) => setSelectedStatus(value)}
//               style={{ width: "200px" }}
//             >
//               {status.map((s, i) => (
//                 <Option key={i} value={s}>
//                   {s}
//                 </Option>
//               ))}
//             </Select>
//           </div>
//           <div className="mb-3">
//             <label htmlFor=" filterByPayment">Filter by Payment: </label>
//             <Select
//               id="filterByPayment"
//               placeholder="Select Payment Status"
//               value={selectedPayment}
//               onChange={(value) => setSelectedPayment(value)}
//               style={{ width: "200px" }}
//             >
//               <Option value="Success">Success</Option>
//               <Option value="Failed">Failed</Option>
//             </Select>
//           </div>
//           <button onClick={exportOrdersToExcel} className="btn btn-primary mb-3">
//             Download as Excel
//           </button>
//           <button onClick={exportOrdersToPDF} className="btn btn-primary" style={{ marginLeft: "10px", marginTop: "-15px" }}>
//             Download as PDF
//           </button>

//           {orders.length === 0 ? (
//             <p className="text-center">No orders available</p>
//           ) : (
//             applyFilters().map((o, i) => {
//               return (
//                 <div className="border shadow" key={o._id}>
//                   {/* Your table rendering code here */}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminOrders;


import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import jsPDF from "jspdf"; // Import jsPDF for PDF export
import "jspdf-autotable"; // Import jsPDF autotable plugin for table generation in PDF

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel", // Update status array to include "Cancelled"
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const applyFilters = () => {
    const filteredOrders = orders.filter((order) => {
      let statusMatch = selectedStatus.length === 0 || selectedStatus.includes(order.status);
      const paymentMatch =
        selectedPayment === "" ||
        (selectedPayment === "Success" && order.payment.success) ||
        (selectedPayment === "Failed" && !order.payment.success);
      // Check if the order status is "Cancelled"
      if (selectedStatus.includes("Cancel")) {
        statusMatch = statusMatch || order.status === "Cancel";
      }
      return statusMatch && paymentMatch;
    });
    return filteredOrders;
  };
  

  const exportOrdersToPDF = () => {
    const filteredOrders = applyFilters();
    const doc = new jsPDF();
    doc.text("Annamar rice mandi", 90, 10); // Add Shop name and Address content
    doc.autoTable({
      head: [
        ["#", "Status", "Buyer", "Date", "Payment", "Quantity", "Total Amount"],
      ],
      body: filteredOrders.map((o, i) => [
        i + 1,
        o.status,
        o?.buyer?.name || "",
        moment(o.createdAt).format("YYYY-MM-DD"),
        o.payment?.success ? "Success" : "Failed",
        o.products?.length || 0,
        calculateTotalAmount(o).toFixed(2),
      ]),
    });

    doc.save("orders.pdf");
  };

  const calculateTotalAmount = (order) => {
    return order.products.reduce((total, product) => total + product.price, 0);
  };

  // const exportOrdersToExcel = () => {
  //   const filteredOrders = applyFilters();
  //   const selectedFields = filteredOrders.map((order) => ({
  //     Status: order.status,
  //     Buyer: order.buyer?.name || "",
  //     Date: moment(order.createdAt).format("YYYY-MM-DD"),
  //     Payment: order.payment.success ? "Success" : "Failed",
  //     Quantity: order.products.length,
  //     "Total Amount": calculateTotalAmount(order).toFixed(2),
  //   }));


  const exportOrdersToExcel = () => {
    const filteredOrders = applyFilters();
    const selectedFields = filteredOrders.map((order) => ({
      Status: order.status,
      Buyer: order.buyer?.name || "",
      Date: moment(order.createdAt).format("YYYY-MM-DD"),
      Payment: order.payment.success ? "Success" : "Failed",
      Quantity: order.products.length,
      "Total Amount": calculateTotalAmount(order).toFixed(2),
    }));
  
    // Add cancelled orders to selectedFields if "Cancelled" status is included in selectedStatus
    if (selectedStatus.includes("Cancel")) {
      const cancelledOrders = orders.filter((order) => order.status === "Cancel");
      selectedFields.push(
        ...cancelledOrders.map((order) => ({
          Status: order.status,
          Buyer: order.buyer?.name || "",
          Date: moment(order.createdAt).format("YYYY-MM-DD"),
          Payment: order.payment.success ? "Success" : "Failed",
          Quantity: order.products.length,
          "Total Amount": calculateTotalAmount(order).toFixed(2),
        }))
      );
    }
  
    const worksheet = XLSX.utils.json_to_sheet(selectedFields);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };
  

  const handleChange = (orderId, value) => {
    // Implement the logic for changing order status
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          <div className="mb-3">
            <label htmlFor="filterByShipping">Filter by Status: </label>
            <Select
              id="filterByShipping"
              mode="multiple"
              placeholder="Select Status"
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
              style={{ width: "200px" }}
            >
              {status.map((s, i) => (
                <Option key={i} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label htmlFor="filterByPayment">Filter by Payment: </label>
            <Select
              id="filterByPayment"
              placeholder="Select Payment Status"
              value={selectedPayment}
              onChange={(value) => setSelectedPayment(value)}
              style={{ width: "200px" }}
            >
              <Option value="Success">Success</Option>
              <Option value="Failed">Failed</Option>
            </Select>
          </div>
          <button onClick={exportOrdersToExcel} className="btn btn-primary mb-3">
            Download as Excel
          </button>
          <button
            onClick={exportOrdersToPDF}
            className="btn btn-primary"
            style={{ marginLeft: "10px", marginTop: "-15px" }}
          >
            Download as PDF
          </button>

          {orders.length === 0 ? (
            <p className="text-center">No orders available</p>
          ) : (
            orders.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Amount</th> {/* Added Total Amount column header */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).format("YYYY-MM-DD")}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        <td>{calculateTotalAmount(o).toFixed(2)}</td> {/* Display Total Amount */}
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, j) => (
                      <div className="row mb-2 p-3 card flex-row" key={j}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
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
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;




