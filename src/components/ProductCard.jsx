
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.sizes && product.sizes.length > 0) {
      addToCart(product.id, product.sizes[0]);
    } else {
      addToCart(product.id, 'One Size');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.images?.[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <Button
              size="sm"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button
              size="sm"
              onClick={handleQuickAdd}
              className="bg-red-500 hover:bg-red-600"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Stock indicator */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
              Only {product.stock} left
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Out of Stock
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-red-500">
              ${product.price}
            </span>
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.sizes.slice(0, 3).map((size) => (
                  <span
                    key={size}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{product.sizes.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
