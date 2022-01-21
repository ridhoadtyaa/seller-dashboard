import React, { Fragment, useEffect, useState } from 'react';
import NavbarDashboard from '../components/NavbarDashboard';
import { BiPencil, BiTrash } from "react-icons/bi";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import { db } from '../firebase';
import Toast, { notifyType } from '../components/Toast';

const MyProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getDataProduct = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const basket = [];
        querySnapshot.forEach((doc) => {
            basket.push({id: doc.id, data: doc.data()});
        });
        setProducts(basket);
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'My Product - E Commerce';
        getDataProduct();
    }, []);

    const deleteProductHandler = async (id) => {
        await deleteDoc(doc(db, 'products', id));
        notifyType('success', 'Product deleted successfully');
        getDataProduct();
    }

    return (
        <Fragment>
            <NavbarDashboard />
            <Toast />
            <section className="container my-4 pb-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-2 border-dark">
                            <div className="card body p-4">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="input-group mb-3">
                                            <input type="search" className="form-control" placeholder="Search" aria-label="Search" onChange={e => setSearchTerm(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope='col'>Photo</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Sold</th>
                                            <th scope="col">Avaible</th>
                                            <th scope='col'>Rating</th>
                                            <th scope='col'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !loading ? (
                                                products.length ? (
                                                    products.filter(product => {
                                                        if(searchTerm === '') {
                                                            return product;
                                                        } else if(product.data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                            return product;
                                                        }
                                                    }).map((product, i) => (
                                                        <tr key={product.id}>
                                                            <th scope="row">{i+1}</th>
                                                            <td><img src={product.data.photo} alt="product" width={70} /></td>
                                                            <td>{product.data.name}</td>
                                                            <td>4</td>
                                                            <td>{product.data.stock}</td>
                                                            <td>5/5</td>
                                                            <td>
                                                                <button className="btn btn-outline"><BiPencil /></button>
                                                                <button className="btn btn-outline" onClick={() => deleteProductHandler(product.id)}><BiTrash /></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <th>Product doesn't exist yet</th>
                                                    </tr>
                                                )
                                            ) : (
                                                <tr>
                                                    <th>Loading...</th>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default MyProduct;