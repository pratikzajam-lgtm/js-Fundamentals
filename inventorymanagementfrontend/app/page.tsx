"use client"
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()


  let redirectLogin = () => {
    router.push("/login")
  }



  return (
    <div className="min-h-screen bg-white">

      <header className="fixed top-0 w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">📦 InventoryPro</div>
          <button

            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
          >
            Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Streamline Your Inventory Management
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto">
          Powerful, intuitive software to track, manage, and optimize your inventory in real-time
        </p>
        <button
          onClick={redirectLogin}

          className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          Get Started - Login Now
        </button>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-3xl mb-6">
              📊
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Real-Time Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your inventory levels instantly with live updates and automated alerts for low stock items.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-3xl mb-6">
              🔄
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Multi-Location Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Manage inventory across multiple warehouses and locations from a single, unified dashboard.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-3xl mb-6">
              📈
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Analytics & Reports</h3>
            <p className="text-gray-600 leading-relaxed">
              Get detailed insights with customizable reports and analytics to make data-driven decisions.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-3xl mb-6">
              🔔
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Alerts</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive intelligent notifications for low stock, expiring items, and reorder points automatically.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-3xl mb-6">
              🔗
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Easy Integration</h3>
            <p className="text-gray-600 leading-relaxed">
              Seamlessly integrate with your existing ERP, accounting, and e-commerce platforms.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-3xl mb-6">
              📱
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Mobile Access</h3>
            <p className="text-gray-600 leading-relaxed">
              Access your inventory data anywhere, anytime with our responsive mobile-friendly interface.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h2 className="text-5xl font-bold text-purple-600 mb-3">10K+</h2>
            <p className="text-gray-600 text-lg">Active Users</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-purple-600 mb-3">99.9%</h2>
            <p className="text-gray-600 text-lg">Uptime</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-purple-600 mb-3">50M+</h2>
            <p className="text-gray-600 text-lg">Items Tracked</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Inventory Management?
        </h2>
        <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
          Join thousands of businesses already streamlining their operations with InventoryPro
        </p>
        <button
          onClick={redirectLogin}

          className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          Login to Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-gray-400">© 2024 InventoryPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
