import { Activity, Game, Event, Place } from './types';

export const activities: Activity[] = [
  {
    id: 'solo-1',
    title: 'Mindful Journaling',
    description: 'Express your thoughts and feelings on paper',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop',
    duration: '20-30 min',
    difficulty: 'easy',
    mood: 'chill',
    whyFun: 'Helps clear your mind and discover new insights about yourself',
    tips: 'Start with 3 things you\'re grateful for today'
  },
  {
    id: 'solo-2',
    title: 'DIY Plant Terrarium',
    description: 'Create your own mini indoor garden',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
    duration: '45-60 min',
    difficulty: 'medium',
    mood: 'creative',
    whyFun: 'Therapeutic and you get a beautiful decoration for your space',
    tips: 'Use succulents for low maintenance'
  },
  {
    id: 'solo-3',
    title: 'Home Yoga Flow',
    description: 'Stretch and strengthen your body at home',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    duration: '30-45 min',
    difficulty: 'easy',
    mood: 'active',
    whyFun: 'Improves flexibility, reduces stress, and boosts energy',
    tips: 'Follow along with YouTube tutorials for beginners'
  },
  {
    id: 'solo-4',
    title: 'Watercolor Painting',
    description: 'Create beautiful artwork with watercolors',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    duration: '1-2 hours',
    difficulty: 'medium',
    mood: 'creative',
    whyFun: 'Relaxing creative outlet that produces beautiful results',
    tips: 'Start with simple landscapes or abstract patterns'
  },
  {
    id: 'solo-5',
    title: 'Podcast Deep Dive',
    description: 'Explore fascinating topics through podcasts',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
    duration: '30-60 min',
    difficulty: 'easy',
    mood: 'chill',
    whyFun: 'Learn something new while relaxing',
    tips: 'Try true crime, history, or comedy genres'
  },
  {
    id: 'solo-6',
    title: 'Dance Workout',
    description: 'Get moving with fun dance routines',
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400&h=300&fit=crop',
    duration: '20-40 min',
    difficulty: 'medium',
    mood: 'active',
    whyFun: 'Burn calories while having a blast',
    tips: 'Start with Just Dance or YouTube dance tutorials'
  }
];

export const games: Game[] = [
  {
    id: 'game-1',
    title: 'Charades',
    description: 'Act out words without speaking',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
    players: '4+',
    mode: 'online',
    mood: 'play',
    rules: 'One player acts out a word while others guess. No speaking or pointing at objects allowed!',
    prompts: ['Dancing penguin', 'Making pizza', 'Astronaut', 'Rock star', 'Zombie', 'Superhero flying', 'Cooking show host', 'Scared ghost', 'Robot malfunction', 'Cat chasing laser']
  },
  {
    id: 'game-2',
    title: 'Imposter',
    description: 'Find the secret imposter among you',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
    players: '4+',
    mode: 'online',
    mood: 'play',
    rules: 'Everyone gets a word except the imposter. Ask questions to find who doesn\'t know the secret word!',
    prompts: ['Beach', 'Hospital', 'Space station', 'Restaurant', 'Library', 'Wedding', 'Gym', 'Airport', 'Zoo', 'Concert']
  },
  {
    id: 'game-3',
    title: 'Truth or Dare',
    description: 'Answer truthfully or complete a dare',
    image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=400&h=300&fit=crop',
    players: '2+',
    mode: 'online',
    mood: 'play',
    rules: 'Take turns choosing truth or dare. If you refuse, you must do both!',
    prompts: [
      'Truth: What\'s your most embarrassing moment?',
      'Dare: Do your best impression of someone in the group',
      'Truth: What\'s your biggest fear?',
      'Dare: Sing the chorus of your favorite song',
      'Truth: Who was your first crush?',
      'Dare: Talk in an accent for the next 3 rounds',
      'Truth: What\'s a secret talent you have?',
      'Dare: Do 10 jumping jacks right now'
    ]
  },
  {
    id: 'game-4',
    title: 'Word Association',
    description: 'Quick-fire word connections',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    players: '2+',
    mode: 'online',
    mood: 'chill',
    rules: 'Say a word related to the previous word. Hesitate too long and you\'re out!',
    prompts: ['Ocean', 'Fire', 'Dream', 'Music', 'Time', 'Love', 'Adventure', 'Magic']
  },
  {
    id: 'game-5',
    title: 'Scavenger Hunt',
    description: 'Race to find items around the house',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    players: '2+',
    mode: 'in-person',
    mood: 'active',
    rules: 'Find items matching the clues before time runs out!',
    materials: 'Timer, clue cards, small prizes'
  },
  {
    id: 'game-6',
    title: 'Pictionary',
    description: 'Draw and guess together',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    players: '4+',
    mode: 'in-person',
    mood: 'creative',
    rules: 'Draw the word on paper while your team guesses. No letters or numbers!',
    materials: 'Paper, markers, timer',
    prompts: ['Bicycle', 'Rainbow', 'Volcano', 'Birthday party', 'Smartphone', 'Surfing', 'Campfire', 'Thunderstorm']
  },
  {
    id: 'game-7',
    title: 'Murder Mystery',
    description: 'Solve the crime together',
    image: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=400&h=300&fit=crop',
    players: '6+',
    mode: 'in-person',
    mood: 'creative',
    rules: 'Each player takes a character role. Investigate, interrogate, and solve the mystery!',
    materials: 'Character cards, clue envelopes, props optional'
  },
  {
    id: 'game-8',
    title: 'Trivia Night',
    description: 'Test your knowledge in teams',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=300&fit=crop',
    players: '4+',
    mode: 'in-person',
    mood: 'play',
    rules: 'Answer trivia questions in categories. Most points wins!',
    materials: 'Question cards, scorecard, prizes'
  }
];

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'Sunset Yoga in the Park',
    description: 'Join us for a relaxing outdoor yoga session as the sun sets. All levels welcome!',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
    date: '2026-02-01',
    time: '5:30 PM',
    category: 'Wellness',
    location: 'Central Park, Green Lawn',
    registrationLink: 'https://example.com/register'
  },
  {
    id: 'event-2',
    title: 'Pottery Workshop',
    description: 'Learn the basics of pottery and create your own ceramic piece to take home.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop',
    date: '2026-02-05',
    time: '2:00 PM',
    category: 'Creative',
    location: 'Arts District Studio',
    registrationLink: 'https://example.com/register'
  },
  {
    id: 'event-3',
    title: 'Indie Music Night',
    description: 'Live performances by local indie bands. Food and drinks available.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
    date: '2026-02-08',
    time: '7:00 PM',
    category: 'Music',
    location: 'The Blue Note Cafe',
    registrationLink: 'https://example.com/register'
  },
  {
    id: 'event-4',
    title: 'Tech Meetup: AI & Design',
    description: 'Explore how AI is transforming the design industry. Network with professionals.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    date: '2026-02-12',
    time: '6:00 PM',
    category: 'Tech',
    location: 'Innovation Hub',
    registrationLink: 'https://example.com/register'
  },
  {
    id: 'event-5',
    title: 'Weekend Hiking Adventure',
    description: 'Explore scenic trails with a group of nature enthusiasts. Moderate difficulty.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
    date: '2026-02-15',
    time: '8:00 AM',
    category: 'Outdoor',
    location: 'Mountain View Trailhead',
    registrationLink: 'https://example.com/register'
  }
];

export const places: Place[] = [
  {
    id: 'place-1',
    name: 'Cozy Corner Café',
    description: 'Perfect spot for reading, working, or catching up with friends over artisan coffee.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    category: 'Café',
    distance: '0.8 km',
    address: '123 Main Street'
  },
  {
    id: 'place-2',
    name: 'Riverside Park',
    description: 'Beautiful green space with walking trails, picnic areas, and stunning river views.',
    image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=400&h=300&fit=crop',
    category: 'Park',
    distance: '1.2 km',
    address: 'River Road'
  },
  {
    id: 'place-3',
    name: 'The Board Game Lounge',
    description: 'Huge collection of board games to play with friends. Snacks and drinks included.',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop',
    category: 'Entertainment',
    distance: '2.1 km',
    address: '45 Fun Street'
  },
  {
    id: 'place-4',
    name: 'Sunrise Art Gallery',
    description: 'Contemporary art exhibitions featuring local and international artists.',
    image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400&h=300&fit=crop',
    category: 'Art',
    distance: '1.5 km',
    address: '78 Gallery Lane'
  },
  {
    id: 'place-5',
    name: 'Urban Climbing Wall',
    description: 'Indoor rock climbing for all skill levels. Equipment rental available.',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=300&fit=crop',
    category: 'Sports',
    distance: '3.2 km',
    address: '90 Adventure Ave'
  }
];
