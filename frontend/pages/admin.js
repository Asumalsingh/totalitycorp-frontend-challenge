import React, { useState, useEffect } from "react";

export default function Admin() {
  // const categoriesData = ["mens", "womens"];
  // const productTypeData = ["shirt", "crop-top", "hoodies", "joggers"];
  // const sizesData = ["s", "m", "l"];

  // // States to handel input
  // const [image, setImage] = useState();
  // const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  // const [productType, setProductType] = useState("");
  // const [sizes, setSizes] = useState([]);
  // const [price, setPrice] = useState("");

  // const dispatch = useDispatch();
  // const { products, user } = useSelector((state) => {
  //   return state;
  // });

  // useEffect(() => {
  //   if (user.data && !user.data.isAdmin) {
  //     location.replace("/");
  //     return;
  //   }
  // }, [user]);

  // const onImageChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader(null);

  //   // transfort image
  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //   } else {
  //     setImage(null);
  //   }
  // };

  // const publishProduct = (e) => {
  //   e.preventDefault();
  //   // Get the form data
  //   const formData = {
  //     name,
  //     categories,
  //     type: productType,
  //     size: sizes,
  //     price,
  //     image,
  //   };

  //   // make request to server to add product
  //   dispatch(addProduct(formData));

  //   // Reset the form state
  //   setName("");
  //   setCategories([]);
  //   setProductType([]);
  //   setSizes([]);
  //   setPrice("");
  // };

  return (
    // <section className="max-w-screen-xl  mx-auto px-5 py-28">
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //     {/* Get input data of all field */}
    //     <div>
    //       <label htmlFor="name" className="pb-8 font-medium">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         placeholder="Product name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         className="w-full mb-3 p-3  rounded-md border border-gray-200 bg-gray-50 focus:border-gray-300 outline-none "
    //       />

    //       <label className="mb-8 font-medium">Categories</label>
    //       <ul className="items-center mb-4">
    //         {categoriesData.map((category, index) => {
    //           return (
    //             <li key={index} className="flex items-center mb-2 mt-2">
    //               <input
    //                 id={category}
    //                 type="checkbox"
    //                 value={category}
    //                 checked={categories.includes(category)}
    //                 onChange={(e) => {
    //                   if (e.target.checked) {
    //                     setCategories([...categories, category]);
    //                   } else {
    //                     setCategories(categories.filter((c) => c !== category));
    //                   }
    //                 }}
    //                 className="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
    //               />
    //               <label
    //                 htmlFor={category}
    //                 className="ml-2 text-xs capitalize text-gray-900 dark:text-gray-300"
    //               >
    //                 {category}
    //               </label>
    //             </li>
    //           );
    //         })}
    //       </ul>

    //       {/* Product type */}
    //       <label className="mb-8 font-medium">Product type</label>
    //       <ul className="items-center mb-4">
    //         <li className="flex items-center mb-2 mt-2">
    //           <input
    //             id="tShirt"
    //             type="checkbox"
    //             name="tShirt"
    //             value="tShirt"
    //             checked={productType.includes("tShirt")}
    //             onChange={(e) => {
    //               if (e.target.checked) {
    //                 setProductType(e.target.value);
    //               } else {
    //                 setProductType("");
    //               }
    //             }}
    //             className="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
    //           />
    //           <label
    //             htmlFor="tShirt"
    //             className="ml-2 text-xs capitalize cursor-pointer  text-gray-900 dark:text-gray-300"
    //           >
    //             t-shirt
    //           </label>
    //         </li>
    //         {productTypeData.map((product, index) => {
    //           return (
    //             <li key={index} className="flex items-center mb-2 mt-2">
    //               <input
    //                 id={product}
    //                 type="checkbox"
    //                 name={product}
    //                 value={product}
    //                 checked={productType.includes(product)}
    //                 onChange={(e) => {
    //                   if (e.target.checked) {
    //                     setProductType(e.target.value);
    //                   } else {
    //                     setProductType("");
    //                   }
    //                 }}
    //                 className="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
    //               />
    //               <label
    //                 htmlFor={product}
    //                 className="ml-2 text-xs capitalize cursor-pointer  text-gray-900 dark:text-gray-300"
    //               >
    //                 {product}
    //               </label>
    //             </li>
    //           );
    //         })}
    //       </ul>

    //       {/* Size */}
    //       <label className="mb-8 font-medium">Size</label>
    //       <ul className="flex space-x-6 items-center mt-2 mb-4">
    //         {sizesData.map((size, index) => {
    //           return (
    //             <li key={index} className="flex items-center mb-2">
    //               <input
    //                 id={size}
    //                 type="checkbox"
    //                 value={size}
    //                 checked={sizes.includes(size)}
    //                 onChange={(e) => {
    //                   if (e.target.checked) {
    //                     setSizes([...sizes, size]);
    //                   } else {
    //                     setSizes(sizes.filter((s) => s !== size));
    //                   }
    //                 }}
    //                 className="w-4 h-4 text-blue-500 cursor-pointer border-gray-300 rounded-md focus:ring-0"
    //               />
    //               <label
    //                 htmlFor={size}
    //                 className="ml-2 text-xs capitalize  text-gray-900 dark:text-gray-300"
    //               >
    //                 {size}
    //               </label>
    //             </li>
    //           );
    //         })}
    //       </ul>

    //       {/* Price */}
    //       <label htmlFor="name" className="pb-8 font-medium">
    //         Price
    //       </label>
    //       <input
    //         type="number"
    //         id="price"
    //         name="price"
    //         placeholder="Rs. 00000"
    //         value={price}
    //         onChange={(e) => {
    //           setPrice(e.target.value);
    //         }}
    //         className="w-full mb-3 p-3  rounded-md border border-gray-200 bg-gray-50 focus:border-gray-300 outline-none "
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="name" className="pb-8 font-medium">
    //         Select product image
    //       </label>
    //       <div className="mt-2">
    //         <input
    //           type="file"
    //           id="img"
    //           name="img"
    //           accept="image/*"
    //           onChange={onImageChange}
    //           className="cursor-pointer"
    //         />

    //         <div className="mt-6">
    //           <img
    //             src={image}
    //             alt="image-review"
    //             className="w-40 h-auto"
    //             sizes={40}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex justify-center mt-4">
    //     <button
    //       className="px-4 py-2 rounded-md bg-blue-500 text-white"
    //       onClick={publishProduct}
    //     >
    //       Publish
    //     </button>
    //   </div>
    // </section>

    <div>Admin</div>
  );
}
