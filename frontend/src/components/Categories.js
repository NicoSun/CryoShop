import './categories.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { loadCategories,updateCategory } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import {fetchData} from '../api/index.js';

const fetchCategories = () => async (dispatch) => {
  try {
      let endpoint = "Products/categories";
      const data = await fetchData(endpoint);
      dispatch(loadCategories(data));
  } catch (error) {
      console.log(error);
  }
  };

  const handleInputChange = (dispatch,value,navigate) => {
    try {
      dispatch(updateCategory(value));
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.products.categories);

    return (
      <div className="categories">
        <h4>Category</h4>
        <ul>
        {categories?.map((category) => (
            <li key={category.id} onClick={(e) =>{handleInputChange(dispatch,category.category,navigate)}}>{category.category}</li>
        ))}
        </ul>
        
      </div>
    );
  };

  export default Categories;