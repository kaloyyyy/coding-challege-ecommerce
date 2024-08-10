import { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { setPage, setProducts, setSearchQuery, setSortBy, addToCart, removeFromCart, clearCart } from '@/store/productsSlice';
import Image from 'next/image';
import { RootState } from '@/store';
import { Product } from '@/types';

const PRODUCTS_PER_PAGE = 10;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home = () => {
    const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { products, currentPage, totalPages, searchQuery, sortBy, cart } = useTypedSelector((state) => state.products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`);
                const data = await response.json();
                if (data && Array.isArray(data.products)) {
                    dispatch(setProducts(data));
                } else {
                    console.error('Data does not contain products array:', data);
                    dispatch(setProducts([]));
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                dispatch(setProducts([]));
            }
        };

        fetchProducts();
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (Array.isArray(products)) {
            const filtered = products.filter((product: Product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [products, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearchClick = () => {
        dispatch(setSearchQuery(searchInput.trim()));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setPage(currentPage + 1));
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1));
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(e.target.value as 'name' | 'price' | 'rating'));
    };

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product: Product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <div className="flex items-center">
                {Array.from({ length: fullStars }, (_, index) => (
                    <span key={index} className="text-yellow-500">★</span>
                ))}
                {hasHalfStar && (
                    <span className="text-yellow-500">★</span>
                )}
                {Array.from({ length: emptyStars }, (_, index) => (
                    <span key={index} className="text-gray-300">☆</span>
                ))}
            </div>
        );
    };

    return (
        <div className="p-6">
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
                <div>
                    <span className="text-xl font-bold">My Store</span>
                </div>
                <div>
                    <button
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="text-lg font-semibold bg-blue-500 text-white p-2 rounded"
                    >
                        Cart: {cartTotalItems} items - ${cartTotalPrice}
                    </button>
                </div>
            </header>

            <div className="pt-16 mx-36 md:mx-10 sm:mx-4"> {/* To offset fixed header */}
                <div className="flex mb-6">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="ml-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Search
                    </button>
                </div>

                <div className="flex justify-between mb-6">
                    <div>
                        <label>Sort By: </label>
                        <select value={sortBy || ''} onChange={handleSortChange} className="p-2 border border-gray-300 rounded">
                            <option value="">None</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="border rounded-lg p-4 shadow-md">
                                <div className="relative w-full h-60">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-md product-image"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                                <p className="text-gray-600 mt-1">
                                    {product.description.length > 100
                                        ? `${product.description.slice(0, 100)}...`
                                        : product.description}
                                </p>
                                <div className="mt-2">
                                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                                </div>
                                <div className="mt-2">
                                    {renderStars(product.rating)}
                                    <span className="text-gray-500 ml-2">{product.rating.toFixed(1)}</span>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePreviousPage}
                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Cart Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Shopping Cart</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-red-500 hover:underline"
                            >
                                Close
                            </button>
                        </div>
                        {cart.length > 0 ? (
                            <div>
                                {cart.map((item) => (
                                    <div key={item.product.id} className="flex justify-between items-center mb-4">
                                        <div>
                                            <span className="font-semibold">{item.product.name}</span> - {item.quantity} x ${item.product.price.toFixed(2)}
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleRemoveFromCart(item.product)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4">
                                    <span className="font-semibold">Total: ${cartTotalPrice}</span>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handleClearCart}
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p>Your cart is empty</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
