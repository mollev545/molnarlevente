import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://fakestoreapiserver.reactbd.com/products`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="container-fluid bg-light-gray">
            <article className="row justify-content-center">
                <h1 className="text-center display-4 mt-5 mb-5 bg-light-red">Termékek</h1>

                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4" key={product.id}>
                            <div className="bg-light-red br3 pa3 ma2 grow bw2 shadow-5">
                                <h2 className="text-center">{product.title}</h2>
                                <p>Termék neve: {product.title}</p>
                                <p>
                                   <img src={product.image}/>
                                </p>
                                <p>Ára: {product.price} USD</p>
                                <p>Leírás: {product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default Products;
