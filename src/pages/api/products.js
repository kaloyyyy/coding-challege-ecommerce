


export default function handler(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const allProducts = [
        { id: 1, name: 'Product 1', description: 'This is a description for product 1', price: 29.99, rating: 4.5, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', description: 'This is a description for product 2', price: 19.99, rating: 4.0, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', description: 'This is a description for product 3', price: 9.99, rating: 4.7, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Product 4', description: 'This is a description for product 4', price: 49.99, rating: 3.9, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Product 5', description: 'This is a description for product 5', price: 39.99, rating: 4.2, image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Product 6', description: 'This is a description for product 6', price: 59.99, rating: 4.8, image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Product 7', description: 'This is a description for product 7', price: 89.99, rating: 4.3, image: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Product 8', description: 'This is a description for product 8', price: 15.99, rating: 4.1, image: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Product 9', description: 'This is a description for product 9', price: 5.99, rating: 4.4, image: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Product 10', description: 'This is a description for product 10', price: 25.99, rating: 4.6, image: 'https://via.placeholder.com/150' },
        { id: 11, name: 'Product 11', description: 'This is a description for product 11', price: 35.99, rating: 4.2, image: 'https://via.placeholder.com/150' },
        { id: 12, name: 'Product 12', description: 'This is a description for product 12', price: 45.99, rating: 4.7, image: 'https://via.placeholder.com/150' },
        { id: 13, name: 'Product 13', description: 'This is a description for product 13', price: 75.99, rating: 4.3, image: 'https://via.placeholder.com/150' },
        { id: 14, name: 'Product 14', description: 'This is a description for product 14', price: 95.99, rating: 4.8, image: 'https://via.placeholder.com/150' },
        { id: 15, name: 'Product 15', description: 'This is a description for product 15', price: 20.99, rating: 4.4, image: 'https://via.placeholder.com/150' },
        { id: 16, name: 'Product 16', description: 'This is a description for product 16', price: 30.99, rating: 4.1, image: 'https://via.placeholder.com/150' },
        { id: 17, name: 'Product 17', description: 'This is a description for product 17', price: 55.99, rating: 4.6, image: 'https://via.placeholder.com/150' },
        { id: 18, name: 'Product 18', description: 'This is a description for product 18', price: 70.99, rating: 4.2, image: 'https://via.placeholder.com/150' },
        { id: 19, name: 'Product 19', description: 'This is a description for product 19', price: 85.99, rating: 4.5, image: 'https://via.placeholder.com/150' },
        { id: 20, name: 'Product 20', description: 'This is a description for product 20', price: 100.99, rating: 4.7, image: 'https://via.placeholder.com/150' }
    ];


    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const products = allProducts.slice(startIndex, endIndex);

    res.status(200).json({
        products,
        totalPages: Math.ceil(allProducts.length / limitNumber),
    });
}
