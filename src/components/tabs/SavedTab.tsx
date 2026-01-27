import { motion } from 'framer-motion';
import { Bookmark, Calendar, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

export const SavedTab = () => {
  const { savedItems, removeSavedItem } = useAppStore();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const generateCalendarLink = (item: { title: string; date?: string }) => {
    if (!item.date) return null;
    const startDate = new Date(item.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const formatForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.title)}&dates=${formatForGoogle(startDate)}/${formatForGoogle(endDate)}`;
  };

  if (savedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Bookmark className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No saved items yet</h2>
        <p className="text-muted-foreground">
          Start exploring and save activities, events, and places you love!
        </p>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <h1 className="text-2xl font-bold mb-2">Saved</h1>
      <p className="text-muted-foreground mb-6">{savedItems.length} items saved</p>

      <div className="space-y-3">
        {savedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-xl p-4 shadow-card flex gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs font-medium text-primary capitalize">
                    {item.type}
                  </span>
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  {item.date && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeSavedItem(item.id)}
                  className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {item.date && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const link = generateCalendarLink(item);
                    if (link) window.open(link, '_blank');
                  }}
                  className="mt-3"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Add to Calendar
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
