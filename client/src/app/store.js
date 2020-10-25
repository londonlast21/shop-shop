import { configureStore } from '@reduxjs/toolkit'
import useProductReducer from '../utils/reducers';

export default configureStore({
  reducer: {
    products: useProductReducer
    
  }
})