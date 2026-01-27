import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Zap, Sparkles, Palette, Gamepad2, Wifi, MapPin } from 'lucide-react';
import { FilterChip } from '@/components/FilterChip';
import { ActivityCard } from '@/components/ActivityCard';
import { GameCard } from '@/components/GameCard';
import { BottomSheet } from '@/components/BottomSheet';
import { GameModal } from '@/components/GameModal';
import { Button } from '@/components/ui/button';
import { activities, games } from '@/lib/data';
import { Activity, Game, Mood, GameMode } from '@/lib/types';
import { useAppStore } from '@/lib/store';

type PeopleFilter = '1' | '2' | '4+' | null;
type LocationFilter = 'online' | 'in-person' | null;

export const ThingsToDoTab = () => {
  const [peopleFilter, setPeopleFilter] = useState<PeopleFilter>(null);
  const [locationFilter, setLocationFilter] = useState<LocationFilter>(null);
  const [moodFilter, setMoodFilter] = useState<Mood | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [imposterRoles, setImposterRoles] = useState<string[]>([]);
  const [showRoles, setShowRoles] = useState(false);
  
  const { addSavedItem, isSaved } = useAppStore();

  const filteredActivities = activities.filter((activity) => {
    if (moodFilter && activity.mood !== moodFilter) return false;
    return true;
  });

  const filteredGames = games.filter((game) => {
    if (locationFilter && game.mode !== locationFilter) return false;
    if (moodFilter && game.mood !== moodFilter) return false;
    return true;
  });

  const startGame = () => {
    if (!selectedGame) return;
    setCurrentPromptIndex(0);
    setShowRoles(false);
    
    if (selectedGame.title === 'Imposter') {
      const playerCount = 4;
      const roles = Array(playerCount).fill('Player');
      const imposterIndex = Math.floor(Math.random() * playerCount);
      roles[imposterIndex] = 'Imposter';
      setImposterRoles(roles);
    }
    
    setGameModalOpen(true);
  };

  const nextPrompt = () => {
    if (selectedGame?.prompts && currentPromptIndex < selectedGame.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      setCurrentPromptIndex(0);
    }
  };

  const revealRoles = () => {
    setShowRoles(true);
  };

  return (
    <div className="pb-6">
      {/* Filters */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-30 px-4 py-3 -mx-4 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <FilterChip
            label="1 person"
            icon={<User className="w-3.5 h-3.5" />}
            active={peopleFilter === '1'}
            onClick={() => setPeopleFilter(peopleFilter === '1' ? null : '1')}
          />
          <FilterChip
            label="2 people"
            active={peopleFilter === '2'}
            onClick={() => setPeopleFilter(peopleFilter === '2' ? null : '2')}
          />
          <FilterChip
            label="4+ people"
            active={peopleFilter === '4+'}
            onClick={() => setPeopleFilter(peopleFilter === '4+' ? null : '4+')}
          />
          <div className="w-px bg-border mx-1" />
          <FilterChip
            label="Online"
            icon={<Wifi className="w-3.5 h-3.5" />}
            active={locationFilter === 'online'}
            onClick={() => setLocationFilter(locationFilter === 'online' ? null : 'online')}
          />
          <FilterChip
            label="In-person"
            icon={<MapPin className="w-3.5 h-3.5" />}
            active={locationFilter === 'in-person'}
            onClick={() => setLocationFilter(locationFilter === 'in-person' ? null : 'in-person')}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <FilterChip
            label="Chill"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            active={moodFilter === 'chill'}
            onClick={() => setMoodFilter(moodFilter === 'chill' ? null : 'chill')}
          />
          <FilterChip
            label="Active"
            icon={<Zap className="w-3.5 h-3.5" />}
            active={moodFilter === 'active'}
            onClick={() => setMoodFilter(moodFilter === 'active' ? null : 'active')}
          />
          <FilterChip
            label="Creative"
            icon={<Palette className="w-3.5 h-3.5" />}
            active={moodFilter === 'creative'}
            onClick={() => setMoodFilter(moodFilter === 'creative' ? null : 'creative')}
          />
          <FilterChip
            label="Play"
            icon={<Gamepad2 className="w-3.5 h-3.5" />}
            active={moodFilter === 'play'}
            onClick={() => setMoodFilter(moodFilter === 'play' ? null : 'play')}
          />
        </div>
      </div>

      {/* Solo Activities */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Solo Activities
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => setSelectedActivity(activity)}
            />
          ))}
        </div>
      </section>

      {/* Games with Friends */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-primary" />
          With Friends
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => setSelectedGame(game)}
            />
          ))}
        </div>
      </section>

      {/* Activity Bottom Sheet */}
      <BottomSheet
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      >
        {selectedActivity && (
          <div>
            <img
              src={selectedActivity.image}
              alt={selectedActivity.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedActivity.title}</h2>
            <p className="text-muted-foreground mb-4">{selectedActivity.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Duration:</span>
                <span className="text-muted-foreground">{selectedActivity.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Difficulty:</span>
                <span className="capitalize text-muted-foreground">{selectedActivity.difficulty}</span>
              </div>
              <div>
                <span className="font-medium text-sm">Why it's fun:</span>
                <p className="text-sm text-muted-foreground mt-1">{selectedActivity.whyFun}</p>
              </div>
              {selectedActivity.tips && (
                <div>
                  <span className="font-medium text-sm">Tips:</span>
                  <p className="text-sm text-muted-foreground mt-1">{selectedActivity.tips}</p>
                </div>
              )}
            </div>
            
            <Button
              onClick={() => {
                addSavedItem({
                  id: selectedActivity.id,
                  type: 'activity',
                  title: selectedActivity.title,
                  image: selectedActivity.image,
                });
                setSelectedActivity(null);
              }}
              className="w-full"
              disabled={isSaved(selectedActivity.id)}
            >
              {isSaved(selectedActivity.id) ? 'Already Saved' : 'Save Activity'}
            </Button>
          </div>
        )}
      </BottomSheet>

      {/* Game Bottom Sheet */}
      <BottomSheet
        isOpen={!!selectedGame && !gameModalOpen}
        onClose={() => setSelectedGame(null)}
      >
        {selectedGame && (
          <div>
            <img
              src={selectedGame.image}
              alt={selectedGame.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                selectedGame.mode === 'online' ? 'bg-mint/50' : 'bg-peach/50'
              }`}>
                {selectedGame.mode}
              </span>
              <span className="text-sm text-muted-foreground">{selectedGame.players} players</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{selectedGame.title}</h2>
            <p className="text-muted-foreground mb-4">{selectedGame.description}</p>
            
            <div className="space-y-3 mb-6">
              <div>
                <span className="font-medium text-sm">Rules:</span>
                <p className="text-sm text-muted-foreground mt-1">{selectedGame.rules}</p>
              </div>
              {selectedGame.materials && (
                <div>
                  <span className="font-medium text-sm">Materials needed:</span>
                  <p className="text-sm text-muted-foreground mt-1">{selectedGame.materials}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button onClick={startGame} className="flex-1">
                Start Game
              </Button>
              {selectedGame.mode === 'online' && (
                <Button variant="outline" className="flex-1">
                  Invite Friends
                </Button>
              )}
            </div>
          </div>
        )}
      </BottomSheet>

      {/* Game Modal */}
      <GameModal
        isOpen={gameModalOpen}
        onClose={() => {
          setGameModalOpen(false);
          setSelectedGame(null);
        }}
        title={selectedGame?.title || ''}
      >
        {selectedGame && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
            {selectedGame.title === 'Imposter' ? (
              <div className="text-center">
                {!showRoles ? (
                  <>
                    <p className="text-lg mb-6">The secret location is:</p>
                    <motion.div
                      key={currentPromptIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-primary/10 rounded-2xl p-8 mb-8"
                    >
                      <p className="text-3xl font-bold text-primary">
                        {selectedGame.prompts?.[currentPromptIndex]}
                      </p>
                    </motion.div>
                    <Button onClick={revealRoles} size="lg">
                      Reveal Player Roles
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-lg mb-4">Pass the phone to each player:</p>
                    {imposterRoles.map((role, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className={`p-4 rounded-xl ${
                          role === 'Imposter' ? 'bg-destructive/20' : 'bg-success/20'
                        }`}
                      >
                        <p className="font-semibold">Player {index + 1}: {role}</p>
                      </motion.div>
                    ))}
                    <Button onClick={() => { setShowRoles(false); nextPrompt(); }} className="mt-6">
                      New Round
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <motion.div
                  key={currentPromptIndex}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-primary/10 rounded-2xl p-8 mb-8"
                >
                  <p className="text-2xl md:text-3xl font-bold text-primary leading-relaxed">
                    {selectedGame.prompts?.[currentPromptIndex] || selectedGame.rules}
                  </p>
                </motion.div>
                {selectedGame.prompts && (
                  <Button onClick={nextPrompt} size="lg">
                    Next Prompt
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </GameModal>
    </div>
  );
};
