/**
 * The site's own words and facts: name, navigation, opening hours, contact
 * details and the copy of each page. Edit freely. Every string is plain text
 * (rendered escaped).
 *
 * Anything marked `EDIT:` is a placeholder written for the first version:
 * replace it with the real detail before going live. `sample: true` on a
 * review shows a "Sample review" label on the page until you set it to false.
 *
 * The menu, team and gallery live in their own files:
 *   src/content/menu.json · src/content/team.json · src/content/gallery.json
 */
import coldBrew from '../assets/photos/food-coldbrew.jpg';
import croissant from '../assets/photos/food-croissant.jpg';
import khichuri from '../assets/photos/food-khichuri.jpg';
import shorshe from '../assets/photos/food-shorshe.jpg';

export const SITE = {
  name: 'Muddassir’s Café',
  /** One sentence: the home page's meta description. */
  description:
    'A warm, plant-filled café in Dhanmondi, Dhaka, serving Bengali-fusion comfort food, specialty coffee and fresh bakes. Book a table by phone or WhatsApp.',
  lang: 'en',
  /**
   * The site's public address, for canonical URLs and social cards
   * (`https://www.example.com`, no trailing slash). Leave empty until you have
   * a custom domain: the platform fills in its own address at Publish.
   */
  url: '',
};

export interface NavItem {
  label: string;
  href: string;
}

/** Header navigation (the "Book a table" button is added beside it). */
export const NAV: NavItem[] = [
  {label: 'Menu', href: '/menu/'},
  {label: 'About', href: '/about/'},
  {label: 'Events', href: '/events/'},
  {label: 'Gallery', href: '/gallery/'},
  {label: 'Visit us', href: '/visit/'},
  {label: 'News', href: '/blog/'},
];

/** Footer: every page. */
export const FOOTER_NAV: NavItem[] = [
  {label: 'Home', href: '/'},
  ...NAV,
  {label: 'Book a table', href: '/book/'},
];

/**
 * The café's facts, used on every page (header, footer, Visit, Book) and in
 * the structured data search engines read.
 */
export const CAFE = {
  /** EDIT: the real street address. */
  street: 'House 32, Road 27 (Old)',
  area: 'Dhanmondi',
  city: 'Dhaka',
  postcode: '1209',
  country: 'BD',
  /** EDIT: the real number, as people should dial it, and the same digits for the links. */
  phone: '+880 1000-000000',
  phoneHref: 'tel:+8801000000000',
  /** EDIT: the WhatsApp number, digits only with country code (wa.me links). */
  whatsapp: '8801000000000',
  /** EDIT: an address you read. Booking and enquiry forms open an email to it. */
  email: 'hello@muddassirs-cafe.example',
  /** EDIT: confirm the pin. Used for the map and the "Get directions" link. */
  lat: 23.7544,
  lng: 90.3743,
  /** EDIT: confirm both notes. */
  landmark: 'Two minutes’ walk from Dhanmondi Lake, on Road 27 (Old) just off Satmasjid Road. Look for the terracotta gate and the potted palms.',
  parking: 'Street parking on Road 27 is limited, especially on Friday evenings. Rickshaws, CNGs and ride-shares can drop you right at our gate.',
  bookingPromise: 'We confirm every booking within 30 minutes during opening hours.',
};

/** Week order as it runs in Bangladesh. `day` is JavaScript's getDay() (0 = Sunday). */
export const HOURS = [
  {label: 'Saturday', day: 6, open: '08:00', close: '23:00'},
  {label: 'Sunday', day: 0, open: '08:00', close: '23:00'},
  {label: 'Monday', day: 1, open: '08:00', close: '23:00'},
  {label: 'Tuesday', day: 2, open: '08:00', close: '23:00'},
  {label: 'Wednesday', day: 3, open: '08:00', close: '23:00'},
  {label: 'Thursday', day: 4, open: '08:00', close: '23:00'},
  {label: 'Friday', day: 5, open: '14:00', close: '23:00'},
];

/** The short version, for the header line and the footer. */
export const HOURS_SHORT = ['Sat–Thu 8:00 AM – 11:00 PM', 'Fri 2:00 PM – 11:00 PM'];

/** "14:00" → "2:00 PM" */
export function clock(time: string): string {
  const [h, m] = time.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

export const fullAddress = `${CAFE.street}, ${CAFE.area}, ${CAFE.city} ${CAFE.postcode}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CAFE.lat},${CAFE.lng}`;
export const whatsappUrl = (text = 'Hi! I’d like to book a table at Muddassir’s Café.') =>
  `https://wa.me/${CAFE.whatsapp}?text=${encodeURIComponent(text)}`;

/** The home page, top to bottom. */
export const HOME = {
  hero: {
    title: 'A neighbourhood table where Bengali flavours meet café comfort.',
    alt: 'The dining room: wooden tables under a glass roof, hanging ferns and wicker lamps, a terracotta-tiled floor.',
  },
  intro:
    'Shorshe ilish on sourdough, khichuri slow-cooked like a risotto, a latte that smells of cardamom. We cook what Dhaka grew up on, and serve it the way a café should: unhurried, with good coffee and a seat by the plants.',
  /**
   * Three cards on the home page. Change them whenever the specials change;
   * `note` is the handwritten line on each card.
   */
  specials: [
    {
      name: 'Shorshe Ilish Toast',
      note: 'ilish is in season!',
      description: 'Hilsa in mustard and green chilli on toasted sourdough.',
      price: 420,
      image: shorshe,
      alt: 'Fish fillets in a bright mustard sauce with lemon slices and herbs, in a black pan.',
    },
    {
      name: 'Khichuri Risotto Bowl',
      note: 'rainy-day favourite',
      description: 'Rice and moong dal cooked slow with ghee, finished with fried onions.',
      price: 480,
      image: khichuri,
      alt: 'A creamy rice dish in a wide white bowl, scattered with herbs.',
    },
    {
      name: 'Beef Bhuna Croissant',
      note: 'out of the oven at 11',
      description: 'A butter croissant filled with slow-cooked beef bhuna.',
      price: 390,
      image: croissant,
      alt: 'Two golden croissants on a dark slate, dusted with flour.',
    },
  ],
  /** The menu highlights strip (real prices from the owner). */
  highlights: [
    {name: 'Shorshe Ilish Toast', price: 420},
    {name: 'Khichuri Risotto Bowl', price: 480},
    {name: 'Muddassir’s Signature Cardamom Latte', price: 280},
    {name: 'Beef Bhuna Croissant', price: 390},
    {name: 'Mishti Doi Cheesecake', price: 350},
    {name: 'Cold Brew with Date Molasses', price: 320},
  ],
  coldBrew: {image: coldBrew, alt: 'An iced coffee in a tall glass, cream swirling into it, on a wooden counter.'},
  /** EDIT: replace with real guest quotes, then set `sample: false`. */
  reviews: [
    {
      quote: 'The khichuri risotto tastes like my nani’s, only someone finally let it be fancy. We come every Saturday now.',
      name: 'Nusrat J.',
      detail: 'Regular since 2021',
      stars: 5,
      sample: true,
    },
    {
      quote: 'I came for the cardamom latte and stayed four hours with my laptop. Nobody rushed me once.',
      name: 'Tanvir A.',
      detail: 'Works from table 6',
      stars: 5,
      sample: true,
    },
    {
      quote: 'Booked the private room for Amma’s 60th. They made a mishti doi cheesecake big enough for 18 people.',
      name: 'Farzana R.',
      detail: 'Private dining guest',
      stars: 5,
      sample: true,
    },
    {
      quote: 'Friday acoustic night was packed but the staff still remembered how I take my cold brew. Get there early for the window seats.',
      name: 'Arif H.',
      detail: 'Friday night regular',
      stars: 4,
      sample: true,
    },
  ],
};

export const ABOUT = {
  title: 'About us',
  description:
    'How Muddassir’s Café began on Road 27 in Dhanmondi, the people who run the kitchen and the coffee bar, and how the café has grown since opening day.',
  lede: 'A café that started with one espresso machine and a pot of khichuri, on a street where Muddassir grew up.',
  /** EDIT: Muddassir's own words. This is a first draft to rewrite. */
  founderNote: [
    'I grew up three lanes from here. Dhanmondi afternoons meant the lake, a cup of tea from the corner stall and my mother’s kitchen, where something with mustard oil was always on the stove.',
    'When I came back after years of working in other people’s cafés, I wanted a place that felt like both: good coffee, a quiet table, and food that tastes like home without pretending to be fancy. Shorshe ilish on toast. Khichuri you eat with a spoon, like risotto. Cheesecake that is really mishti doi.',
    'We opened with twelve tables and a lot of plants. Most of the plants are still here, and so are many of the people who sat at those tables in the first week. If you’re new, welcome. Ask for the window seat.',
  ],
  founderSign: 'Muddassir',
  /** EDIT: confirm years and details. */
  timeline: [
    {year: '2019', title: 'Opening day', body: 'Twelve tables, one espresso machine and a pot of khichuri. The first cup went to our landlord, who still comes in on Sundays.'},
    {year: '2022', title: 'The first renovation', body: 'We put in the glass roof, doubled the plants and turned the back storeroom into a private dining room for 18.'},
    {year: 'Today', title: 'Still on Road 27', body: 'Open seven days, with acoustic Fridays, a monthly tasting menu and the same window seats everyone wants.'},
  ],
};

export const EVENTS = {
  title: 'Events & private dining',
  description:
    'Book the private dining room at Muddassir’s Café in Dhanmondi for birthdays, family dinners and team lunches, or join our acoustic Fridays, Saturday brunch and monthly tasting menu.',
  lede: 'A room of your own for family dinners, birthdays and team lunches, and a few evenings a month when the whole café gathers round.',
  /** EDIT: capacity and every price below are first-version guesses. */
  room: {
    seated: 18,
    standing: 24,
    details: [
      'One long table under the plants, or three smaller ones',
      'Its own sound system for speeches and playlists',
      'Set menus built with the kitchen, including vegetarian and kids’ plates',
      'Cakes and dessert platters from our pastry section, ordered ahead',
    ],
    tiers: [
      {name: 'Afternoon tea & bakes', price: 'BDT 950 per guest', body: 'Coffee and tea, savoury bakes and a slice of cake. 3:00 to 6:00 PM, minimum 10 guests.'},
      {name: 'Set lunch or dinner', price: 'From BDT 1,600 per guest', body: 'Three courses chosen from the menu, with soft drinks. Minimum 10 guests.'},
      {name: 'The whole room, your menu', price: 'Minimum spend BDT 30,000', body: 'Exclusive use for the evening, a menu planned with our chef and a dedicated host.'},
    ],
  },
  /** EDIT: confirm days, times and prices. */
  recurring: [
    {
      name: 'Friday acoustic nights',
      when: 'Every Friday, 8:00 to 10:00 PM',
      body: 'Local singers and guitarists in the corner by the plants. No cover charge; tables go fast, so book ahead.',
    },
    {
      name: 'Saturday brunch specials',
      when: 'Every Saturday, 9:00 AM to 1:00 PM',
      body: 'Luchi with cholar dal, egg bhurji on brioche and bottomless filter coffee alongside the regular menu.',
    },
    {
      name: 'The monthly tasting menu',
      when: 'Last Thursday of the month, 7:30 PM',
      body: 'Seven small courses built around one ingredient from the bazaar, for 16 guests at one table. BDT 3,500 per guest.',
    },
  ],
  occasions: ['Birthday', 'Anniversary', 'Family dinner', 'Team lunch or dinner', 'Engagement or wedding party', 'Something else'],
};

export const GALLERY = {
  title: 'Gallery',
  description: 'Photos from Muddassir’s Café in Dhanmondi: the food, the plant-filled dining room, the people behind the counter and our evenings.',
  lede: 'The food, the room, the people who keep it running and the evenings that fill it.',
};

export const VISIT = {
  title: 'Visit us',
  description:
    'Address, map, opening hours and directions for Muddassir’s Café on Road 27, Dhanmondi, Dhaka. Call, WhatsApp or send us a message.',
  lede: 'On Road 27 in Dhanmondi, a short walk from the lake. Come in for a coffee, or call ahead for a table.',
};

export const BOOK = {
  title: 'Book a table',
  description: 'Book a table at Muddassir’s Café in Dhanmondi by WhatsApp, phone or email. We confirm every booking within 30 minutes.',
  lede: 'Tell us when and how many, and we’ll hold a table. We reply within 30 minutes while we’re open.',
};

export const NEWS = {
  title: 'News',
  description: 'New dishes, events and stories from Muddassir’s Café in Dhanmondi, Dhaka.',
  lede: 'New dishes, events, and the odd story from behind the counter.',
};
