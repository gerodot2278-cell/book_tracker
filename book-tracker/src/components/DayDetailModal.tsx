import { X } from 'lucide-react';
import type { MockReadingLog } from '../types';

interface DayDetailModalProps {
  date: string;
  logs: MockReadingLog[];
  onClose: () => void;
}

export function DayDetailModal({ date, logs, onClose }: DayDetailModalProps) {
  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr + 'T00:00:00');
    return dateObj.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const totalPagesRead = logs.reduce((sum, log) => sum + log.pagesRead, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
      <div 
        className="bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 capitalize">
              {formatDate(date)}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Прочитано страниц: {totalPagesRead}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logs */}
        <div className="p-6 space-y-4">
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">
                В этот день записей нет
              </p>
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    +{log.pagesRead} стр.
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {log.bookTitle}
                  </span>
                </div>

                {log.photoUrl && (
                  <img
                    src={log.photoUrl}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}

                {log.quote && (
                  <blockquote className="border-l-4 border-purple-500 pl-4 py-2">
                    <p className="text-zinc-700 dark:text-zinc-300 italic text-sm">
                      {log.quote}
                    </p>
                  </blockquote>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
