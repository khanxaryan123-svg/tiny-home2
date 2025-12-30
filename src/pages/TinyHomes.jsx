import { Search, Heart, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import tinyHome1 from './tiny home 1.jpg'
import tinyHomesData from '../data/tinyHomes.json'
import CustomSelect from '../components/CustomSelect'

export default function TinyHomes() {
  const [keyword, setKeyword] = useState('')
  const [propertyFor, setPropertyFor] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [propertySize, setPropertySize] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [beds, setBeds] = useState('')
  const [sleeps, setSleeps] = useState('')
  const [results, setResults] = useState([])
  const [sortBy, setSortBy] = useState('Keyword')
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false)
  const [amenities, setAmenities] = useState({
    convertibleFurniture: false,
    compactKitchen: false,
    miniFridge: false,
    inductionCooktop: false,
    compactOvenMicrowave: false,
    builtInCabinetsShelving: false,
    tanklessWaterHeater: false,
    underfloorStorage: false,
    miniSplitHVAC: false,
    ceilingFans: false,
    livingSpace: false,
    commonRoom: false,
    lawns: false,
    lawnGarden: false,
    storageExtraSection: false,
    awning: false,
    keylessEntry: false,
    metalRoof: false,
    gooseneckTrailer: false,
    steelFrame: false,
    stairs: false,
    solarPanels: false,
    loftBed: false,
    washerDryer: false,
    offGrid: false,
  })

  const toggleAmenity = (key) =>
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }))

  const resetFilters = () => {
    setKeyword('')
    setPropertyFor('')
    setPrice('')
    setType('')
    setPropertySize('')
    setZipcode('')
    setBeds('')
    setSleeps('')
    setAmenities({
      convertibleFurniture: false,
      compactKitchen: false,
      miniFridge: false,
      inductionCooktop: false,
      compactOvenMicrowave: false,
      builtInCabinetsShelving: false,
      tanklessWaterHeater: false,
      underfloorStorage: false,
      miniSplitHVAC: false,
      ceilingFans: false,
      livingSpace: false,
      commonRoom: false,
      lawns: false,
      lawnGarden: false,
      storageExtraSection: false,
      awning: false,
      keylessEntry: false,
      metalRoof: false,
      gooseneckTrailer: false,
      steelFrame: false,
      stairs: false,
      solarPanels: false,
      loftBed: false,
      washerDryer: false,
      offGrid: false,
    })
  }

  useEffect(() => {
    setResults(tinyHomesData)
  }, [])

  const amenityOptions = [
    ['convertibleFurniture','Convertible Furniture'],
    ['compactKitchen','Compact Kitchen'],
    ['miniFridge','Mini Fridge'],
    ['inductionCooktop','Induction Cooktop'],
    ['compactOvenMicrowave','Compact Oven or Microwave'],
    ['builtInCabinetsShelving','Built-in Cabinets and Shelving'],
    ['tanklessWaterHeater','Tankless Water Heater'],
    ['underfloorStorage','Underfloor Storage'],
    ['miniSplitHVAC','Mini Split HVAC'],
    ['ceilingFans','Ceiling Fans'],
    ['livingSpace','Living Space'],
    ['commonRoom','Common Room'],
    ['lawns','Lawns'],
    ['lawnGarden','Lawn Garden'],
    ['storageExtraSection','Storage Extra Section'],
    ['awning','Awning'],
    ['keylessEntry','Keyless Entry'],
    ['metalRoof','Metal roof'],
    ['gooseneckTrailer','Gooseneck Trailer'],
    ['steelFrame','Steel Frame'],
    ['stairs','Stairs'],
    ['solarPanels','Solar Panels'],
    ['loftBed','Loft Bed'],
    ['washerDryer','Washer/Dryer'],
    ['offGrid','Off-grid'],
  ]

  const toNum = (p) => Number(p.replace(/[^0-9.]/g, ''))
  const filteredResults = results.filter((item) => {
    const text = `${item.title} ${item.modelLabel} ${item.location}`.toLowerCase()
    const keywordOk = keyword ? text.includes(keyword.toLowerCase()) : true
    const propertyOk = propertyFor ? item.propertyFor === propertyFor : true
    const typeOk = type ? item.type === type : true
    const bedsOk = beds ? item.beds === Number(beds) : true
    const sleepsOk = sleeps ? item.sleeps === Number(sleeps) : true
    const priceNum = toNum(item.price)
    let priceOk = true
    if (price === 'Under $50,000') priceOk = priceNum < 50000
    else if (price === '$50,000 - $100,000') priceOk = priceNum >= 50000 && priceNum <= 100000
    else if (price === '$100,000 - $150,000') priceOk = priceNum > 100000 && priceNum <= 150000
    else if (price === '$150,000+') priceOk = priceNum > 150000
    return keywordOk && propertyOk && typeOk && bedsOk && sleepsOk && priceOk
  })

  const keywordScore = (item) => {
    if (!keyword) return 0
    const k = keyword.toLowerCase()
    const title = item.title.toLowerCase()
    const text = `${item.title} ${item.modelLabel} ${item.location}`.toLowerCase()
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span> / </span>
          <span className="text-yellow-600 font-medium">Tiny Homes</span>
        </div>
      </div>

      <div className="lg:col-span-3">
        <h1 className="text-3xl font-semibold text-black">Tiny Homes</h1>
      </div>

      <aside className="lg:col-span-1">
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
            <label className="block text-sm font-medium text-[#777777] mb-2">Property For</label>
            <CustomSelect
              value={propertyFor}
              onChange={setPropertyFor}
              options={['Sale', 'Rent', 'Auction']}
              placeholder="Property For"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Price ($)</label>
            <CustomSelect
              value={price}
              onChange={setPrice}
              options={['Under $50,000', '$50,000 - $100,000', '$100,000 - $150,000', '$150,000+']}
              placeholder="Select Price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Property Type</label>
            <CustomSelect
              value={type}
              onChange={setType}
              options={['Tiny home', 'Container home', 'Modular home']}
              placeholder="Property Type"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Property Size (SqFt)</label>
            <CustomSelect
              value={propertySize}
              onChange={setPropertySize}
              options={['≤ 200', '200 – 400', '400 – 600', '600+']}
              placeholder="Property Size"
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

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Number of Beds</label>
            <CustomSelect
              value={beds}
              onChange={setBeds}
              options={['1', '2', '3', '4', '5+']}
              placeholder="Number of Beds"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#777777] mb-2">Number of Sleeps</label>
            <CustomSelect
              value={sleeps}
              onChange={setSleeps}
              options={['1', '2', '3', '4', '5+']}
              placeholder="Number of Sleeps"
            />
          </div>

          <div>
            <div className="text-sm font-medium text-[#777777] mb-2">Amenities</div>
            <div className="space-y-2 text-sm">
              {(amenitiesExpanded ? amenityOptions : amenityOptions.slice(0,3)).map(([key,label]) => (
                <label key={key} className="flex items-center gap-2 text-[#777777]">
                  <input type="checkbox" checked={amenities[key]} onChange={() => toggleAmenity(key)} className="rounded" />
                  {label}
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setAmenitiesExpanded(!amenitiesExpanded)}
              className="mt-2 text-sm font-semibold text-yellow-600"
            >
              {amenitiesExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button type="button" className="w-full py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold shadow-sm">Search</button>
            <button type="button" onClick={resetFilters} className="w-full py-3 rounded-lg border border-yellow-400 text-yellow-400 font-semibold bg-white hover:bg-yellow-50">Reset</button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-[#777777] mb-4">Rent Properties</h2>
          <div className="grid grid-cols-1 gap-6">
            <Link to="/rent/true-north" className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-900 block">
              <div className="relative">
                <img
                  src={tinyHome1}
                  alt="TRUE NORTH"
                  className="w-full h-56 object-cover opacity-90"
                />
                <span className="absolute top-4 left-4 bg-yellow-400 text-white text-sm font-medium px-3 py-1 rounded-md">For Rent</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-col">
                  <div className="text-white text-2xl font-bold">$220.00 <span className="text-base font-medium">/mo</span></div>
                  <div className="text-white text-lg font-semibold tracking-wide">TRUE NORTH</div>
                </div>
              </div>
            </Link>
          </div>
          
        </div>
      </aside>

      <section className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
          <p className="text-[#777777] font-medium">Search results</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1 px-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option>Keyword</option>
              <option>Highest Price</option>
              <option>Lowest Price</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedResults.map((item, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
              <div className="relative">
                <img src={tinyHome1} alt={item.title} className="w-full h-48 object-cover" />
                <span className="absolute top-3 left-3 bg-yellow-300 text-gray-900 text-xs font-semibold px-3 py-1 rounded-md">Sale</span>
                <button type="button" className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-black/50 backdrop-blur text-white flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-2xl font-bold">{item.price}</div>
              </div>
              <div className="p-4">
                <div className="text-yellow-600 text-sm font-medium mb-1">
                  Model: <span className="font-semibold uppercase">{item.modelLabel}</span>
                </div>
                <div className="text-gray-900 font-semibold">{item.title}</div>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
                <div className="mt-3 flex items-center gap-6 text-sm text-gray-800">
                  <span>Beds: {item.beds}</span>
                  <span>Sleeps: {item.sleeps}</span>
                  <span>Kitchen: {item.kitchen}</span>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-3 text-sm">
                  <span className="text-yellow-600 font-medium">Listed by:</span>
                  <span className="ml-1 text-gray-800">{item.agent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
