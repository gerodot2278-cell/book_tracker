import type { CurrentBook, LogEntry } from '../types/app';

export const currentBook: CurrentBook = {
  title: 'Мастер и Маргарита',
  author: 'Михаил Булгаков',
  coverUrl:
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  totalPages: 480,
  currentPage: 214,
};

const isoDate = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

// Моковые записи чтения за текущий месяц
export const initialLogs: LogEntry[] = [
  {
    id: 'log-1',
    date: isoDate(1),
    bookTitle: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    coverUrl: currentBook.coverUrl,
    pagesRead: 45,
    quote: '«Рукописи не горят»',
    note: 'Сцена у Патриарших прудов — эталон мистического реализма.',
    photoUrl:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=600&fit=crop',
  },
  {
    id: 'log-2',
    date: isoDate(2),
    bookTitle: '1984',
    author: 'Джордж Оруэлл',
    coverUrl:
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    pagesRead: 32,
    quote: '«Свобода — это возможность сказать, что дважды два — четыре»',
    note: 'Язык новояза как инструмент уничтожения мысли.',
    photoUrl:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
  },
  {
    id: 'log-3',
    date: isoDate(4),
    bookTitle: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    coverUrl: currentBook.coverUrl,
    pagesRead: 67,
    quote: '«Аннушка уже разлила масло»',
    note: 'Бал у Сатаны. Финал близок.',
  },
  {
    id: 'log-4',
    date: isoDate(6),
    bookTitle: 'Атлант расправил плечи',
    author: 'Айн Рэнд',
    coverUrl:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=600&fit=crop',
    pagesRead: 28,
    quote: '«Клятва, которую я даю себе — никогда не жить ради другого»',
    photoUrl:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop',
  },
  {
    id: 'log-5',
    date: isoDate(9),
    bookTitle: '1984',
    author: 'Джордж Оруэлл',
    coverUrl:
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    pagesRead: 55,
    note: 'Миниправда. Двоемыслие. Перечитываю медленно.',
  },
  {
    id: 'log-6',
    date: isoDate(12),
    bookTitle: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    coverUrl: currentBook.coverUrl,
    pagesRead: 41,
    quote: '«Любовь выскочила перед ними, как из-под земли выпрыгнула»',
    photoUrl:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop',
  },
];

export const monthNamesRu = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const weekdayShortRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const formatDateRu = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${monthNamesRu[d.getMonth()].toLowerCase()}`;
};
