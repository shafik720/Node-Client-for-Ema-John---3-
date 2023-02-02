import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Body.css'

const Body = () => {

    const[page,setPage] = useState(0);
    const[pageSize, setPageSize] = useState(10);
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/product?page=${page}&size=${pageSize}`)
        .then(res=>res.json())
        .then(data=>setProducts(data))
        console.log('ok');
    },[page, pageSize]);
    
    let [cart, setCart] = useCart();
    function handleCart(selectedProduct) {
        let newCart = [];
        let exist = cart.find(product => product._id === selectedProduct._id);
        if (!exist) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            exist.quantity = exist.quantity + 1;
            let restProduct = cart.filter(product => product._id !== selectedProduct._id);

            newCart = [...restProduct, exist];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }



    //------------- pagination
    const[pageCount, setPageCount] = useState(0);
    useEffect(()=>{
        fetch('http://localhost:5000/productCount')
        .then(res=>res.json())
        .then(data=>{
            const counter = Math.ceil(data.result / 10);
            setPageCount(counter);
        });
    },[products]);



    // Loading product according to search query

    return (
        <div className="">
            <div className="body-div">
                <div className="body-left">
                    {
                        products.map(index => <Products
                            index={index}
                            key={index._id}
                            handleCart={handleCart}
                        ></Products>)
                    }
                </div>
                <div className="body-right">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
            <div className="my-5 text-center pagination">
            {
                [...Array(pageCount).keys()].map(index=><button
                    onClick={()=>setPage(index)}
                    className={page == index ? 'selected' : ''}
                >{index + 1}</button>)
            }
            {pageSize}
            <select onChange={e=>setPageSize(e.target.value)}>
                <option value="5">5</option>
                <option selected value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            </div>
        </div>
    );
};

export default Body;