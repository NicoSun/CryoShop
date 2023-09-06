import React, { useEffect } from 'react';

import { loadCategories } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import {fetchData} from '../api/index.js';

const fetchAndSetData = () => async (dispatch) => {
  try {
      let endpoint = "Products/categories";
      const data = await fetchData(endpoint);
      dispatch(loadCategories(data));
  } catch (error) {
      console.log(error);
  }
  };

const Categories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAndSetData());
  }, [dispatch]);

  const category = useSelector((state) => state.category)

    return (
      <div className="categories">
        <h4>Category</h4>
        {category?.map((product) => (
          <div key={product.id}>
            <p>{product.category}</p>
            </div>
        ))}
      </div>
    );
  };

  export default Categories;