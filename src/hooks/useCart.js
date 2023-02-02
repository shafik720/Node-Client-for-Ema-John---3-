import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";


function useCart() {
    let [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getStoredCart();
        let freshCart = [];
        const keys = Object.keys(storedCart);

        fetch('http://localhost:5000/productByKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/JSON'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                for (let productId in storedCart) {
                    let addedProduct = products.find(product => product._id === productId);

                    if (addedProduct) {
                        let quantity = storedCart[productId];
                        addedProduct.quantity = quantity;
                        freshCart.push(addedProduct);
                    }
                }
                setCart(freshCart);
            })


    }, [])
    return [cart, setCart]
}

export default useCart;