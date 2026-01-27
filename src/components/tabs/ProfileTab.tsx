import { motion } from 'framer-motion';
import { User, Bookmark, Calendar, Heart } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export const ProfileTab = () => {
  const { savedItems, userEvents } = useAppStore();

  const stats = [
    { label: 'Saved Items', value: savedItems.length, icon: Bookmark, color: 'bg-primary/10 text-primary' },
    { label: 'Events Created', value: userEvents.length, icon: Calendar, color: 'bg-success/10 text-success' },
    { label: 'Activities Done', value: 0, icon: Heart, color: 'bg-accent/10 text-accent' },
  ];

  return (
    <div className="pb-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4"
        >
          <User className="w-12 h-12 text-primary-foreground" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-1">Hey there! 👋</h1>
        <p className="text-muted-foreground">Ready for your next adventure?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 text-center shadow-card"
            >
              <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl p-5 shadow-card">
        <h2 className="font-semibold mb-4">Quick Tips</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <div>
              <p className="font-medium text-sm">Explore Activities</p>
              <p className="text-xs text-muted-foreground">Find something fun to do solo or with friends</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🎮</span>
            <div>
              <p className="font-medium text-sm">Play Games</p>
              <p className="text-xs text-muted-foreground">Start interactive games with built-in prompts</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📅</span>
            <div>
              <p className="font-medium text-sm">Create Events</p>
              <p className="text-xs text-muted-foreground">Host your own gatherings and meetups</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
