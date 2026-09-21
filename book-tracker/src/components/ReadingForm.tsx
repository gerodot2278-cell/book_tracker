import { useState } from 'react';
import { Book, X, Image, Quote, PenLine, Globe, Lock } from 'lucide-react';
import { UserBook, ReadingFormData } from '../types';

interface ReadingFormProps {
  userBooks: UserBook[];
  onSubmit: (data: ReadingFormData) => void;
  onCancel: () => void;
}

export function ReadingForm({ userBooks, onSubmit, onCancel }: ReadingFormProps) {
  const [bookId, setBookId] = useState<string>('');
  const [pagesRead, setPagesRead] = useState<number>(0);
  const [quote, setQuote] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const readingBooks = userBooks.filter(ub => ub.status === 'reading');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        bookId,
        pagesRead,
        quote: quote || undefined,
        note: note || undefined,
        photo: photo || undefined,
        isPublic,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Зафиксировать чтение
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Book selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Книга
            </label>
            {readingBooks.length > 0 ? (
              <select
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Выберите книгу</option>
                {readingBooks.map(ub => (
                  <option key={ub.id} value={ub.book?.id}>
                    {ub.book?.title} — {ub.book?.author}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Название новой книги"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={(e) => setBookId(e.target.value)}
                required
              />
            )}
          </div>

          {/* Pages read */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Сколько страниц прочитано сегодня
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={pagesRead}
                onChange={(e) => setPagesRead(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
                required
              />
              <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>
          </div>

          {/* Quote */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Цитата
            </label>
            <div className="relative">
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Выпишите понравившуюся цитату..."
                rows={3}
              />
              <Quote className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Заметка или впечатление
            </label>
            <div className="relative">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Поделитесь своими мыслями..."
                rows={3}
              />
              <PenLine className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
            </div>
          </div>

          {/* Photo upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Фото разворота
            </label>
            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <Image className="w-8 h-8 text-zinc-400 mb-2" />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Нажмите для загрузки фото
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Public toggle */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
            <div className="flex items-center gap-3">
              {isPublic ? (
                <Globe className="w-5 h-5 text-purple-500" />
              ) : (
                <Lock className="w-5 h-5 text-zinc-400" />
              )}
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Опубликовать в общую ленту
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isPublic 
                    ? 'Запись будет видна всем пользователям' 
                    : 'Запись видна только в вашем личном календаре'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isPublic ? 'bg-purple-500' : 'bg-zinc-300 dark:bg-zinc-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isPublic ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || !bookId || pagesRead <= 0}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-400 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Сохранение...
              </>
            ) : (
              'Сохранить запись'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
