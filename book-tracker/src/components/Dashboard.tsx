import { BookOpen, TrendingUp, Flame } from 'lucide-react';
import type { UserBook } from '../types';

interface DashboardProps {
  userBooks: UserBook[];
  totalPagesRead: number;
  readingStreak: number;
  onAddReading: () => void;
}

export function Dashboard({ userBooks, totalPagesRead, readingStreak, onAddReading }: DashboardProps) {
  const currentBook = userBooks.find(ub => ub.status === 'reading');
  const progress = currentBook?.book 
    ? Math.round((currentBook.current_page / currentBook.book.total_pages) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{totalPagesRead}</span>
          </div>
          <p className="text-purple-100 text-sm">Страниц прочитано</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{readingStreak}</span>
          </div>
          <p className="text-orange-100 text-sm">Дней подряд</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{userBooks.length}</span>
          </div>
          <p className="text-blue-100 text-sm">Книг в списке</p>
        </div>
      </div>

      {currentBook && currentBook.book && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Читаю сейчас
          </h2>
          
          <div className="flex gap-4">
            <img
              src={currentBook.book.cover_url}
              alt={currentBook.book.title}
              className="w-24 h-36 object-cover rounded-lg shadow-md"
            />
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {currentBook.book.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {currentBook.book.author}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Стр. {currentBook.current_page} из {currentBook.book.total_pages}
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    {progress}%
                  </span>
                </div>
                
                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={onAddReading}
                className="mt-4 w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
              >
                Записать прогресс
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onAddReading}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 text-left hover:border-purple-300 dark:hover:border-purple-700 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                Добавить запись
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Зафиксировать чтение сегодня
              </p>
            </div>
          </div>
        </button>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                Средняя скорость
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                ~{Math.round(totalPagesRead / 7)} стр./день
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
