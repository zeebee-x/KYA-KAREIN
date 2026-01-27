import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, ExternalLink } from 'lucide-react';
import { FilterChip } from '@/components/FilterChip';
import { EventCard } from '@/components/EventCard';
import { PlaceCard } from '@/components/PlaceCard';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/ui/button';
import { events, places } from '@/lib/data';
import { Event, Place } from '@/lib/types';
import { useAppStore } from '@/lib/store';

type ViewMode = 'events' | 'places';

export const EventsPlacesTab = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const { addSavedItem, isSaved, userEvents } = useAppStore();

  const allEvents = [...events, ...userEvents];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const generateCalendarLink = (event: Event) => {
    const startDate = new Date(`${event.date}T${event.time.replace(' ', '')}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const formatForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatForGoogle(startDate)}/${formatForGoogle(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
  };

  return (
    <div className="pb-6">
      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        <FilterChip
          label="Events"
          icon={<CalendarIcon className="w-3.5 h-3.5" />}
          active={viewMode === 'events'}
          onClick={() => setViewMode('events')}
        />
        <FilterChip
          label="Places"
          icon={<MapPin className="w-3.5 h-3.5" />}
          active={viewMode === 'places'}
          onClick={() => setViewMode('places')}
        />
      </div>

      {viewMode === 'events' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
        </div>
      )}

      {/* Event Bottom Sheet */}
      <BottomSheet
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <div>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
              {selectedEvent.category}
            </span>
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-muted-foreground mb-4">{selectedEvent.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <span>{formatDate(selectedEvent.date)} at {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {selectedEvent.registrationLink && (
                <Button
                  onClick={() => window.open(selectedEvent.registrationLink, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Event
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => window.open(generateCalendarLink(selectedEvent), '_blank')}
                className="w-full"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  addSavedItem({
                    id: selectedEvent.id,
                    type: 'event',
                    title: selectedEvent.title,
                    image: selectedEvent.image,
                    date: selectedEvent.date,
                  });
                  setSelectedEvent(null);
                }}
                className="w-full"
                disabled={isSaved(selectedEvent.id)}
              >
                {isSaved(selectedEvent.id) ? 'Already Saved' : 'Save Event'}
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>

      {/* Place Bottom Sheet */}
      <BottomSheet
        isOpen={!!selectedPlace}
        onClose={() => setSelectedPlace(null)}
      >
        {selectedPlace && (
          <div>
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
              {selectedPlace.category}
            </span>
            <h2 className="text-xl font-bold mb-2">{selectedPlace.name}</h2>
            <p className="text-muted-foreground mb-4">{selectedPlace.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{selectedPlace.address} • {selectedPlace.distance}</span>
              </div>
            </div>
            
            <Button
              onClick={() => {
                addSavedItem({
                  id: selectedPlace.id,
                  type: 'place',
                  title: selectedPlace.name,
                  image: selectedPlace.image,
                });
                setSelectedPlace(null);
              }}
              className="w-full"
              disabled={isSaved(selectedPlace.id)}
            >
              {isSaved(selectedPlace.id) ? 'Already Saved' : 'Save Place'}
            </Button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};
