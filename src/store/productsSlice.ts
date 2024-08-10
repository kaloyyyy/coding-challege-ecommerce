import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

type CartItem = {
    product: Product;
    quantity: number;
};

type ProductsState = {
    products: Product[];
    currentPage: number;
    totalPages: number;
    searchQuery: string;
    sortBy: 'name' | 'price' | 'rating' | null;
    cart: CartItem[];
};

const initialState: ProductsState = {
    products: [],
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
    sortBy: null,
    cart: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<{ products: Product[]; totalPages: number }>) {
            state.products = action.payload.products;
            state.totalPages = action.payload.totalPages;

            // Apply sorting if sortBy is set
            if (state.sortBy) {
                state.products = sortProducts(state.products, state.sortBy);
            }
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
        },
        setSortBy(state, action: PayloadAction<'name' | 'price' | 'rating' | null>) {
            state.sortBy = action.payload;

            // Sort products immediately when sortBy changes
            if (state.sortBy) {
                state.products = sortProducts(state.products, state.sortBy);
            }
        },
        addToCart(state, action: PayloadAction<Product>) {
            const existingItem = state.cart.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ product: action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<Product>) {
            state.cart = state.cart.filter(item => item.product.id !== action.payload.id);
        },
        clearCart(state) {
            state.cart = [];
        }
    },
});

export const { setProducts, setPage, setSearchQuery, setSortBy, addToCart, removeFromCart, clearCart } = productsSlice.actions;
export default productsSlice.reducer;

// Helper function to sort products
function sortProducts(products: Product[], sortBy: 'name' | 'price' | 'rating' | null): Product[] {
    switch (sortBy) {
        case 'name':
            return products.slice().sort((a, b) => a.name.localeCompare(b.name));
        case 'price':
            return products.slice().sort((a, b) => a.price - b.price);
        case 'rating':
            return products.slice().sort((a, b) => b.rating - a.rating); // Assuming higher rating is better
        default:
            return products;
    }
}
