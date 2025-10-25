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
      streetFood: [
        { name: "Petha", description: "Sweet candy made from ash gourd", price: "₹50-100" },
        { name: "Mughlai Paratha", description: "Stuffed flatbread with minced meat", price: "₹80-150" },
        { name: "Bedai & Jalebi", description: "Fried bread with spicy potato and sweet jalebi", price: "₹60-120" },
        { name: "Agra Ka Chaat", description: "Tangy street food with potatoes and chutneys", price: "₹40-80" }
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
      streetFood: [
        { name: "Vada Pav", description: "Spicy potato fritter in bun", price: "₹20-40" },
        { name: "Pav Bhaji", description: "Spicy vegetable curry with buttered buns", price: "₹60-120" },
        { name: "Bhel Puri", description: "Puffed rice with chutneys and vegetables", price: "₹30-60" },
        { name: "Sev Puri", description: "Crispy puris with potatoes and chutneys", price: "₹40-70" }
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
      streetFood: [
        { name: "Pyaaz Kachori", description: "Fried pastry stuffed with spiced onions", price: "₹40-80" },
        { name: "Ghewar", description: "Sweet disc-shaped dessert", price: "₹100-200" },
        { name: "Laal Maas", description: "Spicy mutton curry", price: "₹200-400" },
        { name: "Mirchi Vada", description: "Chili fritters with potato filling", price: "₹30-60" }
      ]
    },
    {
      id: 4,
      name: "Golden Temple",
      state: "Punjab",
      city: "Amritsar",
      image: "https://images.unsplash.com/photo-1580194896107-a21bacfca2b0?w=800",
      rating: 5.0,
      history: "Sri Harmandir Sahib, founded by Guru Ram Das in 1577 and completed by Guru Arjan Dev in 1604. The temple is built in marble with gold-plated copper.",
      streetFood: [
        { name: "Amritsari Kulcha", description: "Stuffed bread with chole", price: "₹80-150" },
        { name: "Lassi", description: "Sweet yogurt drink", price: "₹50-100" },
        { name: "Chole Bhature", description: "Spicy chickpeas with fried bread", price: "₹70-120" },
        { name: "Fish Amritsari", description: "Fried fish in gram flour batter", price: "₹150-250" }
      ]
    },
    {
      id: 5,
      name: "India Gate",
      state: "Delhi",
      city: "New Delhi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "A war memorial built in 1931, designed by Sir Edwin Lutyens. It commemorates 70,000 Indian soldiers who died during World War I.",
      streetFood: [
        { name: "Chole Bhature", description: "Spicy chickpeas with fried bread", price: "₹70-120" },
        { name: "Aloo Tikki", description: "Potato patties with chutneys", price: "₹40-80" },
        { name: "Dahi Bhalla", description: "Lentil dumplings in yogurt", price: "₹50-90" },
        { name: "Kathi Roll", description: "Wrap with fillings and sauces", price: "₹60-120" }
      ]
    },
    {
      id: 6,
      name: "Mysore Palace",
      state: "Karnataka",
      city: "Mysore",
      image: "https://images.unsplash.com/photo-1620766165109-36699c44c050?w=800",
      rating: 4.8,
      history: "Built between 1897-1912 by British architect Henry Irwin for the Wadiyar dynasty. The palace features ornate halls and intricate carvings.",
      streetFood: [
        { name: "Mysore Masala Dosa", description: "Crispy rice crepe with potato filling", price: "₹60-100" },
        { name: "Mysore Pak", description: "Sweet gram flour dessert", price: "₹80-150" },
        { name: "Bisi Bele Bath", description: "Spicy rice and lentil dish", price: "₹70-120" },
        { name: "Churmuri", description: "Puffed rice with spices", price: "₹20-40" }
      ]
    },
    {
      id: 7,
      name: "Qutub Minar",
      state: "Delhi",
      city: "New Delhi",
      image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800",
      rating: 4.7,
      history: "Construction began in 1199 by Qutb-ud-din Aibak and completed by his successor Iltutmish in 1220. Standing 72.5 meters tall.",
      streetFood: [
        { name: "Chaat", description: "Various savory snacks", price: "₹30-70" },
        { name: "Kulfi", description: "Traditional Indian ice cream", price: "₹40-80" },
        { name: "Samosa", description: "Fried pastry with potato filling", price: "₹20-40" },
        { name: "Jalebi", description: "Sweet spiral dessert", price: "₹50-100" }
      ]
    },
    {
      id: 8,
      name: "Victoria Memorial",
      state: "West Bengal",
      city: "Kolkata",
      image: "https://images.unsplash.com/photo-1591361796847-e7c8e94e0b5b?w=800",
      rating: 4.7,
      history: "Built between 1906-1921 in memory of Queen Victoria. Designed by William Emerson, it combines British, Mughal, and Venetian architectural styles.",
      streetFood: [
        { name: "Kathi Roll", description: "Wrap with fillings and sauces", price: "₹60-120" },
        { name: "Phuchka", description: "Crispy shells with tangy water", price: "₹20-40" },
        { name: "Mughlai Paratha", description: "Layered flatbread with egg", price: "₹50-100" },
        { name: "Rosogolla", description: "Sweet syrupy dessert", price: "₹40-80" }
      ]
    },
    {
      id: 9,
      name: "Ajanta Caves",
      state: "Maharashtra",
      city: "Aurangabad",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      rating: 4.9,
      history: "Dating from 2nd century BCE to 650 CE, these 30 rock-cut Buddhist cave monuments represent the finest ancient Indian art.",
      streetFood: [
        { name: "Misal Pav", description: "Spicy curry with bread", price: "₹50-90" },
        { name: "Poha", description: "Flattened rice breakfast", price: "₹30-60" },
        { name: "Sabudana Khichdi", description: "Tapioca pearls dish", price: "₹40-70" },
        { name: "Bhakri", description: "Traditional millet bread", price: "₹20-40" }
      ]
    },
    {
      id: 10,
      name: "Meenakshi Temple",
      state: "Tamil Nadu",
      city: "Madurai",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
      rating: 4.9,
      history: "Ancient temple rebuilt in 17th century during Nayak dynasty rule. Dedicated to Goddess Meenakshi and Lord Sundareshwar.",
      streetFood: [
        { name: "Kari Dosa", description: "Dosa with mutton filling", price: "₹80-150" },
        { name: "Kothu Parotta", description: "Shredded flatbread with meat", price: "₹70-130" },
        { name: "Jigarthanda", description: "Cooling milk drink", price: "₹40-80" },
        { name: "Mutton Chukka", description: "Dry mutton preparation", price: "₹120-200" }
      ]
    },
    {
      id: 11,
      name: "Hampi",
      state: "Karnataka",
      city: "Hampi",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
      rating: 4.8,
      history: "Capital of the Vijayanagara Empire (1336-1565 CE), one of the greatest Hindu kingdoms in Indian history.",
      streetFood: [
        { name: "Holige", description: "Sweet stuffed flatbread", price: "₹40-80" },
        { name: "Benne Dosa", description: "Butter dosa", price: "₹50-100" },
        { name: "Kharabath", description: "Semolina dish with vegetables", price: "₹40-70" },
        { name: "Maddur Vada", description: "Crispy savory snack", price: "₹30-60" }
      ]
    },
    {
      id: 12,
      name: "Jaisalmer Fort",
      state: "Rajasthan",
      city: "Jaisalmer",
      image: "https://images.unsplash.com/photo-1609138520812-17e62a2d3e42?w=800",
      rating: 4.7,
      history: "Built in 1156 CE by Rajput ruler Rawal Jaisal, it's one of the few living forts with 3,000 residents still residing within.",
      streetFood: [
        { name: "Ker Sangri", description: "Desert beans and berries dish", price: "₹80-150" },
        { name: "Dal Baati Churma", description: "Lentils with baked dough balls", price: "₹100-180" },
        { name: "Gatte Ki Sabzi", description: "Gram flour dumplings in gravy", price: "₹70-120" },
        { name: "Mohan Maas", description: "Royal meat preparation", price: "₹200-350" }
      ]
    },
    {
      id: 13,
      name: "Konark Sun Temple",
      state: "Odisha",
      city: "Konark",
      image: "https://images.unsplash.com/photo-1610200920742-6f71b84e3826?w=800",
      rating: 4.8,
      history: "Built in 13th century by King Narasimhadeva I of Eastern Ganga Dynasty. Designed as a colossal chariot of Sun God Surya.",
      streetFood: [
        { name: "Chhena Poda", description: "Burnt cheese dessert", price: "₹60-120" },
        { name: "Dalma", description: "Lentil and vegetable stew", price: "₹50-90" },
        { name: "Pakhala", description: "Fermented rice dish", price: "₹40-70" },
        { name: "Rasabali", description: "Sweet cheese patties", price: "₹50-100" }
      ]
    },
    {
      id: 14,
      name: "Varanasi Ghats",
      state: "Uttar Pradesh",
      city: "Varanasi",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
      rating: 4.9,
      history: "Varanasi is one of the world's oldest continuously inhabited cities with 88 ghats along the Ganges River.",
      streetFood: [
        { name: "Kachori Sabzi", description: "Fried bread with potato curry", price: "₹40-80" },
        { name: "Malaiyo", description: "Seasonal milk froth dessert", price: "₹50-100" },
        { name: "Tamatar Chaat", description: "Tomato-based street food", price: "₹30-60" },
        { name: "Laung Lata", description: "Sweet pastry", price: "₹20-40" }
      ]
    },
    {
      id: 15,
      name: "Red Fort",
      state: "Delhi",
      city: "New Delhi",
      image: "https://images.unsplash.com/photo-1597074866923-dc0589150560?w=800",
      rating: 4.7,
      history: "Built by Mughal Emperor Shah Jahan in 1648 when he shifted his capital from Agra to Delhi.",
      streetFood: [
        { name: "Nihari", description: "Slow-cooked meat stew", price: "₹120-200" },
        { name: "Kebabs", description: "Grilled meat skewers", price: "₹80-150" },
        { name: "Shahi Tukda", description: "Bread pudding dessert", price: "₹60-120" },
        { name: "Phirni", description: "Rice pudding", price: "₹50-100" }
      ]
    },
    {
      id: 16,
      name: "Amber Fort",
      state: "Rajasthan",
      city: "Jaipur",
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
      rating: 4.8,
      history: "Built in 1592 by Raja Man Singh I, this majestic fort blends Hindu and Mughal architecture with stunning mirror work.",
      streetFood: [
        { name: "Dal Baati Churma", description: "Traditional Rajasthani meal", price: "₹120-200" },
        { name: "Ghevar", description: "Sweet disc-shaped dessert", price: "₹80-150" },
        { name: "Mirchi Bada", description: "Chili fritters", price: "₹40-80" },
        { name: "Mawa Kachori", description: "Sweet fried pastry", price: "₹60-120" }
      ]
    },
    {
      id: 17,
      name: "Khajuraho Temples",
      state: "Madhya Pradesh",
      city: "Khajuraho",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "Famous for their nagara-style architectural symbolism and exquisite sculptures of gods, goddesses, and erotic art.",
      streetFood: [
        { name: "Poha", description: "Flattened rice breakfast", price: "₹30-60" },
        { name: "Jalebi", description: "Sweet spiral dessert", price: "₹40-80" },
        { name: "Samosa", description: "Fried pastry with filling", price: "₹20-40" },
        { name: "Bhutte Ka Kees", description: "Grated corn snack", price: "₹50-90" }
      ]
    },
    {
      id: 18,
      name: "Backwaters of Kerala",
      state: "Kerala",
      city: "Alleppey",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      rating: 4.9,
      history: "Network of 900 km of interconnected waterways, lakes, and lagoons along the Arabian Sea coast.",
      streetFood: [
        { name: "Appam with Stew", description: "Rice pancakes with curry", price: "₹80-150" },
        { name: "Puttu Kadala", description: "Steamed rice with chickpeas", price: "₹60-100" },
        { name: "Karimeen Pollichathu", description: "Pearl spot fish", price: "₹150-250" },
        { name: "Kerala Porotta", description: "Layered flatbread", price: "₹40-80" }
      ]
    },
    {
      id: 19,
      name: "Goa Beaches",
      state: "Goa",
      city: "Panaji",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      rating: 4.8,
      history: "Famous for its pristine beaches, Portuguese heritage, and vibrant nightlife along the Arabian Sea.",
      streetFood: [
        { name: "Fish Curry Rice", description: "Traditional Goan meal", price: "₹120-200" },
        { name: "Pork Vindaloo", description: "Spicy pork curry", price: "₹150-250" },
        { name: "Bebinca", description: "Layered Goan dessert", price: "₹80-150" },
        { name: "Chourico Pao", description: "Goan sausage with bread", price: "₹60-120" }
      ]
    },
    {
      id: 20,
      name: "Charminar",
      state: "Telangana",
      city: "Hyderabad",
      image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800",
      rating: 4.7,
      history: "Built in 1591 by Quli Qutb Shah, this iconic monument has four grand arches and stands as a symbol of Hyderabad.",
      streetFood: [
        { name: "Hyderabadi Biryani", description: "Fragrant rice with meat", price: "₹180-300" },
        { name: "Haleem", description: "Meat and lentil stew", price: "₹100-180" },
        { name: "Irani Chai", description: "Special tea", price: "₹20-40" },
        { name: "Double Ka Meetha", description: "Bread pudding dessert", price: "₹60-120" }
      ]
    },
    {
      id: 21,
      name: "Dal Lake",
      state: "Jammu & Kashmir",
      city: "Srinagar",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      rating: 4.9,
      history: "The 'Jewel in the crown of Kashmir' known for its houseboats, floating gardens, and shikara rides.",
      streetFood: [
        { name: "Rogan Josh", description: "Aromatic lamb curry", price: "₹150-250" },
        { name: "Gushtaba", description: "Meatballs in yogurt", price: "₹180-280" },
        { name: "Kashmiri Kahwa", description: "Traditional green tea", price: "₹30-60" },
        { name: "Sheermal", description: "Saffron-flavored bread", price: "₹40-80" }
      ]
    },
    {
      id: 22,
      name: "Ellora Caves",
      state: "Maharashtra",
      city: "Aurangabad",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      rating: 4.9,
      history: "34 rock-cut caves representing Buddhist, Hindu, and Jain monuments, showcasing religious harmony.",
      streetFood: [
        { name: "Biryani", description: "Fragrant rice dish", price: "₹120-200" },
        { name: "Kanda Bhaji", description: "Onion fritters", price: "₹30-60" },
        { name: "Sabudana Vada", description: "Tapioca fritters", price: "₹40-70" },
        { name: "Puran Poli", description: "Sweet flatbread", price: "₹50-90" }
      ]
    },
    {
      id: 23,
      name: "Lotus Temple",
      state: "Delhi",
      city: "New Delhi",
      image: "https://images.unsplash.com/photo-1586339277861-bc42f6a57e71?w=800",
      rating: 4.8,
      history: "Bahá'í House of Worship shaped like a lotus flower, open to all religions for meditation and prayer.",
      streetFood: [
        { name: "Chole Bhature", description: "Spicy chickpeas with bread", price: "₹70-120" },
        { name: "Aloo Chaat", description: "Potato snack", price: "₹40-70" },
        { name: "Dahi Bhalle", description: "Lentil dumplings", price: "₹50-90" },
        { name: "Kulfi Falooda", description: "Ice cream dessert", price: "₹80-150" }
      ]
    },
    {
      id: 24,
      name: "Kaziranga National Park",
      state: "Assam",
      city: "Bokakhat",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
      rating: 4.9,
      history: "Home to two-thirds of the world's great one-horned rhinoceros population and UNESCO World Heritage Site.",
      streetFood: [
        { name: "Assam Laksa", description: "Tangy fish soup", price: "₹80-150" },
        { name: "Pitha", description: "Rice cakes", price: "₹40-80" },
        { name: "Masor Tenga", description: "Sour fish curry", price: "₹120-200" },
        { name: "Tea", description: "Assam's famous tea", price: "₹20-40" }
      ]
    },
    {
      id: 25,
      name: "Mahabalipuram",
      state: "Tamil Nadu",
      city: "Mahabalipuram",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
      rating: 4.8,
      history: "7th-century port city of Pallava dynasty with rock-cut caves and monolithic temples.",
      streetFood: [
        { name: "Seafood Platter", description: "Fresh coastal seafood", price: "₹200-350" },
        { name: "Filter Coffee", description: "South Indian coffee", price: "₹30-60" },
        { name: "Murukku", description: "Rice snack", price: "₹50-100" },
        { name: "Pongal", description: "Rice and lentil dish", price: "₹60-110" }
      ]
    },
    {
      id: 26,
      name: "Rann of Kutch",
      state: "Gujarat",
      city: "Bhuj",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
      rating: 4.8,
      history: "World's largest salt desert that transforms into a white marvel during the Rann Utsav festival.",
      streetFood: [
        { name: "Kutchhi Dabeli", description: "Spicy potato burger", price: "₹30-60" },
        { name: "Ghotua", description: "Traditional snack", price: "₹40-80" },
        { name: "Methi Ka Thepla", description: "Fenugreek flatbread", price: "₹20-40" },
        { name: "Khaman", description: "Steamed snack", price: "₹40-70" }
      ]
    },
    {
      id: 27,
      name: "Sunderbans",
      state: "West Bengal",
      city: "Gosaba",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
      rating: 4.9,
      history: "Largest tidal mangrove forest in the world and home to the Royal Bengal Tiger.",
      streetFood: [
        { name: "Macher Jhol", description: "Fish curry", price: "₹100-180" },
        { name: "Chingri Malai Curry", description: "Prawn coconut curry", price: "₹150-250" },
        { name: "Misti Doi", description: "Sweet yogurt", price: "₹40-80" },
        { name: "Sandesh", description: "Sweet cheese dessert", price: "₹50-100" }
      ]
    },
    {
      id: 28,
      name: "Rishikesh",
      state: "Uttarakhand",
      city: "Rishikesh",
      image: "https://images.unsplash.com/photo-1590682680989-8b8b52e0c79f?w=800",
      rating: 4.8,
      history: "Yoga capital of the world situated on the banks of Ganges, gateway to the Himalayas.",
      streetFood: [
        { name: "Aloo Puri", description: "Potato curry with bread", price: "₹60-100" },
        { name: "Kachaudi", description: "Fried bread with filling", price: "₹40-80" },
        { name: "Bal Mithai", description: "Local sweet", price: "₹80-150" },
        { name: "Singodi", description: "Coconut sweet", price: "₹50-100" }
      ]
    },
    {
      id: 29,
      name: "Somnath Temple",
      state: "Gujarat",
      city: "Veraval",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      rating: 4.8,
      history: "One of the 12 Jyotirlinga shrines of Shiva, believed to be the first among them.",
      streetFood: [
        { name: "Dhokla", description: "Steamed snack", price: "₹40-80" },
        { name: "Khandvi", description: "Gram flour rolls", price: "₹50-90" },
        { name: "Fafda", description: "Crispy snack", price: "₹30-60" },
        { name: "Jalebi", description: "Sweet dessert", price: "₹40-80" }
      ]
    },
    {
      id: 30,
      name: "Leh-Ladakh",
      state: "Ladakh",
      city: "Leh",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      rating: 5.0,
      history: "High-altitude desert landscape with ancient monasteries and stunning mountain vistas.",
      streetFood: [
        { name: "Thukpa", description: "Noodle soup", price: "₹80-150" },
        { name: "Momos", description: "Steamed dumplings", price: "₹60-120" },
        { name: "Butter Tea", description: "Traditional salted tea", price: "₹30-60" },
        { name: "Skyu", description: "Traditional pasta", price: "₹70-130" }
      ]
    },
    {
      id: 31,
      name: "Sanchi Stupa",
      state: "Madhya Pradesh",
      city: "Sanchi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.6,
      history: "Oldest stone structure in India, originally commissioned by Emperor Ashoka in 3rd century BCE.",
      streetFood: [
        { name: "Poha", description: "Flattened rice", price: "₹30-60" },
        { name: "Jalebi", description: "Sweet spiral", price: "₹40-80" },
        { name: "Samosa", description: "Fried pastry", price: "₹20-40" },
        { name: "Bhutte Ka Kees", description: "Corn snack", price: "₹50-90" }
      ]
    },
    {
      id: 32,
      name: "Munnar",
      state: "Kerala",
      city: "Munnar",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "Popular hill station known for its tea plantations, lush green mountains, and cool climate.",
      streetFood: [
        { name: "Kerala Parotta", description: "Layered bread", price: "₹40-80" },
        { name: "Beef Fry", description: "Spicy beef", price: "₹120-200" },
        { name: "Appam", description: "Rice pancakes", price: "₹50-100" },
        { name: "Tea", description: "Local tea", price: "₹20-40" }
      ]
    },
    {
      id: 33,
      name: "Udaipur City Palace",
      state: "Rajasthan",
      city: "Udaipur",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "Largest royal complex in Rajasthan overlooking Lake Pichola, showcasing Rajput architecture.",
      streetFood: [
        { name: "Dal Baati Churma", description: "Traditional meal", price: "₹120-200" },
        { name: "Gatte Ki Sabzi", description: "Gram flour curry", price: "₹80-150" },
        { name: "Mirchi Vada", description: "Chili fritters", price: "₹40-80" },
        { name: "Mawa Kachori", description: "Sweet pastry", price: "₹60-120" }
      ]
    },
    {
      id: 34,
      name: "Shimla",
      state: "Himachal Pradesh",
      city: "Shimla",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.7,
      history: "Former summer capital of British India, known for its colonial architecture and scenic beauty.",
      streetFood: [
        { name: "Momos", description: "Steamed dumplings", price: "₹60-120" },
        { name: "Thukpa", description: "Noodle soup", price: "₹80-150" },
        { name: "Siddu", description: "Local bread", price: "₹40-80" },
        { name: "Babru", description: "Black gram dish", price: "₹50-100" }
      ]
    },
    {
      id: 35,
      name: "Bodh Gaya",
      state: "Bihar",
      city: "Bodh Gaya",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "Where Buddha attained enlightenment, one of the most important Buddhist pilgrimage sites.",
      streetFood: [
        { name: "Litti Chokha", description: "Baked dough with mash", price: "₹60-120" },
        { name: "Sattu Sharbat", description: "Protein drink", price: "₹30-60" },
        { name: "Chana Ghugni", description: "Spiced chickpeas", price: "₹40-80" },
        { name: "Malpua", description: "Sweet pancake", price: "₹50-100" }
      ]
    },
    {
      id: 36,
      name: "Puri Jagannath Temple",
      state: "Odisha",
      city: "Puri",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "Famous Hindu temple dedicated to Lord Jagannath, part of Char Dham pilgrimage.",
      streetFood: [
        { name: "Mahaprasad", description: "Temple food", price: "₹50-100" },
        { name: "Chhena Poda", description: "Burnt cheese", price: "₹60-120" },
        { name: "Rasagulla", description: "Sweet dessert", price: "₹40-80" },
        { name: "Pakhala", description: "Fermented rice", price: "₹30-70" }
      ]
    },
    {
      id: 37,
      name: "Kanyakumari",
      state: "Tamil Nadu",
      city: "Kanyakumari",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.7,
      history: "Southernmost tip of India where three oceans meet - Arabian Sea, Bay of Bengal, and Indian Ocean.",
      streetFood: [
        { name: "Seafood Platter", description: "Fresh seafood", price: "₹200-350" },
        { name: "Kothu Parotta", description: "Shredded bread", price: "₹80-150" },
        { name: "Fish Fry", description: "Fried fish", price: "₹120-200" },
        { name: "Banana Chips", description: "Crispy chips", price: "₹50-100" }
      ]
    },
    {
      id: 38,
      name: "Shillong",
      state: "Meghalaya",
      city: "Shillong",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.7,
      history: "Scotland of the East known for its rolling hills, waterfalls, and British colonial architecture.",
      streetFood: [
        { name: "Jadoh", description: "Rice and meat", price: "₹80-150" },
        { name: "Dohneiiong", description: "Pork with sesame", price: "₹120-200" },
        { name: "Pumaloi", description: "Rice powder cake", price: "₹40-80" },
        { name: "Tungrymbai", description: "Fermented soybean", price: "₹60-120" }
      ]
    },
    {
      id: 39,
      name: "Gwalior Fort",
      state: "Madhya Pradesh",
      city: "Gwalior",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.6,
      history: "One of the largest forts in India, known for its impressive architecture and history.",
      streetFood: [
        { name: "Bedai", description: "Fried bread", price: "₹40-80" },
        { name: "Kachauri", description: "Stuffed pastry", price: "₹30-60" },
        { name: "Jalebi", description: "Sweet dessert", price: "₹40-80" },
        { name: "Poha", description: "Flattened rice", price: "₹30-60" }
      ]
    },
    {
      id: 40,
      name: "Coorg",
      state: "Karnataka",
      city: "Madikeri",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "Scotland of India known for its coffee plantations, misty hills, and rich Kodava culture.",
      streetFood: [
        { name: "Pandi Curry", description: "Pork curry", price: "₹150-250" },
        { name: "Kadumbuttu", description: "Rice balls", price: "₹60-120" },
        { name: "Bamboo Shoot Curry", description: "Local specialty", price: "₹80-150" },
        { name: "Coffee", description: "Local brew", price: "₹30-60" }
      ]
    },
    {
      id: 41,
      name: "Ranakpur Temple",
      state: "Rajasthan",
      city: "Ranakpur",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.7,
      history: "Famous for its spectacular Jain temple with 1444 intricately carved marble pillars.",
      streetFood: [
        { name: "Dal Baati Churma", description: "Traditional meal", price: "₹120-200" },
        { name: "Gatte Ki Sabzi", description: "Gram flour curry", price: "₹80-150" },
        { name: "Ker Sangri", description: "Desert beans", price: "₹70-130" },
        { name: "Mohan Maas", description: "Royal meat", price: "₹200-350" }
      ]
    },
    {
      id: 42,
      name: "Darjeeling",
      state: "West Bengal",
      city: "Darjeeling",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.8,
      history: "Queen of the Hills famous for its tea plantations, toy train, and Himalayan views.",
      streetFood: [
        { name: "Momos", description: "Steamed dumplings", price: "₹60-120" },
        { name: "Thukpa", description: "Noodle soup", price: "₹80-150" },
        { name: "Tea", description: "World-famous tea", price: "₹20-50" },
        { name: "Alu Dum", description: "Spicy potatoes", price: "₹40-80" }
      ]
    },
    {
      id: 43,
      name: "Hampi Virupaksha Temple",
      state: "Karnataka",
      city: "Hampi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.7,
      history: "Ancient temple dedicated to Lord Shiva, part of the Group of Monuments at Hampi UNESCO site.",
      streetFood: [
        { name: "Benne Dosa", description: "Butter dosa", price: "₹50-100" },
        { name: "Holige", description: "Sweet flatbread", price: "₹40-80" },
        { name: "Maddur Vada", description: "Savory snack", price: "₹30-60" },
        { name: "Ragi Mudde", description: "Finger millet balls", price: "₹60-110" }
      ]
    },
    {
      id: 44,
      name: "Mount Abu",
      state: "Rajasthan",
      city: "Mount Abu",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.6,
      history: "Only hill station in Rajasthan known for its Dilwara Jain Temples and Nakki Lake.",
      streetFood: [
        { name: "Dal Baati Churma", description: "Traditional meal", price: "₹120-200" },
        { name: "Gatte Ki Sabzi", description: "Gram flour curry", price: "₹80-150" },
        { name: "Mirchi Bada", description: "Chili fritters", price: "₹40-80" },
        { name: "Rabdi", description: "Sweet dessert", price: "₹60-120" }
      ]
    },
    {
      id: 45,
      name: "Pattadakal",
      state: "Karnataka",
      city: "Pattadakal",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      rating: 4.6,
      history: "UNESCO World Heritage Site with 7th and 8th century Hindu and Jain temples.",
      streetFood: [
        { name: "Jolada Roti", description: "Sorghum bread", price: "₹30-60" },
        { name: "Ennegai", description: "Stuffed brinjal", price: "₹60-120" },
        { name: "Holige", description: "Sweet flatbread", price: "₹40-80" },
        { name: "Bisi Bele Bath", description: "Rice lentil dish", price: "₹70-130" }
      ]
    }
  ];

  const indianStates = [
    "All States", "Uttar Pradesh", "Maharashtra", "Rajasthan", "Punjab", "Delhi", 
    "Karnataka", "West Bengal", "Tamil Nadu", "Madhya Pradesh", "Kerala", "Goa", 
    "Gujarat", "Jammu & Kashmir", "Assam", "Uttarakhand", "Telangana", "Ladakh", 
    "Odisha", "Himachal Pradesh", "Bihar", "Meghalaya"
  ];

  const transportProviders = {
    train: [
      { name: "Indian Railways", price: "₹500-2000", duration: "Varies", type: "Train" },
      { name: "Gatiman Express", price: "₹800-1500", duration: "2-6 hours", type: "Train" },
      { name: "Rajdhani Express", price: "₹1200-3000", duration: "Overnight", type: "Train" },
      { name: "Shatabdi Express", price: "₹700-1800", duration: "Day journey", type: "Train" }
    ],
    flight: [
      { name: "Air India", price: "₹2000-8000", duration: "1-3 hours", type: "Flight" },
      { name: "IndiGo", price: "₹1500-6000", duration: "1-3 hours", type: "Flight" },
      { name: "SpiceJet", price: "₹1800-6500", duration: "1-3 hours", type: "Flight" },
      { name: "Vistara", price: "₹2500-9000", duration: "1-3 hours", type: "Flight" }
    ],
    bus: [
      { name: "State Transport", price: "₹300-1200", duration: "4-8 hours", type: "Bus" },
      { name: "Private Volvo", price: "₹800-2000", duration: "4-8 hours", type: "Bus" },
      { name: "Luxury Coach", price: "₹1000-2500", duration: "4-8 hours", type: "Bus" },
      { name: "Sleeper Bus", price: "₹600-1800", duration: "Overnight", type: "Bus" }
    ],
    car: [
      { name: "Ola Outstation", price: "₹10-15/km", duration: "Flexible", type: "Car" },
      { name: "Uber Intercity", price: "₹12-18/km", duration: "Flexible", type: "Car" },
      { name: "Self Drive Car", price: "₹1500-3000/day", duration: "Flexible", type: "Car" },
      { name: "Private Taxi", price: "₹8-12/km", duration: "Flexible", type: "Car" }
    ],
    bike: [
      { name: "Royal Enfield", price: "₹800-1500/day", duration: "Flexible", type: "Bike" },
      { name: "Bike Rental", price: "₹500-1000/day", duration: "Flexible", type: "Bike" },
      { name: "Scooter Rental", price: "₹300-700/day", duration: "Flexible", type: "Bike" }
    ],
    other: [
      { name: "Local Taxi", price: "₹200-500/day", duration: "Flexible", type: "Taxi" },
      { name: "Auto Rickshaw", price: "₹50-200/trip", duration: "Flexible", type: "Auto" },
      { name: "Cycle Rickshaw", price: "₹20-100/trip", duration: "Flexible", type: "Cycle" }
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
    if (!bookingData.from || !bookingData.date) {
      alert("Please fill in all required fields (From and Date)");
      return;
    }
    
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
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPin className="mr-2 text-orange-600" />
              Book Your Journey
            </h3>
            <button
              onClick={() => setShowTransportOptions(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">From *</label>
              <input
                type="text"
                value={bookingData.from}
                onChange={(e) => setBookingData({...bookingData, from: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your current city"
                required
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
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Date *</label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
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
              <div key={mode} className="border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                  <h4 className="font-bold text-lg text-white capitalize flex items-center">
                    <TransportIcon type={mode} />
                    <span className="ml-2">{mode === 'other' ? 'Local Transport' : `By ${mode}`}</span>
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  {providers.map((provider, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{provider.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{provider.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">{provider.price}</p>
                        <button
                          onClick={() => handleTransportBooking(provider)}
                          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm mt-2"
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

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm flex items-center">
              <Clock className="mr-2" size={16} />
              <strong>Travel Tip:</strong> Book in advance for better prices and availability. Most transport options offer free cancellation up to 24 hours before travel.
            </p>
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
              Famous Street Food - {selectedDestination?.name}
            </h3>
            <button
              onClick={() => setShowFoodOptions(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedDestination?.streetFood?.map((food, index) => (
              <div key={index} className="border-2 border-orange-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800">{food.name}</h4>
                    <p className="text-gray-600 text-sm mt-2">{food.description}</p>
                    <p className="text-green-600 font-semibold text-lg mt-3">{food.price}</p>
                  </div>
                  <button
                    onClick={() => handleFoodOrder(food)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors ml-4"
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-orange-800 text-sm">
              🚚 <strong>Delivery Info:</strong> Food will be delivered to your current location near {selectedDestination?.name}. 
              Average delivery time: 20-30 minutes. Perfect for enjoying local flavors while exploring!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <MapPin className="text-orange-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">45+ Destinations</h3>
              <p className="text-gray-600">Every major tourist spot across India covered with detailed information</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <Train className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Easy Transport</h3>
              <p className="text-gray-600">Book trains, flights, buses, and more with one click</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <Utensils className="text-red-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Local Food</h3>
              <p className="text-gray-600">Order authentic street food delivered to your location</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.slice(0, 8).map(dest => (
              <div key={dest.id} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x600/FFA500/FFFFFF?text=${encodeURIComponent(dest.name)}`;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white font-semibold">{dest.name}</p>
                  <p className="text-gray-300 text-sm">{dest.state}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setShowAuthModal(true); setAuthMode('login'); }}
            className="mt-12 bg-gradient-to-r from-orange-600 to-green-600 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:from-orange-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Exploring Now
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Facebook size={24} className="hover:text-orange-400 cursor-pointer" />
            <Twitter size={24} className="hover:text-orange-400 cursor-pointer" />
            <Instagram size={24} className="hover:text-orange-400 cursor-pointer" />
          </div>
          <p className="text-gray-400">© 2025 Incredible India Travel Portal. Explore with pride.</p>
        </div>
      </footer>
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
      train: <Train size={24} className="text-blue-600" />,
      flight: <Plane size={24} className="text-purple-600" />,
      bus: <Bus size={24} className="text-green-600" />,
      car: <Car size={24} className="text-red-600" />,
      bike: <Bike size={24} className="text-orange-600" />,
      other: <Ship size={24} className="text-gray-600" />
    };
    return icons[type] || <Car size={24} className="text-gray-600" />;
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
          <div className="mb-8">
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

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MapPin className="mr-2 text-green-600" size={28} />
              Book Your Journey
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              {Object.keys(transportProviders).map((mode) => (
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
                  className="bg-white border-2 border-orange-200 rounded-xl p-4 text-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-100 p-3 rounded-lg mb-2">
                      <TransportIcon type={mode} />
                    </div>
                    <span className="font-semibold text-gray-800 capitalize text-sm">
                      {mode === 'other' ? 'Local' : mode}
                    </span>
                    <span className="text-xs text-gray-600 mt-1">Click to book</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Utensils className="mr-2 text-red-600" size={28} />
              Famous Street Food
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {destination.streetFood.slice(0, 4).map((food, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-800">{food.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">{food.description}</p>
                      <p className="text-green-600 font-semibold text-lg mt-2">{food.price}</p>
                    </div>
                    <button
                      onClick={() => handleFoodOrder(food)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm ml-2"
                    >
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowFoodOptions(true)}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-colors flex items-center justify-center text-lg"
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
                    {Object.keys(transportProviders).slice(0, 4).map((mode) => (
                      <div key={mode} className="bg-orange-100 p-2 rounded-lg" title={`Book ${mode}`}>
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

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="mr-2 text-orange-400" size={24} />
                Incredible India
              </h4>
              <p className="text-gray-400">
                Your complete guide to exploring the diverse beauty and rich heritage of India.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Popular States</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Rajasthan</li>
                <li className="hover:text-white cursor-pointer">Kerala</li>
                <li className="hover:text-white cursor-pointer">Goa</li>
                <li className="hover:text-white cursor-pointer">Himachal Pradesh</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  +91 1800-XXX-XXXX
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  info@incredibleindia.com
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <Facebook size={24} className="hover:text-orange-400 cursor-pointer transition-colors" />
                <Twitter size={24} className="hover:text-orange-400 cursor-pointer transition-colors" />
                <Instagram size={24} className="hover:text-orange-400 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Incredible India Travel Portal. Made with ❤️ for travelers. All rights reserved.
            </p>
            <p className="text-gray-500 mt-2 text-sm">
              Showcasing 45+ major destinations with booking and food ordering features
            </p>
          </div>
        </div>
      </footer>
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
