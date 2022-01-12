import React, { Fragment, useEffect, useState } from 'react';
import NavbarDashboard from '../components/NavbarDashboard';
import '../assets/css/AddProduct.css';
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Toast, { notifyType } from '../components/Toast';

import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productFreshness, setProductFreshness] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [fileUrl, setFileUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const onPhotoChange = (e) => {
        const storage = getStorage();
        const file = e.target.files[0];
        const randomFileName = `${(Math.random() + 1).toString(36).substring(7)}.${file.name.split('.')[1]}`;
        const storageRef = ref(storage, randomFileName);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFileUrl(downloadURL);
            });
          }
        )
    }
    
    const submitProductHandler = async () => {
        setLoading(true);
        if(productName.length && productCategory.length && productFreshness.length && description.length && price > 0 && fileUrl != null && stock > 0) {
            try {
                await addDoc(collection(db, "products"), {
                  name: productName,
                  category: productCategory,
                  condition: productFreshness,
                  photo: fileUrl,
                  price,
                  stock, 
                  description
                });
    
                cancelHandler();
                notifyType('success', 'Product added successfully');
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            notifyType('error', 'Please fill out the form correctly');
        }
        setLoading(false);
    }

    const cancelHandler = () => {
        setProductName('');
        setProductCategory('');
        setProductFreshness('');
        setFileUrl(null);
        setPrice(0);
        setDescription('');
        setStock(0);
    }

    useEffect(() => {
        document.title = 'Add Product - E Commerce';
    }, []);
    
    return (
        <Fragment>
            <NavbarDashboard />
            <section id='add-product' className="container my-4 pb-4">
                <Toast />
                <div className="row">
                    <div className="col-md-6">
                        <form >
                            <div className="mb-5">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="name" placeholder='Add your product name' value={productName} onChange={(e) => setProductName(e.target.value)}/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="category" className="form-label">Product Category</label>
                                <select className="form-select" id='category' onChange={(e) => setProductCategory(e.target.value)}> 
                                    <option disabled selected>Choose a category</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Accecories">Accecories</option>
                                    <option value="T-Shirt">T-Shirt</option>
                                </select>
                            </div>
                            <div className="mb-5 d-flex">
                                <div className="col-md-3">
                                    <label htmlFor="freshness" className="form-label">Product Freshness</label>
                                </div>
                                <div className="col-md-9" onChange={e => setProductFreshness(e.target.value)}>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="freshness" id="brandnew" value='Brand New' />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Brand New</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="freshness" id="second" value='Second Hand' />
                                        <label className="form-check-label text-nowrap" htmlFor="inlineRadio2">Second Hand</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="freshness" id="refurbished" value='Refurbished' />
                                        <label className="form-check-label text-nowrap" htmlFor="inlineRadio2">Refurbished</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description" className="form-label">Additonal Description</label>
                                <textarea className="form-control" id="description" placeholder='Description' rows="5" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="price" className="form-label">Product Price</label>
                                <input type="number" className="form-control" id="price" placeholder='Add your product price' onChange={e => setPrice(e.target.value)} value={price > 0 ? price : ''} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="stock" placeholder='Add your product stock' onChange={e => setStock(e.target.value)} value={stock > 0 ? stock : ''} />
                            </div>
                            <div className="my-5">
                                <label htmlFor="photo" className="form-label">Image of Proucts</label>
                                <input className="form-control" type="file" id="photo" onChange={onPhotoChange} />
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5 ms-auto">
                        <div className="card border">
                            <div className="card-body row align-items-center">
                                <div className="col-md-7 mx-auto">
                                    <p className='fw-bold text-center'>Your product will be showed in the store like this :</p>
                                    <img className='img-fluid' src={fileUrl !== null ? fileUrl : require('../assets/img/exampleProduct.png')} alt="Product" />
                                    <h5 className='mt-3'>{productName.length ? productName : 'Product Name'}</h5>
                                    <h5 className='mt-5 mb-4 fw-bold'>$ {price > 0 ? price : 273.00}</h5>
                                    <p className='text-muted m-0'>{productCategory.length ? productCategory : 'Category'}</p>
                                    <p className='text-muted'>$5.95 for shipping</p>
                                    <div className="row">
                                        <div className="col-md-8 d-flex">
                                            <p className='text-warning'><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></p>
                                            <p className='ms-3'>4.56</p>
                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-outline border border-primary text-primary buy">Buy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 text-center'>
                            <button className="btn btn-outline border border-dark btn-lg" onClick={cancelHandler}>Cancel</button>
                            <button className={`btn ${loading ? 'btn-secondary' : 'btn-dark'} btn-lg ms-3`} onClick={submitProductHandler}>Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default AddProduct;