import { Search, Heart, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CustomSelect from '../components/CustomSelect'
import tinyHome1 from './tiny home 1.jpg'
import tinyHome14 from './tiny home 14.jpg'
import tinyHome15 from './tiny home 15.jpeg'
import landsLotsData from '../data/landsLots.json'
import rentDetailData from '../data/rentDetail.json'

export default function LandsLots() {
  const rentProperty = rentDetailData[0]
  const [keyword, setKeyword] = useState('')
  const [landFor, setLandFor] = useState('')
  const [price, setPrice] = useState('')
  const [sizeUnit, setSizeUnit] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [results, setResults] = useState([])
  const [sortBy, setSortBy] = useState('Keyword')

  const resetFilters = () => {
    setKeyword('')
    setLandFor('')
    setPrice('')
    setSizeUnit('')
    setZipcode('')
  }

  useEffect(() => {
    setResults(landsLotsData)
  }, [])

  const toNum = (p) => Number(p.replace(/[^0-9.]/g, ''))
  const filteredResults = results.filter((item) => {
    const text = `${item.title} ${item.state} ${item.city} ${item.address}`.toLowerCase()
    const keywordOk = keyword ? text.includes(keyword.toLowerCase()) : true
    const landForOk = landFor ? item.propertyFor === landFor : true
    const priceNum = toNum(item.price)
    let priceOk = true
    if (price === 'Under $500,000') priceOk = priceNum < 500000
    else if (price === '$500,000 - $1,000,000') priceOk = priceNum >= 500000 && priceNum <= 1000000
    else if (price === '$1,000,000+') priceOk = priceNum > 1000000
    return keywordOk && landForOk && priceOk
  })

  const keywordScore = (item) => {
    if (!keyword) return 0
    const k = keyword.toLowerCase()
    const title = item.title.toLowerCase()
    const text = `${item.title} ${item.state} ${item.city} ${item.address}`.toLowerCase()
    if (!text.includes(k)) return 0
    const occurrences = (text.match(new RegExp(k, 'g')) || []).length
    const firstIndex = text.indexOf(k)
    const startsInTitle = title.startsWith(k) ? 1 : 0
    const inTitle = title.includes(k) ? 1 : 0
    return occurrences * 10 + (100 - firstIndex) + startsInTitle * 10 + inTitle * 5
  }

  const sortedResults =
    sortBy === 'Keyword' && !keyword
      ? filteredResults
      : [...filteredResults].sort((a, b) => {
          if (sortBy === 'Keyword') return keywordScore(b) - keywordScore(a)
          if (sortBy === 'Highest Price') return toNum(b.price) - toNum(a.price)
          if (sortBy === 'Lowest Price') return toNum(a.price) - toNum(b.price)
          if (sortBy === 'Name') return a.title.localeCompare(b.title)
          return 0
        })

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-3 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span> / </span>
          <span className="text-yellow-600 font-medium">Lands/Lots</span>
        </div>
      </div>

      <div className="xl:col-span-3">
        <h1 className="text-4xl font-normal text-[#333333] tracking-tight uppercase">Lands/Lots</h1>
      </div>

      <aside className="xl:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Keyword</label>
            <div className="relative">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Keyword"
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Land For</label>
            <CustomSelect
              value={landFor}
              onChange={setLandFor}
              options={['Sale', 'Rent', 'Auction']}
              placeholder="Land For"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Price ($)</label>
            <CustomSelect
              value={price}
              onChange={setPrice}
              options={['0-100', '100-500', '500-2000', '2000-25000', '25000-100000', 'More Than 100000']}
              placeholder="Select Price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Size Unit</label>
            <CustomSelect
              value={sizeUnit}
              onChange={setSizeUnit}
              options={['SqFt', 'Acre', 'Hectare']}
              placeholder="Size Unit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Zipcode</label>
            <input
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Zipcode"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button type="button" className="w-full py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold shadow-sm">Search</button>
            <button type="button" onClick={resetFilters} className="w-full py-3 rounded-lg border border-yellow-400 text-yellow-400 font-semibold bg-white hover:bg-yellow-50">Reset</button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-[#777777] mb-4">Rent Properties</h2>
          <div className="grid grid-cols-1 gap-6">
            <Link to={`/rent/${rentProperty.id}`} className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-900 block group">
              <div className="relative">
                <img
                  src={tinyHome1}
                  alt={rentProperty.title}
                  className="w-full h-56 object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-[#F5A623] text-white text-sm font-medium px-4 py-1.5 rounded-lg shadow-sm">For Rent</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-col">
                  <div className="text-white text-2xl font-bold">{rentProperty.price} <span className="text-base font-medium">{rentProperty.priceUnit || '/mo'}</span></div>
                  <div className="text-white text-lg font-semibold tracking-wide">{rentProperty.title}</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      <section className="xl:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
          <p className="text-[#777777] font-medium">Search results</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1 px-2 rounded-md bg-white border-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option>Keyword</option>
              <option>Highest Price</option>
              <option>Lowest Price</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
          {sortedResults.map((item, idx) => (
            <Link to={`/property/${item.id}`} key={idx} className="block group">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow h-full">
                <div className="relative">
                  <img src={[tinyHome14, tinyHome15][idx] || tinyHome1} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-[#F5A623] text-white text-sm font-medium px-4 py-1.5 rounded-lg shadow-sm">Sale</span>
                  <button type="button" className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-black/50 backdrop-blur text-white flex items-center justify-center z-10 hover:bg-black/70">
                    <Heart className="h-5 w-5" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 text-white text-2xl font-bold">{item.price}</div>
                </div>
                <div className="p-6">
                  <div className="text-gray-900 font-semibold text-lg group-hover:text-yellow-600 transition-colors mb-3">{item.title}</div>
                  <div className="space-y-3 text-base">
                    <div className="flex items-center gap-6">
                      <span><span className="text-gray-500 font-semibold">State:</span> <span className="text-gray-500">{item.state}</span></span>
                      <span><span className="text-gray-500 font-semibold">City:</span> <span className="text-gray-500">{item.city}</span></span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-semibold">Address:</span> <span className="text-gray-500">{item.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 pt-8 pb-4">
          <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#F5A623] text-white font-medium flex items-center justify-center shadow-md">1</button>
          <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </section>
    </div>
  )
}
