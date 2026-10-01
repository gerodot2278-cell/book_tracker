// Типы главного экрана FOLIO

export interface LogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  bookTitle: string;
  author: string;
  coverUrl: string;
  pagesRead: number;
  quote?: string;
  note?: string;
  photoUrl?: string;
}

export interface CurrentBook {
  title: string;
  author: string;
  coverUrl: string;
  totalPages: number;
  currentPage: number;
}
