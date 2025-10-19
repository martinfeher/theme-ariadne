import Header from './components/Header';
import PopularProducts from './components/PopularProducts';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Nest eCommerce
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your one-stop shop for fresh groceries and daily essentials
            </p>
            
            {/* Hero Section Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600">
                This is where your featured products, banners, and promotional content would go.
                The header component has been successfully translated from the HTML template!
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-green-500 text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free shipping on orders over $50</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-green-500 text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payment</h3>
                <p className="text-gray-600">100% secure payment processing</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-green-500 text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round the clock customer support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Products Section */}
        <PopularProducts />
      </main>
    </div>
  );
}
