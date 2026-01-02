import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Auction from './pages/Auction'
import TinyHomes from './pages/TinyHomes'
import RentDetail from './pages/RentDetail'
import PropertyDetail from './pages/PropertyDetail'
import LandsLots from './pages/LandsLots'
import Tradeshow from './pages/Tradeshow'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Tiny Homes</h1>
                <p className="text-gray-600">Find your perfect tiny home.</p>
              </div>
            }
          />
          <Route path="/tradeshow" element={<Tradeshow />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/tiny-homes" element={<TinyHomes />} />
          <Route path="/lands-lots" element={<LandsLots />} />
          <Route
            path="/marketplace"
            element={<div className="text-xl font-semibold text-gray-800">World of Tiny Homes MARKETPLACE</div>}
          />
          <Route
            path="/account"
            element={<div className="text-xl font-semibold text-gray-800">My Account</div>}
          />
          <Route path="/rent/:id" element={<RentDetail />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
