// Mock data for development (Этап 1: Интерактивный UI-прототип)

import type { MockReadingLog, UserBook, Book } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    total_pages: 384,
    cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: '1984',
    author: 'Джордж Оруэлл',
    total_pages: 328,
    cover_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Атлант расправил плечи',
    author: 'Айн Рэнд',
    total_pages: 1152,
    cover_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=450&fit=crop',
    created_at: new Date().toISOString(),
  },
];

export const mockUserBooks: UserBook[] = [
  {
    id: '1',
    user_id: 'user1',
    book_id: '1',
    status: 'reading',
    current_page: 140,
    created_at: new Date().toISOString(),
    book: mockBooks[0],
  },
  {
    id: '2',
    user_id: 'user1',
    book_id: '2',
    status: 'completed',
    current_page: 328,
    rating: 5,
    created_at: new Date().toISOString(),
    book: mockBooks[1],
  },
  {
    id: '3',
    user_id: 'user1',
    book_id: '3',
    status: 'planned',
    current_page: 0,
    created_at: new Date().toISOString(),
    book: mockBooks[2],
  },
];

export const mockReadingLogs: MockReadingLog[] = [
  {
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 45,
    photoUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop',
    quote: '«Рукописи не горят»',
    bookTitle: 'Мастер и Маргарита',
  },
  {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 32,
    photoUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    quote: '«Свобода — это возможность сказать, что дважды два — четыре»',
    bookTitle: '1984',
  },
  {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 67,
    bookTitle: 'Мастер и Маргарита',
  },
  {
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 28,
    photoUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    quote: '«Я хочу говорить с тобой от сердца к сердцу»',
    bookTitle: 'Мастер и Маргарита',
  },
  {
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 55,
    bookTitle: '1984',
  },
  {
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 41,
    photoUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
    quote: '«Большой Брат смотрит на тебя»',
    bookTitle: '1984',
  },
  {
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 38,
    bookTitle: 'Мастер и Маргарита',
  },
  {
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pagesRead: 52,
    photoUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    quote: '«Кто не знает пути к морю, пусть спросит у реки»',
    bookTitle: 'Атлант расправил плечи',
  },
];

export const getLogsForMonth = (year: number, month: number): MockReadingLog[] => {
  return mockReadingLogs.filter(log => {
    const logDate = new Date(log.date);
    return logDate.getFullYear() === year && logDate.getMonth() === month;
  });
};

export const calculateStats = () => {
  const totalPages = mockReadingLogs.reduce((sum, log) => sum + log.pagesRead, 0);
  const totalSessions = mockReadingLogs.length;
  
  return {
    totalPagesReadThisWeek: mockReadingLogs
      .filter(log => {
        const logDate = new Date(log.date);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return logDate >= weekAgo;
      })
      .reduce((sum, log) => sum + log.pagesRead, 0),
    totalPagesReadAllTime: totalPages,
    readingStreak: calculateStreak(),
    averagePagesPerSession: Math.round(totalPages / totalSessions),
  };
};

const calculateStreak = (): number => {
  const sortedDates = [...new Set(mockReadingLogs.map(log => log.date))]
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  let currentDate = new Date(today);
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (sortedDates.includes(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (dateStr === today) {
      currentDate.setDate(currentDate.getDate() - 1);
      continue;
    } else {
      break;
    }
  }
  
  return streak;
};
