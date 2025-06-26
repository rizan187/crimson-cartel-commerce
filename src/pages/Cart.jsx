
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, getCartTotal, getCartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <Button className="bg-red-500 hover:bg-red-600">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-8">Shopping Cart ({getCartCount()} items)</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images?.[0] || '/placeholder.svg'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-400">{item.size && `Size: ${item.size}`}</p>
                        <p className="text-red-500 font-bold text-lg">${item.price}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateCartItem(item.id, item.size, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 border border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateCartItem(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 h-fit sticky top-24"
            >
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${getCartTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>$0.00</span>
                </div>
                <hr className="border-gray-700" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-red-500">${getCartTotal()}</span>
                </div>
              </div>

              <Link to="/checkout" className="block w-full">
                <Button className="w-full bg-red-500 hover:bg-red-600 py-3 text-lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/products" className="block w-full mt-4">
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
