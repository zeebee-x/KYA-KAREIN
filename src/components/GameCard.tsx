import { motion } from 'framer-motion';
import { Users, Wifi, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { Game } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const moodColors = {
  chill: 'bg-sky/30 text-secondary-foreground',
  active: 'bg-coral/30 text-foreground',
  creative: 'bg-lavender/30 text-foreground',
  play: 'bg-lemon/30 text-foreground',
};

export const GameCard = ({ game, onClick }: GameCardProps) => {
  const { isSaved, addSavedItem, removeSavedItem } = useAppStore();
  const saved = isSaved(game.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(game.id);
    } else {
      addSavedItem({
        id: game.id,
        type: 'game',
        title: game.title,
        image: game.image,
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
          src={game.image}
          alt={game.title}
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
        <div className="absolute bottom-3 left-3 flex gap-2">
          <div className={cn('px-2.5 py-1 rounded-full text-xs font-medium', moodColors[game.mood])}>
            {game.mood}
          </div>
          <div className={cn(
            'px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1',
            game.mode === 'online' ? 'bg-mint/50 text-foreground' : 'bg-peach/50 text-foreground'
          )}>
            {game.mode === 'online' ? <Wifi className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
            {game.mode}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">{game.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{game.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>{game.players} players</span>
        </div>
      </div>
    </motion.div>
  );
};
