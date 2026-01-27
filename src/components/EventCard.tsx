import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { Event } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  Wellness: 'bg-mint/50 text-foreground',
  Creative: 'bg-lavender/50 text-foreground',
  Music: 'bg-coral/50 text-foreground',
  Tech: 'bg-sky/50 text-foreground',
  Outdoor: 'bg-lemon/50 text-foreground',
};

export const EventCard = ({ event, onClick }: EventCardProps) => {
  const { isSaved, addSavedItem, removeSavedItem } = useAppStore();
  const saved = isSaved(event.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(event.id);
    } else {
      addSavedItem({
        id: event.id,
        type: 'event',
        title: event.title,
        image: event.image,
        date: event.date,
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-shadow cursor-pointer group"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleSave}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full transition-all',
            saved ? 'bg-primary text-primary-foreground' : 'bg-card/80 backdrop-blur-sm hover:bg-card'
          )}
        >
          {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
        <div className={cn(
          'absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium',
          categoryColors[event.category] || 'bg-muted text-foreground'
        )}>
          {event.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{event.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
