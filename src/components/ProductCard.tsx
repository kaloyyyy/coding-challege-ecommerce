import React from 'react'

interface ProductCardProps {
    id: number
    name: string
    description: string
    price: number
    rating: number
    image: string
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, rating, image }) => {
    return (
        <div className="border p-4 rounded">
            <img src={image} alt={name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold">{name}</h2>
            <p>{description.substring(0, 100)}...</p>
            <p className="font-bold">${price.toFixed(2)}</p>
            <p>{'⭐'.repeat(Math.round(rating))}</p>
        </div>
    )
}

export default ProductCard
