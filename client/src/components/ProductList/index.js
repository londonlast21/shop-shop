import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
//import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif"
import { connect, useSelector, useDispatch } from 'react-redux';


function ProductList() {
  const { loading, data } = useQuery(QUERY_PRODUCTS);


  const state = useSelector(state => state.products);
  const dispatch = useDispatch();

  const  { currentCategory }  = useSelector(state => state.currentCategory);
  console.log('here');
  console.log(state);

  

  useEffect(() => {
    if(data) {
      dispatch({
           type: UPDATE_PRODUCTS,
          products: data.products
        });
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
         products: state.products
       });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return data.products;
    }

    return this.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

function mapStateToProps(state) {
  const products = state.products;

  console.log('secondhit');
  console.log(products);
  return  { products };

  

}

export default connect(mapStateToProps, null)(ProductList);
