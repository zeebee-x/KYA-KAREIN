import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { ThingsToDoTab } from '@/components/tabs/ThingsToDoTab';
import { EventsPlacesTab } from '@/components/tabs/EventsPlacesTab';
import { CreateEventTab } from '@/components/tabs/CreateEventTab';
import { SavedTab } from '@/components/tabs/SavedTab';
import { ProfileTab } from '@/components/tabs/ProfileTab';

const tabTitles: Record<string, string> = {
  'things-to-do': 'Discover',
  'events-places': 'Events & Places',
  'create-event': 'Create',
  'saved': 'Saved',
  'profile': 'Profile',
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('things-to-do');

  const renderTab = () => {
    switch (activeTab) {
      case 'things-to-do':
        return <ThingsToDoTab />;
      case 'events-places':
        return <EventsPlacesTab />;
      case 'create-event':
        return <CreateEventTab />;
      case 'saved':
        return <SavedTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <ThingsToDoTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Kya
              </h1>
              <p className="text-xs text-muted-foreground">
                {tabTitles[activeTab]}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
