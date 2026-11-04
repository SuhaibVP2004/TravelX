/* TravelX shared script. Data, shared layout and all page behaviours. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  // Images are hot-linked from Unsplash for the demo. To use local files in
  // assets/images/, change this one helper.
  const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
  // Indian rupee format, e.g. 165000 -> ₹1,65,000
  const inr = n => '₹' + n.toLocaleString('en-IN');

  /* ---------- Data ---------- */
  // Packages. The first three (Rajasthan, Paris, Dubai) are shown on the home page and at the top of the Packages page;
  // "View All Packages" reveals the rest. s = short description, days = duration, pax = group size,
  // loc = place, rev = review count, p = price per person in Indian rupees.
  // The pax, rev and p values are placeholders: replace them with your real numbers.
  const PKG = [
    { n: 'Royal Rajasthan & Taj', s: 'Amber Fort and the City Palace in Jaipur, then the Taj Mahal at sunrise in Agra.', days: '6D/5N', pax: 12, loc: 'Jaipur & Agra, India', rev: 28, p: 36000, i: '1477587458883-47145ed94245' },
    { n: 'Paris City Break', s: 'The Eiffel Tower, the Louvre, a Seine cruise and a day trip to Versailles.', days: '6D/5N', pax: 10, loc: 'France', rev: 21, p: 85000, i: '1502602898657-3e91760cbb34' },
    { n: 'Dubai City & Desert', s: 'Burj Khalifa, a desert safari with camp dinner and an evening marina cruise.', days: '5D/4N', pax: 12, loc: 'UAE', rev: 33, p: 64000, i: '1512453979798-5ea266f8880c' },
    { n: 'Experience The Great Holiday On Beach', s: "Sun, sand and slow island days on Malaysia's best beaches, with a beachfront stay and daily breakfast.", days: '7D/6N', pax: 10, loc: 'Malaysia', rev: 25, p: 52000, i: '1507525428034-b723cf961d3e' },
    { n: 'Summer Holiday To The Oxolotan River', s: 'A relaxed summer escape along a quiet river, with boat rides, village stops and rainforest walks.', days: '7D/6N', pax: 10, loc: 'Malaysia', rev: 20, p: 36000, i: '1602216056096-3b40cc0c9944' },
    { n: "Santorini Island's Weekend Vacation", s: 'A short island break with caldera views, sunset dinners and time to wander the white villages.', days: '7D/6N', pax: 10, loc: 'Greece', rev: 40, p: 48000, i: '1570077188670-e3a8d69ac5ff' },
    { n: 'Greek Island Escape', s: 'Whitewashed villages, caldera sunsets and island hopping between Santorini and Mykonos.', days: '7D/6N', pax: 10, loc: 'Greece', rev: 25, p: 110000, i: '1570077188670-e3a8d69ac5ff' },
    { n: 'Bali Wellness Retreat', s: 'Villa stay, daily yoga and a spa day among the rice terraces of Ubud and Seminyak.', days: '6D/5N', pax: 10, loc: 'Indonesia', rev: 20, p: 68000, i: '1537996194471-e657df975ab4' },
    { n: 'Alpine Rail Journey', s: 'Panoramic trains, cable cars and mountain hotels from Zurich to Zermatt.', days: '8D/7N', pax: 10, loc: 'Switzerland', rev: 18, p: 135000, i: '1531366936337-7c912a4589a7' },
    { n: 'Japan Culture Trail', s: 'Bullet trains, a tea ceremony and a local guide across Tokyo, Kyoto and Osaka.', days: '10D/9N', pax: 8, loc: 'Japan', rev: 22, p: 160000, i: '1493976040374-85c8e12f0c0e' },
    { n: 'Maldives Luxury Stay', s: 'Overwater villa, seaplane transfers, full board and reef snorkelling.', days: '5D/4N', pax: 6, loc: 'Maldives', rev: 31, p: 125000, i: '1514282401047-d79a71a590e8' },
    { n: 'Goa Beach Break', s: 'Beach hopping, Old Goa churches and fresh seafood at the shacks.', days: '5D/4N', pax: 15, loc: 'Goa, India', rev: 36, p: 26000, i: '1512343879784-a960bf40e7f2' },
    { n: 'Kerala Backwaters', s: 'A houseboat night, Munnar tea hills and Fort Kochi, with all meals and a local guide.', days: '5D/4N', pax: 12, loc: 'Kerala, India', rev: 40, p: 34000, i: '1602216056096-3b40cc0c9944' },
    { n: 'Kashmir Valley Escape', s: 'Dal Lake shikara rides, Mughal gardens and snowy meadows in Gulmarg.', days: '6D/5N', pax: 10, loc: 'Kashmir, India', rev: 19, p: 38000, i: '1566837945700-30057527ade0' },
    { n: 'Andaman Island Hopping', s: 'Radhanagar Beach, snorkelling over coral reefs and the Cellular Jail light show.', days: '6D/5N', pax: 10, loc: 'Andaman, India', rev: 24, p: 42000, i: '1589308078059-be1415eab4c3' }
  ];

  // Gallery: [Unsplash photo id, caption, category]. The home page shows the first 5 as plain tiles
  // (layout 2-1-2: the 3rd photo is the tall one in the middle);
  // the Gallery page shows all of them with filters and a lightbox.
  const GAL = [
    ['1507525428034-b723cf961d3e', 'Tropical shore', 'beach'], ['1531366936337-7c912a4589a7', 'Swiss Alps', 'mountain'],
    ['1502602898657-3e91760cbb34', 'Paris evenings', 'city'], ['1493976040374-85c8e12f0c0e', 'Kyoto streets', 'culture'],
    ['1602216056096-3b40cc0c9944', 'Kerala backwaters', 'nature'], ['1514282401047-d79a71a590e8', 'Maldives lagoon', 'beach'],
    ['1506905925346-21bda4d32df4', 'Mountain ridge', 'mountain'], ['1512453979798-5ea266f8880c', 'Dubai skyline', 'city'],
    ['1564507592333-c60657eea523', 'Taj Mahal', 'culture'], ['1537996194471-e657df975ab4', 'Bali terraces', 'nature'],
    ['1570077188670-e3a8d69ac5ff', 'Santorini', 'beach'], ['1500530855697-b586d89ba3ee', 'Misty peaks', 'mountain']
  ];
  const TEAM = [
    ['Rahul Menon', 'Founder & CEO', '1507003211169-0a1dd7228f2d'], ['Sara Thomas', 'Head of Operations', '1494790108377-be9c29b29330'],
    ['Daniel Brooks', 'Lead Travel Designer', '1500648767791-00dcc994a43e'], ['Meera Iyer', 'Customer Experience', '1438761681033-6461ffad8d80']
  ];
  const LOC = [
    // [name, Unsplash photo id, slug, country/subtitle]. First 8 = "Popular destinations" on the home page; the rest appear after "See All Destinations"
    ['India', '1564507592333-c60657eea523', 'india'], ['Turkey', '1570939274717-7eda259b50ed', 'turkey'],
    ['Istanbul', '1524231757912-21f4fe3a7200', 'istanbul'], ['Paris', '1502602898657-3e91760cbb34', 'paris'],
    ['Bali', '1537996194471-e657df975ab4', 'bali'], ['Dubai', '1512453979798-5ea266f8880c', 'dubai'],
    ['Switzerland', '1531366936337-7c912a4589a7', 'geneva'], ['Andaman & Nicobar', '1589308078059-be1415eab4c3', 'port-blair'],
    ['Maldives', '1514282401047-d79a71a590e8', 'maldives', 'Indian Ocean'], ['Santorini', '1570077188670-e3a8d69ac5ff', 'santorini', 'Greece'],
    ['Kyoto', '1493976040374-85c8e12f0c0e', 'kyoto', 'Japan'], ['Singapore', '1525625293386-3f8f99389edd', 'singapore', 'Singapore'],
    ['Bangkok', '1508009603885-50cf7c579365', 'bangkok', 'Thailand'], ['London', '1513635269975-59663e0ac1ad', 'london', 'United Kingdom'],
    ['Rome', '1552832230-c0197dd311b5', 'rome', 'Italy'], ['New York', '1496442226666-8d4d0e62e6e9', 'new-york', 'USA'],
    ['Sydney', '1506973035872-a4ec16b8e8d9', 'sydney', 'Australia'], ['Cape Town', '1580060839134-75a5edca2e99', 'cape-town', 'South Africa'],
    ['Kerala', '1602216056096-3b40cc0c9944', 'kerala', 'India'], ['Goa', '1512343879784-a960bf40e7f2', 'goa', 'India'],
    ['Jaipur', '1477587458883-47145ed94245', 'jaipur', 'India'], ['Agra', '1564507592333-c60657eea523', 'agra', 'India']
  ];

  // Detail text per slug: [tagline, best time, suggested days]
  const DET = {
    india: ['From the Himalayan valleys of Kashmir to palaces, backwaters and beaches, India packs a whole continent of experiences into one trip.', 'Oct to Mar', '10 to 14 days'],
    turkey: ['Where Europe meets Asia: lively bazaars, ancient ruins, cave hotels in Cappadocia and a sunny Aegean coast.', 'Apr to Jun, Sep to Nov', '10 to 12 days'],
    istanbul: ['Mosques, bazaars and Bosphorus ferries in a city that spans two continents.', 'Apr to May, Sep to Nov', '5 to 7 days'],
    paris: ['Art, cafés and the Eiffel Tower lighting up the evening sky.', 'Apr to Jun, Sep to Oct', '5 to 7 days'],
    bali: ['Rice terraces, temples and surf beaches on the Island of Gods.', 'Apr to Oct', '7 to 10 days'],
    dubai: ['A record-breaking skyline, desert safaris and luxury shopping.', 'Nov to Mar', '5 to 7 days'],
    geneva: ['Switzerland offers lakes, snowy peaks and scenic trains. Trips start in lakeside Geneva.', 'Jun to Sep, Dec to Mar', '8 to 10 days'],
    'port-blair': ['Clear water, coral reefs and quiet white-sand islands in the Andaman & Nicobar group.', 'Oct to May', '6 to 8 days'],
    maldives: ['Overwater villas, turquoise lagoons and world-class diving.', 'Nov to Apr', '5 to 7 days'],
    santorini: ['Whitewashed villages, blue domes and caldera sunsets.', 'Apr to Oct', '5 to 7 days'],
    kyoto: ['Ancient shrines, geisha districts and cherry blossom lanes.', 'Mar to May, Oct to Nov', '7 to 9 days'],
    singapore: ['A clean, green city of futuristic gardens, hawker food and island beaches.', 'Feb to Apr', '5 to 6 days'],
    bangkok: ['Golden temples, floating markets and some of the best street food on Earth.', 'Nov to Feb', '5 to 7 days'],
    london: ['Royal history, world-class museums and West End theatre.', 'May to Sep', '6 to 8 days'],
    rome: ['Ancient ruins, Renaissance art and unforgettable food in every piazza.', 'Apr to Jun, Sep to Oct', '5 to 7 days'],
    'new-york': ['Skyscrapers, Broadway lights and neighbourhoods that never sleep.', 'Apr to Jun, Sep to Nov', '6 to 8 days'],
    sydney: ['Harbour views, golden beaches and an easy outdoor lifestyle.', 'Sep to Nov, Mar to May', '7 to 9 days'],
    'cape-town': ['Mountains meeting the ocean, vineyards and wildlife close to the city.', 'Nov to Mar', '7 to 9 days'],
    kerala: ['Houseboat backwaters, spice hills and Ayurvedic retreats.', 'Oct to Mar', '6 to 8 days'],
    goa: ['Palm-lined beaches, Portuguese churches and fresh seafood shacks.', 'Nov to Feb', '5 to 7 days'],
    jaipur: ['The Pink City: hilltop forts, royal palaces and colourful bazaars.', 'Oct to Mar', '4 to 6 days'],
    agra: ['Home of the Taj Mahal and Mughal-era forts.', 'Oct to Mar', '3 to 4 days']
  };

  // Longer description per slug: three short paragraphs
  const MORE = {
    "india": [
      "India is a country where every region feels like a different destination. In the north you find the Himalayas and the valley of Kashmir, with its lakes, orchards and houseboats. The golden triangle of Delhi, Agra and Jaipur brings together the Taj Mahal, grand forts and busy bazaars. In the south, Kerala offers calm backwaters and spice hills, while Goa and the coast give you long beaches and a relaxed pace.",
      "Food is a highlight in every state. Expect rich curries and fresh breads in the north, dosas and coconut dishes in the south, and street snacks everywhere. Festivals such as Diwali and Holi can add colour to a trip if the dates fit your plans.",
      "Because distances are large, most travellers pick two or three regions and fly or take trains between them. Ten to fourteen days gives you enough time to enjoy each stop without rushing. Winter, from October to March, is the most comfortable season for most of the country."
    ],
    "turkey": [
      "Turkey sits between Europe and Asia, and its history shows in every city. Istanbul has grand mosques and palaces, Cappadocia has caves and rock valleys, and the Aegean coast has Greek and Roman ruins beside quiet beaches.",
      "Turkish food is a reason to travel by itself. Start the day with a long breakfast of cheeses, olives, eggs and fresh bread, then try kebabs, mezze and baklava with strong tea or coffee.",
      "Plan around ten to twelve days to see Istanbul, Cappadocia and one coastal area at an easy pace. Spring and autumn are the best seasons, with warm days and fewer crowds. Short domestic flights save a lot of time between regions."
    ],
    "istanbul": [
      "Istanbul is the only major city built across two continents, and the Bosphorus strait runs right through it. The old city holds Hagia Sophia, the Blue Mosque and Topkapı Palace within walking distance of each other. Across the water, neighbourhoods like Karaköy and Kadıköy are full of cafés and galleries.",
      "Eat simit from street carts, fresh fish by the Galata Bridge and sweets such as baklava and Turkish delight. Evenings are best spent on a ferry or at a rooftop terrace with a view of the lit-up minarets.",
      "Give the city five to seven days so you can mix the major sights with slower days. Wear comfortable shoes, since many streets are steep and cobbled, and dress modestly when visiting mosques."
    ],
    "paris": [
      "Paris is a city made for walking. Wide boulevards, river bridges and small corner cafés connect famous sights like the Eiffel Tower, Notre-Dame, the Louvre and the Arc de Triomphe. Each neighbourhood has its own mood, from the artistic lanes of Montmartre to the lively Latin Quarter.",
      "Food is part of the experience. Try fresh croissants for breakfast, a simple bistro lunch and cheese and wine in the evening. Local markets are good for picnic food to enjoy beside the Seine.",
      "Five to seven days lets you visit the main museums, take a day trip to Versailles and still leave time to wander. Spring and early autumn have pleasant weather. Book popular museum tickets and tower visits in advance to avoid long queues."
    ],
    "bali": [
      "Bali is a small island with a lot of variety. Ubud sits in the green centre with rice terraces, art markets and yoga studios. The south coast has surf beaches, cliff temples and lively beach clubs, and the east and north are quieter, with black sand and mountain views.",
      "Balinese culture is part of daily life, with offerings placed outside homes and shops and temple ceremonies throughout the year. Try nasi goreng, satay and fresh fruit, and look for a cooking class if you enjoy food.",
      "Seven to ten days is a good length, ideally split between two bases to limit long drives. The dry season from April to October brings sunny weather and calm seas. Hire a driver for day trips, as roads can be slow."
    ],
    "dubai": [
      "Dubai grew from a trading town on a creek into a city of record-breaking towers. You can see the world’s tallest building, shop in giant malls and walk along man-made islands, then spend the next morning in old-town souks selling gold, spices and perfume.",
      "Outside the city, desert safaris offer dune driving, sandboarding and dinner under the stars. Food ranges from street shawarma to fine dining from every part of the world.",
      "Five to seven days is enough for the city and the desert, with time to relax at the beach. The cooler months from November to March are the best for outdoor plans, as summer is very hot. Dress modestly in public places and religious sites."
    ],
    "geneva": [
      "Switzerland is compact, tidy and very scenic. Geneva sits on a large lake with views toward Mont Blanc, and from there trains reach Lucerne, Interlaken and Zermatt in a few hours. Each stop brings clear lakes, waterfalls and snow-covered peaks.",
      "The rail network is the best way to travel, with panoramic trains and cable cars reaching high viewpoints. Local food includes cheese fondue, raclette and fine chocolate, best enjoyed after a day outdoors.",
      "Allow eight to ten days to cover lakes and mountains without hurrying. Summer is ideal for hiking and boat rides, and winter suits skiing and cosy village stays. Switzerland is expensive, so a rail pass and early bookings help the budget."
    ],
    "port-blair": [
      "Port Blair is the gateway to the Andaman and Nicobar Islands in the Bay of Bengal. The town has a colonial past, seen in the Cellular Jail and the ruins on nearby Ross Island. From here, ferries lead to Havelock and Neil Islands, known for white beaches and clear water.",
      "The reefs are good for snorkelling and scuba diving, even for beginners with an instructor. Seafood is fresh and simple, often grilled and served beside the beach.",
      "Plan six to eight days so you can include both main islands and keep a spare day in case ferries are delayed by weather. October to May is the best season. Carry some cash, as card machines and mobile networks can be limited on the smaller islands."
    ],
    "maldives": [
      "The Maldives is a chain of coral islands in the Indian Ocean, famous for pale sand, shallow lagoons and water in many shades of blue. Most resorts occupy their own small island, with villas on the beach or above the water.",
      "Days are spent snorkelling on house reefs, diving with manta rays and turtles, paddle boarding or simply relaxing. Many resorts arrange sandbank picnics and sunset dolphin cruises.",
      "Five to seven days is a comfortable stay. Choose a resort based on the reef, the meal plan and how you get there, since seaplane or boat transfers can add to the cost. November to April is the dry season with the calmest weather."
    ],
    "santorini": [
      "Santorini is the curved remains of a volcano, and its towns sit high on the cliff edge looking over the caldera. White houses, blue domes and narrow lanes make it one of the most photographed islands in Greece.",
      "Besides the views, you can visit the ancient town of Akrotiri, taste local white wines grown in volcanic soil and swim at the red and black sand beaches. Seafood, fava dip and fresh tomatoes are local favourites.",
      "Five to seven days is plenty, and you can add a day trip to a nearby island. The season runs from April to October, with September a good month for warm sea and fewer visitors. Reserve cliff-view hotels and sunset tables early."
    ],
    "kyoto": [
      "Kyoto was the capital of Japan for more than a thousand years, and it still holds hundreds of temples and shrines. Wooden tea houses line the lanes of Gion, bamboo groves sway in Arashiyama and thousands of red gates climb the hill at Fushimi Inari.",
      "Try a tea ceremony, wear a kimono for a walk or take a cooking class. Local dishes include kaiseki multi-course meals, tofu cuisine and matcha sweets.",
      "Seven to nine days lets you see Kyoto, nearby Nara and Osaka without rushing. Cherry blossoms in spring and red leaves in autumn are beautiful but busy, so book hotels early. Buses and trains are easy to use, and a transit card makes it simple."
    ],
    "singapore": [
      "Singapore is a modern island city known for cleanliness, order and variety. Skyscrapers and futuristic gardens stand next to heritage districts such as Chinatown, Little India and Kampong Glam, each with its own temples, shops and food.",
      "Food is the star. Hawker centres serve chicken rice, laksa and satay at low prices, and you can move on to fine dining if you like. Sentosa island offers beaches and theme parks, and the zoo and night safari are well loved.",
      "Five to six days covers the main areas comfortably. The weather is warm and humid all year, with brief afternoon rain, so carry a light umbrella. The metro is clean and simple, and the city is easy to combine with a trip to Malaysia or Indonesia."
    ],
    "bangkok": [
      "Bangkok is busy, colourful and full of energy. Golden temples, riverside palaces and floating markets sit next to modern malls, rooftop bars and night markets. The Chao Phraya river and its boats are a pleasant escape from the traffic.",
      "Thai food is a highlight, from pad thai and green curry to mango with sticky rice. Join a street food tour in Chinatown or take a cooking class to learn the balance of sweet, sour, salty and spicy.",
      "Plan five to seven days, with a day trip to Ayutthaya or a nearby floating market. November to February is the coolest and driest time. Dress modestly at temples, and use the sky train and river boats to avoid traffic."
    ],
    "london": [
      "London mixes royal history with a modern, multicultural city. See the Tower of London, Westminster Abbey and Buckingham Palace, then explore markets, theatres and parks. The Thames ties many of the main sights together.",
      "Many top museums, including the British Museum and the National Gallery, are free to enter. Food ranges from fish and chips and Sunday roasts to curries and street food from around the world.",
      "Six to eight days lets you enjoy the main sights, a West End show and a day trip to Oxford, Windsor or Bath. May to September has the longest days and mildest weather. Use a contactless card for the tube, buses and trains."
    ],
    "rome": [
      "Rome is an open-air museum where ancient ruins, Baroque fountains and lively piazzas share the same streets. The Colosseum and Roman Forum show the old empire, while the Vatican holds St Peter’s Basilica and the Sistine Chapel.",
      "Eating is a daily pleasure. Try carbonara, cacio e pepe and Roman pizza, finish with gelato and coffee, and look for small family-run trattorias in Trastevere and Testaccio.",
      "Five to seven days lets you see the main sights and add a day trip to Pompeii or Tivoli. Spring and autumn are the most pleasant seasons. Book Colosseum and Vatican tickets ahead, and wear comfortable shoes for the cobbles."
    ],
    "new-york": [
      "New York is a city of neighbourhoods, each with its own personality. Manhattan has the skyline, Broadway and Central Park, Brooklyn has creative streets and waterfront views, and areas like Queens and the Bronx are known for their food and culture.",
      "Food comes from every part of the world, from pizza slices and bagels to ramen, tacos and fine dining. Museums such as the Met, MoMA and the Natural History Museum can fill whole days.",
      "Six to eight days gives you time for the major sights and some quieter corners. Spring and autumn are the most comfortable seasons, and December is festive but busy. The subway runs all day and night and is the quickest way to get around."
    ],
    "sydney": [
      "Sydney is built around one of the world’s most beautiful harbours. The Opera House and Harbour Bridge are the landmarks, and the ferries, beaches and coastal walks are what make the city enjoyable day to day.",
      "Swim or surf at Bondi, walk the coastal path to Coogee, or take a ferry to Manly. Food is fresh and varied, with seafood, Asian-inspired dishes and good coffee on almost every street.",
      "Seven to nine days lets you add the Blue Mountains, a wine region or a flight to the Great Barrier Reef. Spring and autumn are mild, while summer from December to February is hot and good for the beach. The sun is strong, so use sunscreen year round."
    ],
    "cape-town": [
      "Cape Town sits between Table Mountain and the Atlantic Ocean, with wine country and wildlife close by. The city has colourful neighbourhoods, a busy waterfront and some of the best views in Africa.",
      "Drive the coast to Cape Point, visit the penguins at Boulders Beach and taste wine in Stellenbosch or Franschhoek. Local food includes braai grills, fresh seafood and Cape Malay curries.",
      "Seven to nine days lets you enjoy the city, the peninsula and the winelands, with an optional safari or Garden Route extension. November to March is warm and dry. Use licensed taxis or ride apps in the evenings and follow local safety advice."
    ],
    "kerala": [
      "Kerala is a narrow strip of land between the Western Ghats and the Arabian Sea, often called God’s Own Country. It offers green hills, tea and spice plantations, quiet backwaters, beaches and wildlife reserves.",
      "Stay a night on a houseboat in Alleppey, walk through the tea gardens of Munnar and see the old harbour at Fort Kochi. Meals use coconut, fresh fish and spices, and traditional Ayurveda treatments are widely available.",
      "Six to eight days is a relaxed length for hills, backwaters and coast. October to March has the most comfortable weather, while the monsoon months suit slower, lower cost stays. Roads are winding, so allow extra time for transfers."
    ],
    "goa": [
      "Goa is a small coastal state with Indian and Portuguese influences. North Goa has lively beaches, markets and nightlife, while South Goa is calmer, with wide empty beaches and small resorts. Inland there are spice farms, waterfalls and old churches.",
      "Seafood is the star, with fish curry and rice, prawns and local bread. Evenings are for beach shacks, live music and sunset walks, and the Saturday night markets are popular.",
      "Five to seven days is a comfortable stay. Between November and February the weather is dry and pleasant. Rent a scooter or hire a car with a driver to explore, and book beach-side stays early around Christmas and New Year."
    ],
    "jaipur": [
      "Jaipur is the capital of Rajasthan and is known as the Pink City for the colour of its old walls. Forts, palaces and bazaars are packed close together, so the city is easy to explore in a few days.",
      "Visit Amber Fort in the morning, wander through the City Palace and the Hawa Mahal and shop for textiles, jewellery and blue pottery. Rajasthani food includes dal baati churma and spicy laal maas, and street snacks such as kachori are popular.",
      "Four to six days lets you see the city properly and add a trip to nearby villages or the stepwells. October to March is the best time, as summers are very hot. Bargain politely in the markets and carry a hat and water."
    ],
    "agra": [
      "Agra is best known for the Taj Mahal, the white marble tomb built by Emperor Shah Jahan in memory of his wife. The city was also a Mughal capital, and Agra Fort and the tomb of Itimad-ud-Daulah show the same fine craftsmanship.",
      "Visit the Taj at sunrise for softer light and fewer people, and see it again from Mehtab Bagh across the river at sunset. Try Mughlai food and the local sweet petha.",
      "Three to four days is enough, often combined with Delhi and Jaipur. October to March has the best weather. Many travellers add Fatehpur Sikri, an abandoned Mughal city about an hour away."
    ]
  };

  // Places to visit per slug: [[place, short description], ...]
  const PL = {
    india: [[['Kashmir', 'Shikara rides on Dal Lake, Mughal gardens and the meadows of Gulmarg.'], ['Agra (Taj Mahal)', 'The white marble monument at sunrise, plus Agra Fort nearby.'], ['Jaipur', 'The Pink City with Amber Fort, Hawa Mahal and the City Palace.'], ['Kerala Backwaters', 'Houseboat nights, tea hills in Munnar and calm green canals.'], ['Goa', 'Palm-lined beaches, Portuguese churches and fresh seafood shacks.'], ['Varanasi', 'Evening Ganga aarti and boat rides past ancient riverside ghats.']]],
    turkey: [[['Cappadocia', 'Fairy chimneys, cave hotels and sunrise balloon flights.'], ['Pamukkale', 'White travertine terraces and warm thermal pools.'], ['Ephesus', 'One of the best-preserved Roman cities in the world.'], ['Antalya', 'An old harbour town with Mediterranean beaches.']]],
    istanbul: [[['Hagia Sophia', 'A huge Byzantine dome dating back to the 6th century.'], ['Blue Mosque', 'Six minarets and thousands of blue İznik tiles.'], ['Grand Bazaar', 'Thousands of shops selling lamps, textiles, spices and sweets.'], ['Bosphorus Cruise', 'Ferries between Europe and Asia with palace views.']]],
    paris: [[['Eiffel Tower', 'Best at sunset, when the lights come on at dusk.'], ['The Louvre', 'Home of the Mona Lisa and thousands of other works.'], ['Montmartre', 'Artists’ hill with Sacré-Cœur and village-like lanes.'], ['Versailles', 'The royal palace and gardens, a short train ride away.']]],
    bali: [[['Ubud', 'Rice terraces, art markets and the Monkey Forest.'], ['Uluwatu', 'A cliff-top temple with a sunset Kecak fire dance.'], ['Seminyak', 'Beach clubs, boutiques and relaxed sunset dining.'], ['Nusa Penida', 'Dramatic sea cliffs and snorkelling with manta rays.']]],
    dubai: [[['Burj Khalifa', 'Observation decks high above the city skyline.'], ['Desert Safari', 'Dune bashing, camel rides and a camp dinner under the stars.'], ['Dubai Marina', 'A waterfront walk and an evening dhow cruise.'], ['Old Dubai', 'Gold and spice souks, and an abra boat across the creek.']]],
    geneva: [[['Lake Geneva', 'Boat cruises and the famous Jet d’Eau fountain.'], ['Lucerne', 'The wooden Chapel Bridge and a pretty old town.'], ['Jungfraujoch', 'The “Top of Europe”, reached by cogwheel train.'], ['Zermatt', 'A car-free village with Matterhorn views.']]],
    'port-blair': [[['Radhanagar Beach', 'Soft white sand and clear water on Havelock Island.'], ['Cellular Jail', 'A colonial-era prison with an evening light-and-sound show.'], ['Ross Island', 'Ruined British-era buildings covered in jungle.'], ['Elephant Beach', 'Snorkelling and diving over healthy coral reefs.']]],
    maldives: [[['Overwater Villas', 'Step from your deck straight into the lagoon.'], ['Baa Atoll', 'A protected reserve known for manta rays.'], ['Sandbank Picnics', 'Tiny white sandbars reached by speedboat.'], ['Male', 'The colourful capital with a lively fish market.']]],
    santorini: [[['Oia', 'Blue domes and the most famous sunset on the island.'], ['Fira', 'The main town, with cliff-top cafés and shops.'], ['Red Beach', 'Dramatic red cliffs above dark volcanic sand.'], ['Akrotiri', 'A Bronze Age town preserved under volcanic ash.']]],
    kyoto: [[['Fushimi Inari', 'Thousands of red torii gates winding up a forested hill.'], ['Kinkaku-ji', 'The Golden Pavilion reflected in its pond.'], ['Arashiyama', 'A bamboo grove, monkey park and riverside paths.'], ['Gion', 'Historic tea houses and evening geisha districts.']]],
    singapore: [[['Gardens by the Bay', 'The Supertree grove and its nightly light show.'], ['Marina Bay Sands', 'Skypark views over the harbour.'], ['Sentosa', 'Beaches, attractions and cable-car rides.'], ['Hawker Centres', 'Cheap, famous local dishes under one roof.']]],
    bangkok: [[['Grand Palace', 'Gilded halls and the Temple of the Emerald Buddha.'], ['Wat Arun', 'A riverside temple that glows at sunset.'], ['Chatuchak Market', 'Thousands of stalls open on weekends.'], ['Chinatown', 'Street food at its best after dark.']]],
    london: [[['Tower of London', 'The Crown Jewels and nearly 1,000 years of history.'], ['British Museum', 'World treasures from the Rosetta Stone to Egyptian mummies.'], ['Westminster', 'Big Ben, the Abbey and a ride on the London Eye.'], ['Borough Market', 'A lively food market near the river.']]],
    rome: [[['Colosseum', 'The ancient arena, with the Roman Forum next door.'], ['Vatican City', 'St Peter’s Basilica and the Sistine Chapel.'], ['Trevi Fountain', 'Toss a coin and make a wish.'], ['Pantheon', 'A 2,000-year-old temple with a perfect dome.']]],
    'new-york': [[['Statue of Liberty', 'Reached by ferry, with skyline views on the way.'], ['Central Park', 'Boat rides, bridges and open meadows in the city centre.'], ['Times Square & Broadway', 'Bright lights and world-famous theatre.'], ['Brooklyn Bridge', 'Walk across for views of Manhattan.']]],
    sydney: [[['Opera House', 'A tour inside, or a show at the harbour.'], ['Bondi Beach', 'Surf, then walk the coastal path to Coogee.'], ['Harbour Bridge', 'Walk across it, or climb to the top.'], ['Blue Mountains', 'Cliff viewpoints and eucalyptus forest a day trip away.']]],
    'cape-town': [[['Table Mountain', 'Cable car or hike for views over the city and sea.'], ['Cape Point', 'Rugged cliffs where two oceans meet.'], ['Stellenbosch', 'Winelands with tasting rooms and mountain views.'], ['Boulders Beach', 'A beach shared with a colony of African penguins.']]],
    kerala: [[['Alleppey', 'Houseboat stays on calm green backwaters.'], ['Munnar', 'Rolling tea estates and cool misty hills.'], ['Fort Kochi', 'Chinese fishing nets, spice markets and old churches.'], ['Thekkady', 'Periyar wildlife sanctuary and spice plantations.']]],
    goa: [[['Baga & Calangute', 'Busy beaches with water sports and shacks.'], ['Old Goa', 'The Basilica of Bom Jesus and other historic churches.'], ['Palolem', 'A quiet crescent beach in the south.'], ['Dudhsagar Falls', 'A tall four-tier waterfall in the forest.']]],
    jaipur: [[['Amber Fort', 'A hilltop fort with mirrored palaces, reached by jeep.'], ['Hawa Mahal', 'The pink “Palace of Winds” with its honeycomb windows.'], ['City Palace', 'Royal courtyards, museums and textiles.'], ['Jantar Mantar', 'A giant 18th-century astronomical observatory.']]],
    agra: [[['Taj Mahal', 'A white marble monument to love, best at sunrise.'], ['Agra Fort', 'A red sandstone fort with views of the Taj.'], ['Mehtab Bagh', 'Gardens across the river with sunset views of the Taj.'], ['Fatehpur Sikri', 'An abandoned Mughal capital an hour away.']]]
  };

  /* ---------- Shared header / footer ---------- */
  // About has been removed from the menu. This list drives the header menu.
  const LINKS = [['index.html', 'Home'], ['destinations.html', 'Destinations'], ['packages.html', 'Packages'], ['gallery.html', 'Gallery'], ['contact.html', 'Contact Us']];
  // File name of this page. Hosts that hide ".html" (e.g. /packages) are handled by adding it back.
  const file = location.pathname.split('/').pop() || 'index.html';
  const page = file.includes('.') ? file : file + '.html';
  const cur = page === 'location.html' ? 'destinations.html' : page;
  // On the home page the menu scrolls to sections on the same page instead of opening other pages.
  // On every other page the menu opens the normal pages.
  const isHome = page === 'index.html';
  const HOME_ID = { 'index.html': '#home', 'destinations.html': '#popular', 'packages.html': '#featured', 'gallery.html': '#home-gallery', 'contact.html': '#contact' };
  const go = h => isHome ? HOME_ID[h] : h;
  const soc = [['facebook-f', 'https://facebook.com'], ['instagram', 'https://www.instagram.com/shuh4ibb_'], ['x-twitter', 'https://x.com'], ['youtube', 'https://youtube.com']];
  const socials = `<div class="social">${soc.map(([i, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${i}"><i class="fa-brands fa-${i}"></i></a>`).join('')}</div>`;
  $('#site-header').innerHTML = `<header class="header"><div class="container nav">
    <a class="logo" href="index.html"><i class="fa-solid fa-plane-up"></i> Travel<span>X</span></a>
    <button class="burger" aria-label="Toggle menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
    <nav id="menu" aria-label="Main">${LINKS.map(([h, t]) => `<a href="${go(h)}" class="${h === cur ? 'active' : ''}">${t}</a>`).join('')}</nav></div></header>`;
  // Footer: about | contact details | newsletter
  $('#site-footer').innerHTML = `<footer class="footer"><div class="container fgrid3">
    <div><a class="logo" href="index.html"><i class="fa-solid fa-plane-up"></i> Travel<span>X</span></a><p>Discover unforgettable destinations and create memories that last a lifetime. From relaxing getaways to exciting adventures, TravelX helps you plan your perfect journey with ease.</p>${socials}</div>
    <div><h4>Contact Us</h4><p class="f-note">Feel free to contact and reach us !!</p><ul><li><i class="fa-solid fa-phone"></i> <a href="tel:+918943103140">+91 89431 03140</a></li><li><i class="fa-solid fa-envelope"></i> <a href="mailto:heytravelx@gmail.com">heytravelx@gmail.com</a></li><li><i class="fa-solid fa-location-dot"></i> MG Road, Kochi, Kerala</li></ul></div>
    <div><h4>Subscribe</h4><p class="f-note">Subscribe our newsletter for more update &amp; news !!</p>
     <form id="foot-news" class="f-news" novalidate><input type="email" name="email" placeholder="Your email address" aria-label="Email"><button class="btn" type="submit">Subscribe</button></form><p class="msg" role="status"></p></div>
    </div><div class="copy">&copy; ${new Date().getFullYear()} TravelX. All rights reserved.</div></footer>
    <button class="top" aria-label="Back to top"><i class="fa-solid fa-chevron-up"></i></button>`;

  /* ---------- Nav, scroll header, back-to-top ---------- */
  const header = $('.header'), burger = $('.burger'), menu = $('#menu'), top = $('.top');
  burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
  $$('#menu a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  const onScroll = () => { header.classList.toggle('solid', scrollY > 60); top.classList.toggle('show', scrollY > 500); };
  addEventListener('scroll', onScroll); onScroll();
  top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } }));

  // Home page scroll-spy: the yellow highlight follows the section you are scrolling through
  // Home -> Destinations -> Packages -> Gallery -> Contact Us
  if (isHome) {
    const spy = [['#home', '#home'], ['#popular', '#popular'], ['#featured', '#featured'], ['#home-pk-more', '#featured'], ['#home-gallery', '#home-gallery'], ['#contact', '#contact']]
      .map(([s, l]) => [$(s), $(`#menu a[href="${l}"]`)]).filter(([s, a]) => s && a);
    const paint = () => {
      const line = innerHeight * 0.4;
      let on = spy[0][1];
      spy.forEach(([s, a]) => { if (!s.classList.contains('hide') && s.getBoundingClientRect().top <= line) on = a; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) on = spy[spy.length - 1][1]; // bottom of page = Contact Us
      $$('#menu a').forEach(a => a.classList.toggle('active', a === on));
    };
    addEventListener('scroll', paint, { passive: true });
    addEventListener('resize', paint);
    paint();
  }

  /* ---------- Scroll animations ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  const reveal = () => $$('.reveal:not(.in)').forEach(e => io.observe(e));

  /* ---------- Card templates ---------- */
  const pic = (id, alt) => `<img src="${img(id)}" alt="${alt}" loading="lazy">`;
  const pkgCard = k => `<article class="pk reveal"><div class="img">${pic(k.i, k.n)}</div>
    <div class="info"><h3>${k.n}</h3><p class="desc">${k.s}</p>
    <ul class="pm"><li><i class="fa-regular fa-clock"></i>${k.days}</li><li><i class="fa-solid fa-user-group"></i>pax: ${k.pax}</li><li><i class="fa-solid fa-location-dot"></i>${k.loc}</li></ul></div>
    <div class="buy"><div class="rate"><span class="stars">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</span>(${k.rev} reviews)</div>
    <div class="price">${inr(k.p)}<small> / per person</small></div>
    <a class="btn" href="contact.html?package=${encodeURIComponent(k.n)}">Book Now</a></div></article>`;
  // Gallery page tile: has a caption and opens the lightbox
  const figure = (g, i) => `<figure class="reveal" data-cat="${g[2]}" data-full="${img(g[0], 1600)}" tabindex="0"><img src="${img(g[0], 700)}" alt="${g[1]}" loading="lazy"><figcaption>${g[1]}</figcaption></figure>`;
  // Home page tile: plain photo only (no caption, no click action)
  const plainFigure = g => `<figure class="reveal"><img src="${img(g[0], 1000)}" alt="${g[1]}" loading="lazy"></figure>`;
  // alt is empty because the visible label right below the photo already names the place
  const locCard = ([n, id, h, sub]) => `<a class="lc reveal" href="location.html?loc=${h}">${pic(id, '')}<span><b>${n}</b>${sub ? `<small>${sub}</small>` : ''}</span></a>`;
  const mount = (id, html) => { const e = $(id); if (e) e.innerHTML = html; return e; };

  mount('#home-dest', LOC.slice(0, 8).map(locCard).join(''));
  mount('#more-dest', LOC.slice(8).map(locCard).join(''));
  mount('#home-pkg', PKG.slice(0, 3).map(pkgCard).join(''));
  mount('#home-pk-rest', PKG.slice(3).map(pkgCard).join(''));
  mount('#pk-feat', PKG.slice(0, 3).map(pkgCard).join(''));
  mount('#pk-rest', PKG.slice(3).map(pkgCard).join(''));
  // Home gallery: exactly 5 plain tiles (laid out 2-1-2 by .gal5 in the CSS)
  mount('#home-gal', GAL.slice(0, 5).map(plainFigure).join(''));
  mount('#team', TEAM.map(m => `<div class="card team reveal"><div class="img">${pic(m[2], m[0])}</div><div class="body"><h3>${m[0]}</h3><small>${m[1]}</small></div></div>`).join(''));

  /* ---------- Location detail page (location.html?loc=slug) ---------- */
  const ld = $('#loc-detail');
  if (ld) {
    const slug = new URLSearchParams(location.search).get('loc'), i = LOC.findIndex(l => l[2] === slug);
    if (i < 0) ld.innerHTML = '<section class="section"><div class="container center"><h1>Place not found</h1><p style="margin:12px 0 24px">We could not find that destination.</p><a class="btn pri" href="destinations.html">Back to Destinations</a></div></section>';
    else {
      const [n, id, h, sub] = LOC[i], [txt, best, days] = DET[h], [places] = PL[h];
      const book = `contact.html?package=${encodeURIComponent(n + ' trip')}`;
      document.title = `${n} | TravelX`;
      const rel = [1, 2, 3, 4].map(k => LOC[(i + k) % LOC.length]);
      ld.innerHTML = `<section class="banner d-hero" style="--img:url('${img(id, 1600)}')"><div class="container">
        <p><a class="back" href="destinations.html"><i class="fa-solid fa-arrow-left"></i> All destinations</a></p>
        <h1>${n}</h1>${sub ? `<p class="d-sub">${sub}</p>` : ''}<p class="d-tag">${txt}</p>
        <a class="btn lg" href="#places">Explore places</a><a class="btn lg ghost" href="${book}">Book Now</a></div></section>
        <section class="section"><div class="container">
         <div class="about"><span class="eyebrow">About</span><h2>Discover ${n}</h2>${MORE[h].map(x => `<p>${x}</p>`).join('')}</div></div></section>
        <section class="section alt" id="places"><div class="container"><div class="title"><span>Places to visit</span><h2>Must-see in ${n}</h2></div>
         <div class="grid pl-grid">${places.map(([pn, pd]) => `<article class="pl reveal"><h3>${pn}</h3><p>${pd}</p></article>`).join('')}</div></div></section>
        <section class="d-stats"><div class="container"><div class="title"><span>Plan your trip</span><h2>Trip essentials</h2></div>
         <div class="stat-row">
          <div class="stat reveal"><i class="fa-regular fa-calendar-check"></i><small>Best time to visit</small><b>${best}</b></div>
          <div class="stat reveal"><i class="fa-regular fa-clock"></i><small>Suggested days</small><b>${days}</b></div></div>
         <div class="center"><a class="btn lg" href="${book}">Book Now</a></div></div></section>
        <section class="section alt" id="related"><div class="container"><div class="title"><span>Keep exploring</span><h2>You may also like</h2></div><div class="loc-grid">${rel.map(locCard).join('')}</div></div></section>`;
    }
  }

  // Destinations page: "See All Destinations" reveals the remaining places on the same page (home links here with ?all=1)
  const more = $('#more-wrap'), sa = $('#see-all');
  if (more && sa) {
    const set = o => { more.classList.toggle('hide', !o); sa.textContent = o ? 'Show Fewer' : 'See All Destinations'; sa.setAttribute('aria-expanded', o); };
    set(new URLSearchParams(location.search).has('all'));
    if (!more.classList.contains('hide')) setTimeout(() => more.scrollIntoView({ behavior: 'smooth' }), 300);
    sa.onclick = () => { const o = more.classList.contains('hide'); set(o); if (o) more.scrollIntoView({ behavior: 'smooth' }); else scrollTo({ top: 0, behavior: 'smooth' }); };
  }

  // "View All Packages" reveals the remaining packages on the same page (home page and Packages page).
  // packages.html?all=1 opens the Packages page with everything already showing.
  [['#pk-all', '#pk-more', true], ['#home-pk-all', '#home-pk-more', false]].forEach(([bs, ms, auto]) => {
    const btn = $(bs), box = $(ms);
    if (!btn || !box) return;
    const set = o => { box.classList.toggle('hide', !o); btn.textContent = o ? 'Show Fewer' : 'View All Packages'; btn.setAttribute('aria-expanded', o); };
    set(auto && new URLSearchParams(location.search).has('all'));
    if (!box.classList.contains('hide')) setTimeout(() => box.scrollIntoView({ behavior: 'smooth' }), 300);
    btn.onclick = () => {
      const o = box.classList.contains('hide');
      set(o);
      (o ? box : btn.closest('section')).scrollIntoView({ behavior: 'smooth' });
    };
  });

  // NOTE: the old click handler on the home gallery tiles was removed on purpose.
  // Home gallery photos are display-only now; the lightbox lives on the Gallery page.

  /* ---------- Home inquiry form → confirmation popup ---------- */
  const iq = $('#inquiry-form');
  if (iq) {
    // Local date (toISOString would give the UTC date, which is yesterday in India before 5:30 AM)
    const now = new Date(), today = new Date(now - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    iq.checkin.min = iq.checkout.min = today;
    iq.checkin.onchange = () => { iq.checkout.min = iq.checkin.value || today; };
    iq.onsubmit = e => {
      e.preventDefault();
      const d = iq.dest.value.trim(), p = +iq.pax.value, a = iq.checkin.value, b = iq.checkout.value;
      const err = !d ? 'Please enter a destination.' : !(p >= 1 && p <= 50) ? 'Enter the number of travellers (1 to 50).'
        : !a ? 'Select a check-in date.' : !b ? 'Select a check-out date.' : b <= a ? 'Check-out must be after check-in.' : '';
      $('.enq-msg', iq).textContent = err;
      if (!err) openModal(d, p, a, b);
    };
    // Confirmation popup (no backend: shows what was entered and resets the form)
    const modal = $('#inq-modal'), back = $('#inq-back');
    const fmt = s => new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const openModal = (d, p, a, b) => {
      $('#m-dest').textContent = d;
      $('#m-pax').textContent = p + (p > 1 ? ' travellers' : ' traveller');
      $('#m-in').textContent = fmt(a); $('#m-out').textContent = fmt(b);
      modal.classList.add('open'); document.body.style.overflow = 'hidden'; back.focus();
    };
    const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
    back.onclick = () => { closeModal(); iq.reset(); scrollTo({ top: 0, behavior: 'smooth' }); };
    modal.onclick = e => { if (e.target === modal) closeModal(); };
    addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  }

  /* ---------- Gallery filter + lightbox (Gallery page only) ---------- */
  const gg = mount('#gal-grid', GAL.map(figure).join(''));
  if (gg) {
    const fb = $$('.filters button'), lb = document.createElement('div'); let cur = 0;
    lb.className = 'lb'; lb.innerHTML = '<button class="x" aria-label="Close"><i class="fa-solid fa-xmark"></i></button><button class="pv" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button><img alt=""><button class="nx" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button><p></p>';
    document.body.append(lb);
    const vis = () => $$('figure:not(.hide)', gg);
    const show = i => {
      const v = vis(), li = $('img', lb), cap = $('figcaption', v[cur = (i + v.length) % v.length]).textContent;
      li.style.visibility = ''; // undo the global "hide broken image" rule from an earlier failed photo
      li.src = v[cur].dataset.full; li.alt = cap;
      $('p', lb).textContent = `${cap} (${cur + 1}/${v.length})`;
    };
    const close = () => lb.classList.remove('open');
    fb.forEach(b => b.onclick = () => { fb.forEach(x => x.classList.remove('on')); b.classList.add('on'); $$('figure', gg).forEach(f => f.classList.toggle('hide', b.dataset.cat !== 'all' && f.dataset.cat !== b.dataset.cat)); });
    $$('figure', gg).forEach(f => { const open = () => { show(vis().indexOf(f)); lb.classList.add('open'); }; f.onclick = open; f.onkeydown = e => e.key === 'Enter' && open(); });
    $('.x', lb).onclick = close; $('.pv', lb).onclick = () => show(cur - 1); $('.nx', lb).onclick = () => show(cur + 1);
    lb.onclick = e => e.target === lb && close();
    addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  }

  /* ---------- Contact form validation (Contact page and the Contact Us section on Home) ---------- */
  const digits = v => v.replace(/\D/g, '').length;
  const rules = {
    name: v => v.length >= 2 || 'Please enter your full name.',
    email: v => /^\S+@\S+\.\S+$/.test(v) || 'Enter a valid email address, e.g. name@mail.com.',
    phone: v => (/^[+\d\s()-]+$/.test(v) && digits(v) >= 7 && digits(v) <= 15) || 'Enter a valid phone number (7 to 15 digits).',
    subject: v => v.length >= 3 || 'Please enter a subject.',
    message: v => v.length >= 10 || 'Your message needs at least 10 characters.'
  };
  const cf = $('#contact-form');
  if (cf) {
    // "Book Now" on the Packages page links here with ?package=...
    const pk = new URLSearchParams(location.search).get('package');
    if (pk) cf.subject.value = 'Booking enquiry: ' + pk;
    // Messages are emailed to MAIL_TO.
    // Option A (recommended): Web3Forms. Get a free access key at https://web3forms.com (enter MAIL_TO there),
    //   then paste the key into W3F_KEY below.
    // Option B (used while W3F_KEY is empty): FormSubmit. The first message sends an activation email to MAIL_TO:
    //   click the confirm link once. It only works when the page is opened over http(s), e.g. Live Server.
    const MAIL_TO = 'shuhaib182004@gmail.com';
    // DEMO MODE: true = the form only SIMULATES sending (shows the "Message Sent!" popup, no email is sent).
    // Set to false to really send through API_URL / W3F_KEY / FormSubmit below.
    const DEMO_MODE = true;
    const W3F_KEY = ''; // e.g. 'a1b2c3d4-....'
    // Option C: your own mail server (server.js). Set to 'http://localhost:3000/api/contact' while it is running.
    const API_URL = '';
    const send = v => API_URL
      ? fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: v('name'), email: v('email'), phone: v('phone'), subject: v('subject'), message: v('message') })
        })
      : W3F_KEY
      ? fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: W3F_KEY, from_name: 'TravelX Website', subject: 'TravelX enquiry: ' + v('subject'),
            name: v('name'), email: v('email'), phone: v('phone'), message: v('message') })
        })
      : fetch('https://formsubmit.co/ajax/' + MAIL_TO, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: v('name'), email: v('email'), phone: v('phone'), subject: v('subject'), message: v('message'),
            _subject: 'TravelX enquiry: ' + v('subject'), _replyto: v('email'), _template: 'table', _captcha: 'false' })
        });
    // Success popup (reuses the .modal styles from the home inquiry popup)
    let sentBox;
    const showSent = name => {
      if (!sentBox) {
        sentBox = document.createElement('div');
        sentBox.className = 'modal';
        sentBox.setAttribute('role', 'dialog'); sentBox.setAttribute('aria-modal', 'true'); sentBox.setAttribute('aria-labelledby', 'sent-title');
        sentBox.innerHTML = '<div class="modal-box"><div class="modal-ic"><i class="fa-solid fa-check"></i></div><h2 id="sent-title">Message Sent!</h2><p></p><button class="btn pri" type="button">OK</button></div>';
        document.body.append(sentBox);
        const hide = () => { sentBox.classList.remove('open'); document.body.style.overflow = ''; };
        $('button', sentBox).onclick = hide;
        sentBox.onclick = e => { if (e.target === sentBox) hide(); };
        addEventListener('keydown', e => { if (e.key === 'Escape' && sentBox.classList.contains('open')) hide(); });
      }
      $('p', sentBox).textContent = `Thank you${name ? ', ' + name : ''}! Your message has been sent to TravelX. We will reply within 24 hours.`;
      sentBox.classList.add('open'); document.body.style.overflow = 'hidden'; $('button', sentBox).focus();
    };
    cf.onsubmit = async e => {
      e.preventDefault(); let ok = true;
      Object.keys(rules).forEach(k => { const f = cf[k], r = rules[k](f.value.trim()); f.parentElement.classList.toggle('bad', r !== true); $('.err', f.parentElement).textContent = r === true ? '' : r; if (r !== true) ok = false; });
      const msg = $('.ok', cf), btn = $('button[type="submit"]', cf);
      if (!ok) { msg.style.display = 'none'; return; }
      const v = k => cf[k].value.trim();
      btn.disabled = true; btn.textContent = 'Sending...';
      let sent = false;
      try {
        if (DEMO_MODE) await new Promise(r => setTimeout(r, 700)); // pretend to send
        else {
          const res = await send(v);
          const data = await res.json();
          if (!res.ok || data.success === false || data.success === 'false') throw new Error(data.message || ('HTTP ' + res.status));
        }
        sent = true;
        const who = v('name');
        cf.reset(); msg.style.display = 'none';
        showSent(who);
      } catch (err) {
        console.error('Contact form error:', err);
        msg.style.background = '#fdecea'; msg.style.color = '#b3261e';
        msg.textContent = 'Sorry, your message could not be sent right now. Please try again in a moment, or call us on +91 89431 03140.';
      }
      msg.style.display = sent ? 'none' : 'block'; btn.disabled = false; btn.textContent = 'Send Message';
    };
  }

  /* ---------- Newsletter ---------- */
  // Old standalone newsletter section (kept so other pages that still have it keep working)
  const nf = $('#news-form');
  if (nf) nf.onsubmit = e => { e.preventDefault(); const ok = rules.email(nf.email.value.trim()) === true; $('.msg', nf.parentElement).textContent = ok ? 'You are subscribed. Watch your inbox for deals!' : 'Enter a valid email address.'; if (ok) nf.reset(); };

  // Footer newsletter (every page)
  const fn = $('#foot-news');
  if (fn) fn.onsubmit = e => {
    e.preventDefault();
    const ok = rules.email(fn.email.value.trim()) === true;
    $('.msg', fn.parentElement).textContent = ok ? 'You are subscribed. Watch your inbox for deals!' : 'Enter a valid email address.';
    if (ok) fn.reset();
  };

  /* ---------- Stat counters ---------- */
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    const end = +e.target.dataset.count; let n = 0; const step = Math.ceil(end / 60);
    const t = setInterval(() => { n = Math.min(n + step, end); e.target.textContent = n.toLocaleString() + '+'; if (n >= end) clearInterval(t); }, 25);
  }), { threshold: .5 });
  $$('[data-count]').forEach(e => co.observe(e));

  // Hide any image that fails to load so cards keep their gradient background
  document.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.style.visibility = 'hidden'; }, true);
  // Hero heading: replay the fade + slide-up when the cursor enters it
  const ht = $('.hero-title');
  if (ht) {
    let busy = false;
    ht.addEventListener('mouseenter', () => {
      if (busy) return; busy = true;
      $$('.line', ht).forEach(l => { l.style.animation = 'none'; void l.offsetWidth; l.style.animation = ''; });
      setTimeout(() => busy = false, 1200);
    });
  }

  // Hero video: fades in once playing, pauses off-screen, skipped for data-saver / reduced motion.
  // If it can't play, the fallback photo behind it stays visible.
  const hv = $('.hero-video');
  if (hv) {
    const skip = (navigator.connection && navigator.connection.saveData) || matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (skip) hv.remove();
    else {
      const ready = () => hv.classList.add('ready');
      hv.addEventListener('playing', ready);
      if (!hv.paused && hv.readyState >= 3) ready(); // "playing" may already have fired before this script ran
      hv.play().catch(() => {});
      new IntersectionObserver(([e]) => e.isIntersecting ? hv.play().catch(() => {}) : hv.pause()).observe(hv);
    }
  }
  reveal();
})();