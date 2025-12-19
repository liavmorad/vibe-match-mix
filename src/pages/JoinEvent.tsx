import { useState } from "react";
import { motion } from "framer-motion";
import { Music, ArrowLeft, LogIn, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import GlassCard from "@/components/GlassCard";
import { toast } from "sonner";

const JoinEvent = () => {
  const navigate = useNavigate();
  const { eventId: paramEventId } = useParams();
  const [eventCode, setEventCode] = useState(paramEventId || "");
  const [step, setStep] = useState(paramEventId ? 2 : 1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleJoin = () => {
    if (eventCode.trim()) {
      setStep(2);
    }
  };

  const connectSpotify = async () => {
    setIsConnecting(true);
    // Simulate Spotify OAuth
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setConnected(true);
    toast.success("Successfully connected to Spotify!");
    
    // Navigate to event after short delay
    setTimeout(() => {
      navigate(`/event/${eventCode}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold">VibeMix</span>
          </div>
        </motion.header>

        <main className="max-w-md mx-auto">
          <GlassCard hover={false} className="p-8">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-display text-3xl font-bold mb-2">
                  Join Event
                </h1>
                <p className="text-muted-foreground mb-8">
                  Enter the event code shared by the host
                </p>

                <Input
                  placeholder="Enter event code"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value.toUpperCase())}
                  className="text-lg text-center font-mono tracking-widest mb-6"
                  maxLength={6}
                />

                <Button
                  size="lg"
                  onClick={handleJoin}
                  disabled={!eventCode.trim()}
                  className="w-full"
                >
                  <LogIn className="w-4 h-4" />
                  Join
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Music className="w-10 h-10 text-primary" />
                  </div>
                  <h1 className="font-display text-2xl font-bold mb-2">
                    Connect Your Music
                  </h1>
                  <p className="text-muted-foreground">
                    Link your Spotify account to add your taste to the mix
                  </p>
                </div>

                {connected ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-lg font-medium">Connected!</p>
                    <p className="text-sm text-muted-foreground">Joining the party...</p>
                  </motion.div>
                ) : (
                  <Button
                    size="xl"
                    variant="glow"
                    onClick={connectSpotify}
                    disabled={isConnecting}
                    className="w-full"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        Connect with Spotify
                      </>
                    )}
                  </Button>
                )}

                <p className="text-xs text-muted-foreground text-center mt-6">
                  We only access your recent listening history to understand your taste.
                </p>
              </motion.div>
            )}
          </GlassCard>
        </main>
      </div>
    </div>
  );
};

export default JoinEvent;
