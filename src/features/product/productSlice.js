import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  fetchProductsByFilter,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async ({ product, alert, message }) => {
    const response = await createProduct(product);
    alert.success(`Product ${message}`);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async ({ product, alert, message }) => {
    const response = await updateProduct(product);
    alert.success(`Product ${message} successfully`);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilter(
      filter,
      sort,
      pagination,
      admin
    );
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectedProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
