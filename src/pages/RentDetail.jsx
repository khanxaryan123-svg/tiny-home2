import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Mail, Phone, User as UserIcon, Ruler, Home, Calendar, Building2, Users, Bed, CookingPot, ListChecks, Facebook, Linkedin, MessageCircle, PencilRuler, X, Wind, Fan, Armchair, Trees, Hammer, WashingMachine, Refrigerator, Utensils, Factory, Square, Sofa, Library, Heater, AirVent, Frame, ChefHat, Bus, Container, BedDouble, IdCard, Heart, Play } from 'lucide-react'
import tinyHome1 from './tiny home 1.jpg'
import tinyHome2 from './tiny home 2.jpg'
import tinyHome3 from './tiny home 3.jpg'
import tinyHome4 from './tiny home 4.jpg'
import tinyHome5 from './tiny home 5.jpg'
import tinyHome6 from './tiny home 6.jpg'
import tinyHome7 from './tiny home 7.jpg'
import tinyHome8 from './tiny home 8.jpg'
import tinyHome9 from './tiny home 9.jpg'
import tinyHome10 from './tiny home 10.jpg'
import tinyHome11 from './tiny home 11.jpg'
import tinyHome12 from './tiny home 12.jpg'
import tinyHome13 from './tiny home 13.jpg'
import rentDetailData from '../data/rentDetail.json'
import tinyHomesData from '../data/tinyHomes.json'


export default function RentDetail() {
  const { id } = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const data = rentDetailData.find(item => item.id === id) || rentDetailData[0]
  
  const allImages = [
    tinyHome1, tinyHome2, tinyHome3, tinyHome4, tinyHome5, 
    tinyHome6, tinyHome7, tinyHome8, tinyHome9, tinyHome10,
    tinyHome11, tinyHome12, tinyHome13
  ]
  
  // Get similar homes (first 3 from tinyHomesData)
  const similarHomes = tinyHomesData.slice(0, 3)

  const amenityIcons = {
    "Convertible Furniture": Sofa,
    "Built-in Cabinets and Shelving": Library,
    "Tankless Water Heater": Heater,
    "Mini Split HVAC": AirVent,
    "Ceiling Fans": Fan,
    "Living Space": Armchair,
    "Lawns": Trees, // Closest to Mower if Mower doesn't exist, checking next
    "Metal roof": Factory, // Chimney look
    "Wood Frame": Frame,
    "Washer Dryer Hookups": WashingMachine,
    "Full size kitchen": ChefHat,
    "Full size refrigerator": Refrigerator
  }

  return (
    <div className="flex flex-col gap-12 pb-12 pt-8">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
          <img src={tinyHome1} alt={data.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <button className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors backdrop-blur-sm">
            <Heart className="h-6 w-6" />
          </button>
        </div>

        {/* Right Side Grid */}
        <div className="flex flex-col gap-4 h-[400px] md:h-[500px]">
          {/* Top Video/Image */}
          <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer">
            <img src={tinyHome2} alt="Property Video" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 bg-[#F5A623]/30 rounded-full animate-pulse"></div>
                <div className="relative w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center text-white pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Thumbnails */}
          <div className="grid grid-cols-3 gap-4 h-1/3">
            <div className="rounded-xl overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
              <img src={tinyHome3} alt="Interior view 1" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
              <img src={tinyHome4} alt="Interior view 2" className="w-full h-full object-cover" />
            </div>
            <div 
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setShowGallery(true)}
            >
              <img src={tinyHome5} alt="More photos" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium text-lg backdrop-blur-[2px] group-hover:bg-black/60 transition-colors">
                +8 more
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-12">
        <div className="xl:col-span-3 space-y-8">
          {/* Header Info */}
          <div className="space-y-2">
            <div>
               <span className="bg-[#FFF5E6] text-[#FFA500] px-4 py-1.5 rounded-md font-medium text-sm inline-block mb-2">Rent</span>
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <h1 className="text-4xl font-normal text-[#333333] tracking-tight uppercase">{data.title}</h1>
                 <div className="text-3xl font-bold text-[#333333]">
                    {data.price} <span className="text-xl text-gray-500 font-normal">{data.priceUnit}</span>
                 </div>
               </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="h-5 w-5 text-[#333333]" />
              <span className="text-base text-gray-500">{data.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            {isExpanded ? (
              data.description.map((d, i) => <p key={i}>{d}</p>)
            ) : (
              <p>{data.description[0]}</p>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#FFA500] font-medium hover:underline text-sm"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>

          <div className="pt-4 flex items-center gap-6">
            <span className="text-gray-600 font-medium text-lg">Share</span>
            <div className="flex gap-2">
              <a className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 shadow-sm" href="#" aria-label="Share on Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 shadow-sm" href="#" aria-label="Share on LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 shadow-sm" href="#" aria-label="Share on WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <aside className="xl:col-span-2">
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-lg sticky top-24">
            <h2 className="text-2xl font-normal text-[#333333] mb-6">Home Listed By</h2>
            <hr className="border-gray-100 mb-8" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden flex-shrink-0 text-white">
                   <UserIcon className="w-10 h-10" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-600 text-base flex items-center gap-2">
                    <UserIcon className="h-4 w-4" /> <span>{data.listedBy.name}</span>
                  </div>
                  <div className="text-gray-500 flex items-center gap-2"><Mail className="h-4 w-4" /> <span>{data.listedBy.email}</span></div>
                  <div className="text-gray-500 flex items-center gap-2"><Phone className="h-4 w-4" /> <span>{data.listedBy.phone}</span></div>
                  <div className="text-gray-500 flex items-center gap-2"><UserIcon className="h-4 w-4" /> <span>{data.listedBy.id}</span></div>
                </div>
              </div>
              <button type="button" className="bg-[#F5A623] hover:bg-[#E09612] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors shadow-sm whitespace-nowrap">View My Listings</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.03)]">
          <h3 className="text-2xl font-semibold text-gray-900">Home Amenities</h3>
          <hr className="border-gray-100 my-6" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm flex flex-col items-center justify-center gap-3 h-32 hover:shadow-md transition-shadow">
               <Bed className="h-6 w-6 text-gray-400" />
               <div className="text-gray-600 text-sm font-medium leading-tight">Convertible Furniture</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm flex flex-col items-center justify-center gap-3 h-32 hover:shadow-md transition-shadow">
               <ListChecks className="h-6 w-6 text-gray-400" />
               <div className="text-gray-600 text-sm font-medium leading-tight">Built-in Cabinets and Shelving</div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm flex flex-col items-center justify-center gap-3 h-32 hover:shadow-md transition-shadow">
               <CookingPot className="h-6 w-6 text-gray-400" />
               <div className="text-gray-600 text-sm font-medium leading-tight">Tankless Water Heater</div>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={() => setShowAllAmenities(true)} className="text-[#F5A623] font-medium hover:underline flex items-center gap-1">View all amenities <span className="text-xl">→</span></button>
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.03)]">
          <h3 className="text-2xl font-semibold text-gray-900">Home Details</h3>
          <hr className="border-gray-100 my-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            <div className="flex items-start gap-4">
              <PencilRuler className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Property Size :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.propertySize}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Home className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Property Type :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.propertyType}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Ruler className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Dimensions :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.dimensions}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Calendar className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Year :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.year}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Container className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Make :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.make}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Bus className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Model :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.model}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BedDouble className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Sleeps :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.sleeps}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CookingPot className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Kitchen :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.kitchen}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Bed className="h-6 w-6 text-gray-500 mt-1" />
              <div>
                <div className="text-gray-500 text-sm mb-1">Beds :</div>
                <div className="font-bold text-gray-900 text-lg">{data.details.beds}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <iframe
          title="Property Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(data.location)}&t=k&output=embed`}
          className="w-full h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <section>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Similar Tiny Homes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarHomes.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative">
                <img src={tinyHome1} alt={item.title} className="w-full h-40 object-cover" />
                <span className="absolute top-3 left-3 bg-[#F5A623] text-white text-xs font-medium px-3 py-1 rounded-md shadow-sm">Sale</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-2xl font-bold">{item.price}</div>
              </div>
              <div className="p-4">
                <div className="text-yellow-600 text-sm font-medium mb-1">{item.modelLabel}</div>
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
                <div className="mt-3 text-sm"><span className="text-yellow-600 font-medium">Agent:</span> <span className="text-gray-800">{item.agent}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full h-full max-w-7xl relative flex flex-col">
            <button 
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 backdrop-blur-md"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {allImages.map((img, idx) => (
                   <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-lg group">
                     <img src={img} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {showAllAmenities && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAllAmenities(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
            
            <div className="p-8">
              <h2 className="text-3xl font-normal text-center text-gray-800 mb-12">All Amenities</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.amenities.map((amenity, idx) => {
                  const Icon = amenityIcons[amenity] || ListChecks
                  return (
                    <div key={idx} className="bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center hover:shadow-md transition-shadow h-40">
                      <Icon className="h-8 w-8 text-gray-400" strokeWidth={1.5} />
                      <span className="text-gray-700 font-medium text-lg">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
