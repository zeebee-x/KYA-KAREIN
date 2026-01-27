import { motion } from 'framer-motion';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Activity } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

const moodColors = {
  chill: 'bg-sky/30 text-secondary-foreground',
  active: 'bg-coral/30 text-foreground',
  creative: 'bg-lavender/30 text-foreground',
  play: 'bg-lemon/30 text-foreground',
};

export const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  const { isSaved, addSavedItem, removeSavedItem } = useAppStore();
  const saved = isSaved(activity.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(activity.id);
    } else {
      addSavedItem({
        id: activity.id,
        type: 'activity',
        title: activity.title,
        image: activity.image,
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-shadow cursor-pointer group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
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
        <div className={cn('absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium', moodColors[activity.mood])}>
          {activity.mood}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">{activity.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{activity.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{activity.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};
