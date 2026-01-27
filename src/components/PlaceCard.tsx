import { motion } from 'framer-motion';
import { MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { Place } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  Café: 'bg-peach/50 text-foreground',
  Park: 'bg-mint/50 text-foreground',
  Entertainment: 'bg-lavender/50 text-foreground',
  Art: 'bg-coral/50 text-foreground',
  Sports: 'bg-sky/50 text-foreground',
};

export const PlaceCard = ({ place, onClick }: PlaceCardProps) => {
  const { isSaved, addSavedItem, removeSavedItem } = useAppStore();
  const saved = isSaved(place.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(place.id);
    } else {
      addSavedItem({
        id: place.id,
        type: 'place',
        title: place.name,
        image: place.image,
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
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
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
          categoryColors[place.category] || 'bg-muted text-foreground'
        )}>
          {place.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">{place.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{place.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{place.distance}</span>
        </div>
      </div>
    </motion.div>
  );
};
