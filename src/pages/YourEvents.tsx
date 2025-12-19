import { motion } from "framer-motion";
import { Music, Users, Calendar, Plus, ArrowRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/ParticleBackground";
import GlassCard from "@/components/GlassCard";

const mockEvents = [
  {
    id: "ABC123",
    title: "Friday Night Vibes",
    description: "A chill party with friends to kick off the weekend",
    participants: 8,
    createdAt: "2024-01-15",
  },
  {
    id: "XYZ789",
    title: "Road Trip Playlist",
    description: "Epic tunes for our cross-country adventure",
    participants: 4,
    createdAt: "2024-01-10",
  },
  {
    id: "DEF456",
    title: "Study Session",
    description: "Lo-fi beats and focus music for productive studying",
    participants: 3,
    createdAt: "2024-01-08",
  },
];

const YourEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between p-6"
        >
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold">JamOn</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="glow" onClick={() => navigate("/create")}>
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              Your Events
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage and view all your music events
            </p>
          </motion.div>

          {mockEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-16"
            >
              <GlassCard className="max-w-md mx-auto">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold mb-2">No events yet</h2>
                <p className="text-muted-foreground mb-6">
                  Create your first event and start mixing music with friends!
                </p>
                <Button variant="glow" onClick={() => navigate("/create")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </GlassCard>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <GlassCard 
                    className="h-full cursor-pointer group"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Music className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                          {event.id}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.participants} participants</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default YourEvents;
