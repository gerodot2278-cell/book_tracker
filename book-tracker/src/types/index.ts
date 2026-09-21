// Types for the Book Tracker Application

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  total_pages: number;
  cover_url?: string;
  created_at: string;
}

export interface UserBook {
  id: string;
  user_id: string;
  book_id: string;
  status: 'reading' | 'completed' | 'planned';
  current_page: number;
  rating?: number;
  created_at: string;
  book?: Book;
}

export interface ReadingLog {
  id: string;
  user_id: string;
  book_id: string;
  pages_read: number;
  end_page: number;
  quote?: string;
  note?: string;
  photo_url?: string;
  is_public: boolean;
  log_date: string;
  created_at: string;
  book?: Book;
  profile?: Profile;
}

export interface BookTop {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  items?: BookTopItem[];
}

export interface BookTopItem {
  id: string;
  top_id: string;
  book_id: string;
  rank: number;
  comment?: string;
  book?: Book;
}

export interface LogLike {
  id: string;
  user_id: string;
  log_id: string;
  created_at: string;
}

export interface LogComment {
  id: string;
  user_id: string;
  log_id: string;
  content: string;
  created_at: string;
  profile?: Profile;
}

// Mock data types for development
export interface MockReadingLog {
  date: string;
  pagesRead: number;
  photoUrl?: string;
  quote?: string;
  bookTitle: string;
}

export interface ReadingFormData {
  bookId: string;
  pagesRead: number;
  quote?: string;
  note?: string;
  photo?: File;
  isPublic: boolean;
}
