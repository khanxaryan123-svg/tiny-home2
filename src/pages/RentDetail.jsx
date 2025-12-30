import { MapPin, Mail, Phone, User as UserIcon, Ruler, Home, Calendar, Building2, Users, Bed, CookingPot, ListChecks, Facebook, Linkedin, MessageCircle } from 'lucide-react'
import tinyHome1 from './tiny home 1.jpg'
import tinyHome2 from './tiny home 2.jpg'
import tinyHome3 from './tiny home 3.jpg'
import tinyHome4 from './tiny home 4.jpg'
import tinyHome5 from './tiny home 5.jpg'
import rentDetailData from '../data/rentDetail.json'
 

export default function RentDetail() {
  const data = rentDetailData
  return (
    <div className="space-y-8">
      {/* Image Gallery & Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] md:h-[500px]">
        {/* Main Image with Hero Overlay */}
        <div className="h-full relative rounded-xl overflow-hidden group">
          <img src={tinyHome1} alt="Main view" className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
             <span className="bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-md shadow-sm">Rent</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-baseline gap-2 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
            </div>
            <div className="text-2xl font-semibold opacity-90">{data.price} <span className="text-lg font-normal">{data.priceUnit}</span></div>
            <div className="flex items-center gap-2 mt-2 text-gray-200 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{data.location}</span>
            </div>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-rows-2 gap-4 h-full">
          <div className="h-full rounded-xl overflow-hidden">
            <img src={tinyHome2} alt="Side view" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4 h-full">
            <img src={tinyHome3} alt="Thumbnail 1" className="w-full h-full object-cover rounded-xl" />
            <img src={tinyHome4} alt="Thumbnail 2" className="w-full h-full object-cover rounded-xl" />
            <div className="relative h-full">
              <img src={tinyHome5} alt="Thumbnail 3" className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:bg-black/40 transition-colors">
                +9 more
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="space-y-4 text-[#777777] leading-relaxed text-lg">
            {data.description.map((d, i) => (<p key={i}>{d}</p>))}
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm border-b border-gray-100 pb-6">
            <span className="text-gray-600 font-medium">Share this home:</span>
            <div className="flex gap-2">
              <a className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-yellow-50 hover:border-yellow-200 transition-all text-gray-600 hover:text-yellow-600" href="#" aria-label="Share on Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-yellow-50 hover:border-yellow-200 transition-all text-gray-600 hover:text-yellow-600" href="#" aria-label="Share on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-yellow-50 hover:border-yellow-200 transition-all text-gray-600 hover:text-yellow-600" href="#" aria-label="Share on WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Home Listed By</h2>
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200" />
              <div className="space-y-2 text-[#777777]">
                <div className="flex items-center gap-2"><UserIcon className="h-5 w-5" /><span>{data.listedBy.name}</span></div>
                <div className="flex items-center gap-2"><Mail className="h-5 w-5" /><span>{data.listedBy.email}</span></div>
                <div className="flex items-center gap-2"><Phone className="h-5 w-5" /><span>{data.listedBy.phone}</span></div>
                <div className="flex items-center gap-2"><span className="text-gray-500">ID</span><span>{data.listedBy.id}</span></div>
              </div>
            </div>
            <button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-medium">View My Listings</button>
          </div>
        </aside>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-gray-900">Home Amenities</h3>
          <hr className="border-gray-200 my-4" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {data.amenities.map((a, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                <ListChecks className="mx-auto h-6 w-6 text-gray-500" />
                <div className="mt-2 text-gray-800 text-sm">{a}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a href="#" className="text-yellow-600 font-semibold">View all amenities →</a>
          </div>
        </section>

        <section className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-gray-900">Home Details</h3>
          <hr className="border-gray-200 my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Ruler className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Property Size :</div>
                <div className="font-semibold text-gray-900">{data.details.propertySize}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Property Type :</div>
                <div className="font-semibold text-gray-900">{data.details.propertyType}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Ruler className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Dimensions :</div>
                <div className="font-semibold text-gray-900">{data.details.dimensions}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Year :</div>
                <div className="font-semibold text-gray-900">{data.details.year}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Make :</div>
                <div className="font-semibold text-gray-900">{data.details.make}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ListChecks className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Model :</div>
                <div className="font-semibold text-gray-900">{data.details.model}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Sleeps :</div>
                <div className="font-semibold text-gray-900">{data.details.sleeps}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CookingPot className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Kitchen :</div>
                <div className="font-semibold text-gray-900">{data.details.kitchen}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bed className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-gray-600">Beds :</div>
                <div className="font-semibold text-gray-900">{data.details.beds}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden">
        <iframe
          title="Property Map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(data.location)}&t=k&output=embed`}
          className="w-full h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <section className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Similar Tiny Homes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            price: '$52,800.00',
            badge: 'Sale',
            model: "Model: 20'",
            title: "ALT 20' Container Tiny House",
            location: '6500 West Richmar Avenue, Las Vegas, NV, USA',
            beds: 1,
            sleeps: 2,
            kitchen: 1,
            agent: 'Trypto Business Solutions',
            image: tinyHome1,
          }, {
            price: '$90,200.00',
            badge: 'Sale',
            model: "Model: 40'",
            title: "ALT 40' Container Tiny House",
            location: '6500 West Richmar Avenue, Las Vegas, NV, USA',
            beds: 2,
            sleeps: 4,
            kitchen: 1,
            agent: 'Trypto Business Solutions',
            image: tinyHome1,
          }, {
            price: '$33,000.00',
            badge: 'Sale',
            model: 'Model: Boneyard',
            title: 'Mendo Tiny Homes - Boneyard Shell',
            location: 'Ukiah, CA, USA',
            beds: 1,
            sleeps: 2,
            kitchen: 1,
            agent: 'Trypto Business Solutions',
            image: tinyHome1,
          }].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                <span className="absolute top-3 left-3 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md">{item.badge}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-2xl font-bold">{item.price}</div>
              </div>
              <div className="p-4">
                <div className="text-yellow-600 text-sm font-medium mb-1">{item.model}</div>
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
    </div>
  )
}
