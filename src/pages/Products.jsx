
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceSort, setPriceSort] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, priceSort]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('products').select('*');
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      if (priceSort === 'low-high') {
        query = query.order('price', { ascending: true });
      } else if (priceSort === 'high-low') {
        query = query.order('price', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const FilterSidebar = ({ className = '' }) => (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setSelectedCategory(category.value);
                setSearchParams(category.value === 'all' ? {} : { category: category.value });
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.value
                  ? 'bg-red-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Sort */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Sort by Price</h3>
        <div className="space-y-2">
          {[
            { value: '', label: 'Featured' },
            { value: 'low-high', label: 'Price: Low to High' },
            { value: 'high-low', label: 'Price: High to Low' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setPriceSort(option.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                priceSort === option.value
                  ? 'bg-red-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-gray-900 border-gray-700">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">
                {selectedCategory === 'all' ? 'All Products' : categories.find(cat => cat.value === selectedCategory)?.label}
              </h1>
              <p className="text-gray-400">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Products Grid */}
            <AnimatePresence>
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;
