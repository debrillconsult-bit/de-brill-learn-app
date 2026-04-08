export interface Phoneme {
  symbol: string;
  example: string;
  type: 'vowel' | 'diphthong' | 'consonant';
  subtype: string;
}

export const PHONEMES: Phoneme[] = [
  // Pure vowels
  { symbol: '/iː/', example: 'Geese', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ɪ/', example: 'Guitar', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ʊ/', example: 'Bosom', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/uː/', example: 'Boom', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/e/', example: 'Leopard', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ə/', example: 'Sailor', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ɜː/', example: 'Dirt', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ɔː/', example: 'Boar', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/æ/', example: 'Plait', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ʌ/', example: 'Southern', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ɑː/', example: 'Heart', type: 'vowel', subtype: 'Pure Vowels' },
  { symbol: '/ɒ/', example: 'Swan', type: 'vowel', subtype: 'Pure Vowels' },
  // Diphthongs
  { symbol: '/ɪə/', example: 'Here', type: 'diphthong', subtype: 'Diphthongs' },
  { symbol: '/eɪ/', example: 'Day', type: 'diphthong', subtype: 'Diphthongs' },
  { symbol: '/ʊə/', example: 'Tour', type: 'diphthong', subtype: 'Diphthongs' },
  { symbol: '/ɔɪ/', example: 'Boy', type: 'diphthong', subtype: 'Diphthongs' },
  { symbol: '/əʊ/', example: 'Go', type: 'diphthong', subtype: 'Diphthongs' },
  { symbol: '/aɪ/', example: 'Fly', type: 'diphthong', subtype: 'Diphthongs' },
  { symbol: '/eə/', example: 'Hair', type: 'diphthong', subtype: 'Diphthongs' },
  { symbol: '/aʊ/', example: 'Now', type: 'diphthong', subtype: 'Diphthongs' },
  // Consonants
  { symbol: '/p/', example: 'Pen', type: 'consonant', subtype: 'Plosives' },
  { symbol: '/b/', example: 'Bat', type: 'consonant', subtype: 'Plosives' },
  { symbol: '/t/', example: 'Top', type: 'consonant', subtype: 'Plosives' },
  { symbol: '/d/', example: 'Dog', type: 'consonant', subtype: 'Plosives' },
  { symbol: '/k/', example: 'Cat', type: 'consonant', subtype: 'Plosives' },
  { symbol: '/ɡ/', example: 'Gun', type: 'consonant', subtype: 'Plosives' },
  { symbol: '/f/', example: 'Fan', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/v/', example: 'Van', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/θ/', example: 'Thin', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/ð/', example: 'This', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/s/', example: 'Sun', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/z/', example: 'Zoo', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/ʃ/', example: 'Ship', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/ʒ/', example: 'Vision', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/h/', example: 'Hat', type: 'consonant', subtype: 'Fricatives' },
  { symbol: '/tʃ/', example: 'Chin', type: 'consonant', subtype: 'Affricates' },
  { symbol: '/dʒ/', example: 'Jam', type: 'consonant', subtype: 'Affricates' },
  { symbol: '/m/', example: 'Man', type: 'consonant', subtype: 'Nasals' },
  { symbol: '/n/', example: 'Nap', type: 'consonant', subtype: 'Nasals' },
  { symbol: '/ŋ/', example: 'Sing', type: 'consonant', subtype: 'Nasals' },
  { symbol: '/l/', example: 'Leg', type: 'consonant', subtype: 'Liquids' },
  { symbol: '/r/', example: 'Run', type: 'consonant', subtype: 'Liquids' },
  { symbol: '/w/', example: 'Win', type: 'consonant', subtype: 'Glides' },
  { symbol: '/j/', example: 'Yes', type: 'consonant', subtype: 'Glides' },
];
