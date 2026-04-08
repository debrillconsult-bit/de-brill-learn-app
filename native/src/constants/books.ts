export interface Book {
  id: string;
  title: string;
  shortTitle: string;
  series: 'phonics' | 'mep';
  level: string;
  ageRange: string;
  coverColor: string;
  accentColor: string;
  coverImage: any;
  termCount: number;
  unitCount: number;
  description: string;
}

export const BOOKS: Book[] = [
  {
    id: 'bp-pre-nursery',
    title: 'Blended Phonics Pre-Nursery',
    shortTitle: 'BP Pre-Nursery',
    series: 'phonics',
    level: 'Pre-Nursery',
    ageRange: 'Ages 2-3',
    coverColor: '#E74C3C',
    accentColor: '#C0392B',
    coverImage: null,
    termCount: 3,
    unitCount: 12,
    description: 'Introduction to letter sounds and blending for the youngest learners.',
  },
  {
    id: 'bp-nursery-1',
    title: 'Blended Phonics Nursery 1',
    shortTitle: 'BP Nursery 1',
    series: 'phonics',
    level: 'Nursery 1',
    ageRange: 'Ages 3-4',
    coverColor: '#8E44AD',
    accentColor: '#7D3C98',
    coverImage: null,
    termCount: 3,
    unitCount: 15,
    description: 'Building on early phonics with simple blending and word recognition.',
  },
  {
    id: 'bp-nursery-2',
    title: 'Blended Phonics Nursery 2',
    shortTitle: 'BP Nursery 2',
    series: 'phonics',
    level: 'Nursery 2',
    ageRange: 'Ages 4-5',
    coverColor: '#27AE60',
    accentColor: '#1E8449',
    coverImage: null,
    termCount: 3,
    unitCount: 18,
    description: 'Advanced phonics blending and early reading skills.',
  },
  {
    id: 'mep-primary-1',
    title: 'Mastering English Pronunciation Primary 1',
    shortTitle: 'MEP Primary 1',
    series: 'mep',
    level: 'Primary 1',
    ageRange: 'Ages 6-7',
    coverColor: '#1B3A7A',
    accentColor: '#F47920',
    coverImage: null,
    termCount: 3,
    unitCount: 20,
    description: 'Foundation pronunciation skills for Primary 1 learners.',
  },
  {
    id: 'mep-primary-2',
    title: 'Mastering English Pronunciation Primary 2',
    shortTitle: 'MEP Primary 2',
    series: 'mep',
    level: 'Primary 2',
    ageRange: 'Ages 7-8',
    coverColor: '#1B3A7A',
    accentColor: '#4DBBEE',
    coverImage: null,
    termCount: 3,
    unitCount: 20,
    description: 'Expanding pronunciation vocabulary and oral fluency.',
  },
  {
    id: 'mep-primary-3',
    title: 'Mastering English Pronunciation Primary 3',
    shortTitle: 'MEP Primary 3',
    series: 'mep',
    level: 'Primary 3',
    ageRange: 'Ages 8-9',
    coverColor: '#1B3A7A',
    accentColor: '#F47920',
    coverImage: null,
    termCount: 3,
    unitCount: 22,
    description: 'Intermediate pronunciation with stress and intonation.',
  },
  {
    id: 'mep-primary-4',
    title: 'Mastering English Pronunciation Primary 4',
    shortTitle: 'MEP Primary 4',
    series: 'mep',
    level: 'Primary 4',
    ageRange: 'Ages 9-10',
    coverColor: '#1B3A7A',
    accentColor: '#4DBBEE',
    coverImage: null,
    termCount: 3,
    unitCount: 24,
    description: 'Advanced pronunciation with connected speech patterns.',
  },
  {
    id: 'mep-primary-5',
    title: 'Mastering English Pronunciation Primary 5',
    shortTitle: 'MEP Primary 5',
    series: 'mep',
    level: 'Primary 5',
    ageRange: 'Ages 10-11',
    coverColor: '#1B3A7A',
    accentColor: '#F47920',
    coverImage: null,
    termCount: 3,
    unitCount: 26,
    description: 'Mastery-level pronunciation and oral communication.',
  },
];

export const PHONICS_BOOKS = BOOKS.filter(b => b.series === 'phonics');
export const MEP_BOOKS = BOOKS.filter(b => b.series === 'mep');
