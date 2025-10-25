import React, { useState, useEffect } from 'react';
import { Search, MapPin, Train, Plane, Bus, Car, Ship, Menu, X, User, LogOut, History, Clock, Star, Phone, Mail, Facebook, Twitter, Instagram, Utensils, Bike } from 'lucide-react';

const IndianTravelWebsite = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTransportOptions, setShowTransportOptions] = useState(false);
  const [showFoodOptions, setShowFoodOptions] = useState(false);
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    transportType: ''
  });

  // Add search debouncing
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const destinations = [
    {
      id: 1,
      name: "Taj Mahal",
      state: "Uttar Pradesh",
      city: "Agra",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      rating: 4.9,
      history: "Built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal between 1631-1653. This ivory-white marble mausoleum is a UNESCO World Heritage Site and one of the Seven Wonders of the World.",
      transport: {
        train: "Agra Cantt Railway Station - Connected to all major cities",
        flight: "Agra Airport (Kheria) - Domestic flights from major cities",
        bus: "Regular buses from Delhi, Jaipur, Mathura",
        car: "Via Yamuna Expressway from Delhi (3-4 hours)",
        other: "Auto-rickshaws, cycle-rickshaws available"
      },
      streetFood: [
        { name: "Petha", description: "Sweet candy made from ash gourd", price: "₹50-100" },
        { name: "Mughlai Paratha", description: "Stuffed flatbread with minced meat", price: "₹80-150" },
        { name: "Bedai & Jalebi", description: "Fried bread with spicy potato and sweet jalebi", price: "₹60-120" }
      ]
    },
    {
      id: 2,
      name: "Gateway of India",
      state: "Maharashtra",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
      rating: 4.7,
      history: "Constructed in 1924 to commemorate King George V and Queen Mary's visit to Mumbai in 1911. Built in Indo-Saracenic architectural style.",
      transport: {
        train: "Chhatrapati Shivaji Terminus (CST) is 3 km away",
        flight: "Chhatrapati Shivaji Maharaj International Airport - 26 km",
        bus: "BEST buses from all Mumbai areas",
        car: "Via Marine Drive, Worli Sea Link",
        other: "Ferry services to Elephanta Caves"
      },
      streetFood: [
        { name: "Vada Pav", description: "Spicy potato fritter in bun", price: "₹20-40" },
        { name: "Pav Bhaji", description: "Spicy vegetable curry with buttered buns", price: "₹60-120" },
        { name: "Bhel Puri", description: "Puffed rice with chutneys and vegetables", price: "₹30-60" }
      ]
    },
    {
      id: 3,
      name: "Hawa Mahal",
      state: "Rajasthan",
      city: "Jaipur",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      rating: 4.6,
      history: "Built in 1799 by Maharaja Sawai Pratap Singh, designed by architect Lal Chand Ustad. The 5-story palace features 953 small windows.",
      transport: {
        train: "Jaipur Junction Railway Station - 3 km away",
        flight: "Jaipur International Airport - 13 km away",
        bus: "RSRTC buses from all major cities",
        car: "Well-connected by road from Delhi",
        other: "Auto-rickshaws, cycle-rickshaws available"
      },
      streetFood: [
        { name: "Pyaaz Kachori", description: "Fried pastry stuffed with spiced onions", price: "₹40-80" },
        { name: "Ghewar", description: "Sweet disc-shaped dessert", price: "₹100-200" },
        { name: "Laal Maas", description: "Spicy mutton curry", price: "₹200-400" }
      ]
    }
  ];

  const indianStates = [
    "All States", "Uttar Pradesh", "Maharashtra", "Rajasthan", "Punjab", "Delhi", 
    "Karnataka", "West Bengal", "Tamil Nadu", "Madhya Pradesh", "Kerala", "Goa", 
    "Gujarat", "Jammu & Kashmir", "Assam", "Uttarakhand", "Telangana", "Ladakh"
  ];

  const transportProviders = {
    train: [
      { name: "Indian Railways", price: "₹500-2000", duration: "Varies", type: "Train" },
      { name: "Gatiman Express", price: "₹800-1500", duration: "2-6 hours", type: "Train" },
      { name: "Rajdhani Express", price: "₹1200-3000", duration: "Overnight", type: "Train" }
    ],
    flight: [
      { name: "Air India", price: "₹2000-8000", duration: "1-3 hours", type: "Flight" },
      { name: "IndiGo", price: "₹1500-6000", duration: "1-3 hours", type: "Flight" },
      { name: "SpiceJet", price: "₹1800-6500", duration: "1-3 hours", type: "Flight" }
    ],
    bus: [
      { name: "UPSRTC", price: "₹300-1200", duration: "4-8 hours", type: "Bus" },
      { name: "RSRTC", price: "₹400-1500", duration: "4-8 hours", type: "Bus" },
      { name: "Private Volvo", price: "₹800-2000", duration: "4-8 hours", type: "Bus" }
    ],
    car: [
      { name: "Ola Outstation", price: "₹10-15/km", duration: "Flexible", type: "Car" },
      { name: "Uber Intercity", price: "₹12-18/km", duration: "Flexible", type: "Car" },
      { name: "Self Drive Car", price: "₹1500-3000/day", duration: "Flexible", type: "Car" }
    ],
    bike: [
      { name: "Royal Enfield", price: "₹800-1500/day", duration: "Flexible", type: "Bike" },
      { name: "Bike Rental", price: "₹500-1000/day", duration: "Flexible", type: "Bike" }
    ],
    other: [
      { name: "Local Taxi", price: "₹200-500/day", duration: "Flexible", type: "Taxi" },
      { name: "Auto Rickshaw", price: "₹50-200/trip", duration: "Flexible", type: "Auto" }
    ]
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         dest.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         dest.state.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesState = selectedState === 'all' || dest.state === selectedState;
    return matchesSearch && matchesState;
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleTransportBooking = (provider) => {
    alert(`Booking confirmed!\n\nService: ${provider.name}\nPrice: ${provider.price}\nDuration: ${provider.duration}\n\nFrom: ${bookingData.from}\nTo: ${bookingData.to}\nDate: ${bookingData.date}\nPassengers: ${bookingData.passengers}`);
    setShowTransportOptions(false);
  };

  const handleFoodOrder = (foodItem) => {
    alert(`Order placed!\n\nItem: ${foodItem.name}\nDescription: ${foodItem.description}\nPrice: ${foodItem.price}\n\nYour order will be delivered to your location near the monument.`);
  };

  const TransportBookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Book Your Journey</h3>
            <button
              onClick={() => setShowTransportOptions(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">From</label>
              <input
                type="text"
                value={bookingData.from}
                onChange={(e) => setBookingData({...bookingData, from: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your current city"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">To</label>
              <input
                type="text"
                value={bookingData.to}
                onChange={(e) => setBookingData({...bookingData, to: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Destination city"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Date</label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Passengers</label>
              <select
                value={bookingData.passengers}
                onChange={(e) => setBookingData({...bookingData, passengers: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(transportProviders).map(([mode, providers]) => (
              <div key={mode} className="border rounded-lg">
                <div className="bg-gray-50 p-4 border-b">
                  <h4 className="font-bold text-lg capitalize flex items-center">
                    <TransportIcon type={mode} />
                    <span className="ml-2">{mode === 'other' ? 'Local Transport' : `By ${mode}`}</span>
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  {providers.map((provider, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-orange-50 transition-colors">
                      <div>
                        <p className="font-semibold">{provider.name}</p>
                        <p className="text-sm text-gray-600">{provider.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{provider.price}</p>
                        <button
                          onClick={() => handleTransportBooking(provider)}
                          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const StreetFoodModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <Utensils className="mr-2 text-orange-600" />
              Famous Street Food
            </h3>
            <button
              onClick={() => setShowFoodOptions(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {selectedDestination?.streetFood?.map((food, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{food.name}</h4>
                    <p className="text-gray-600 mt-1">{food.description}</p>
                    <p className="text-green-600 font-semibold mt-2">{food.price}</p>
                  </div>
                  <button
                    onClick={() => handleFoodOrder(food)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <p className="text-orange-800 text-sm">
              💡 <strong>Pro Tip:</strong> Food will be delivered to your current location near {selectedDestination?.name}. 
              Perfect for enjoying local flavors while exploring!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* ... (same landing page code as before) ... */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MapPin className="text-orange-600" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Incredible India
              </span>
            </div>
            <button
              onClick={() => { setShowAuthModal(true); setAuthMode('login'); }}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-md"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-500 to-green-600 bg-clip-text text-transparent">
            Discover Incredible India
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Explore every corner of India - from majestic monuments to hidden gems, experience the rich heritage and diverse culture of our nation
          </p>
          
          <button
            onClick={() => { setShowAuthModal(true); setAuthMode('login'); }}
            className="mt-12 bg-gradient-to-r from-orange-600 to-green-600 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:from-orange-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Exploring Now
          </button>
        </div>
      </div>
    </div>
  );

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <MapPin className="text-orange-600 mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-bold text-gray-800">
            {authMode === 'login' ? 'Welcome Back' : 'Join Us'}
          </h2>
          <p className="text-gray-600 mt-2">
            {authMode === 'login' ? 'Sign in to continue exploring' : 'Create an account to start your journey'}
          </p>
        </div>

        <form onSubmit={authMode === 'login' ? handleLogin : handleSignup}>
          {authMode === 'signup' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-green-700 transition-all shadow-md"
          >
            {authMode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            {authMode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );

  const TransportIcon = ({ type }) => {
    const icons = {
      train: <Train size={20} className="text-blue-600" />,
      flight: <Plane size={20} className="text-purple-600" />,
      bus: <Bus size={20} className="text-green-600" />,
      car: <Car size={20} className="text-red-600" />,
      bike: <Bike size={20} className="text-orange-600" />,
      other: <Ship size={20} className="text-gray-600" />
    };
    return icons[type] || <Car size={20} className="text-gray-600" />;
  };

  const DestinationModal = ({ destination, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
        <div className="relative">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-64 object-cover rounded-t-2xl"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/800x400/FFA500/FFFFFF?text=${encodeURIComponent(destination.name)}`;
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-4xl font-bold text-white">{destination.name}</h2>
            <p className="text-white text-lg">{destination.city}, {destination.state}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <History className="mr-2 text-orange-600" size={28} />
                Historical Significance
              </h3>
              <div className="flex items-center">
                <Star className="text-yellow-500 fill-current mr-1" size={20} />
                <span className="font-bold text-lg">{destination.rating}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">{destination.history}</p>
          </div>

          {/* Transportation Options */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 text-green-600" size={28} />
              How to Reach
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              {Object.keys(destination.transport).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setBookingData({
                      ...bookingData,
                      to: destination.city,
                      transportType: mode
                    });
                    setShowTransportOptions(true);
                  }}
                  className="bg-white border-2 border-orange-200 rounded-xl p-4 text-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 transform hover:-translate-y-1 shadow-sm"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-100 p-3 rounded-lg mb-2">
                      <TransportIcon type={mode} />
                    </div>
                    <span className="font-semibold text-gray-800 capitalize text-sm">
                      {mode === 'other' ? 'Local' : mode}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Street Food Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Utensils className="mr-2 text-red-600" size={28} />
              Famous Street Food
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {destination.streetFood.slice(0, 2).map((food, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{food.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">{food.description}</p>
                      <p className="text-green-600 font-semibold mt-2">{food.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowFoodOptions(true)}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Utensils size={20} className="mr-2" />
              View All Food Options & Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MainWebsite = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MapPin className="text-orange-600" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Incredible India
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <User className="text-gray-600" size={20} />
              <span className="text-gray-700 font-medium">Welcome, Traveler</span>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center space-x-2 pb-3 border-b">
                <User className="text-gray-600" size={20} />
                <span className="text-gray-700 font-medium">Welcome, Traveler</span>
              </div>
              <button
                onClick={() => { setIsLoggedIn(false); setMobileMenuOpen(false); }}
                className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors w-full justify-center"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Explore Every Corner of India
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Search destinations, cities, or states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-xl text-lg focus:ring-4 focus:ring-orange-300 focus:outline-none shadow-lg border-0"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-4 rounded-xl text-lg focus:ring-4 focus:ring-orange-300 focus:outline-none shadow-lg border-0"
            >
              {indianStates.map(state => (
                <option key={state} value={state === 'All States' ? 'all' : state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white text-lg">
              <span className="font-bold">{filteredDestinations.length}</span> destinations found
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <div
              key={destination.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedDestination(destination)}
            >
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x600/FFA500/FFFFFF?text=${encodeURIComponent(destination.name)}`;
                  }}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center shadow-md">
                  <Star className="text-yellow-500 fill-current mr-1" size={16} />
                  <span className="font-bold">{destination.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin size={16} className="mr-2 text-orange-600" />
                  {destination.city}, {destination.state}
                </p>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {destination.history.substring(0, 150)}...
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    {Object.keys(destination.transport).slice(0, 4).map((mode) => (
                      <div key={mode} className="bg-orange-100 p-2 rounded-lg">
                        <TransportIcon type={mode} />
                      </div>
                    ))}
                  </div>
                  <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {!isLoggedIn ? <LandingPage /> : <MainWebsite />}
      {showAuthModal && <AuthModal />}
      {selectedDestination && (
        <DestinationModal 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}
      {showTransportOptions && <TransportBookingModal />}
      {showFoodOptions && <StreetFoodModal />}
    </div>
  );
};

export default IndianTravelWebsite;