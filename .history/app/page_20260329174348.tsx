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
              Welcome to 
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your one-stop shop for fresh groceries and daily essentials
            </p>
         

        {/* Popular Products Section */}
        <PopularProducts />
      </main>
    </div>
  );
}
