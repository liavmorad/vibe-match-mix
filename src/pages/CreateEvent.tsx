import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import GlassCard from "@/components/GlassCard";

const vibeExamples = [
  "A chill rooftop party at sunset with close friends",
  "High-energy workout session to push limits",
  "Cozy Sunday morning with coffee and breakfast",
  "Late night road trip under the stars",
  "Beach day vibes with summer drinks",
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState("");
  const [vibe, setVibe] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreate = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    // Generate a random event ID
    const eventId = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/event/${eventId}`);
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
            <span className="font-display text-xl font-bold">JamOn</span>
          </div>
        </motion.header>

        <main className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard hover={false} className="p-8">
                  <h1 className="font-display text-3xl font-bold mb-2">
                    Name Your Event
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    Give your gathering a memorable name
                  </p>

                  <Input
                    placeholder="e.g., Sarah's Birthday Bash"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="text-lg mb-8"
                  />

                  <Button
                    size="lg"
                    onClick={() => setStep(2)}
                    disabled={!eventName.trim()}
                    className="w-full"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </GlassCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlassCard hover={false} className="p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <h1 className="font-display text-3xl font-bold">
                      Describe the Vibe
                    </h1>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Tell us about the atmosphere you want to create. Our AI will translate this into the perfect sound.
                  </p>

                  <Textarea
                    placeholder="Describe your event's mood, energy, and atmosphere..."
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className="text-base mb-4 min-h-[140px]"
                  />

                  <div className="mb-8">
                    <p className="text-sm text-muted-foreground mb-3">Try these:</p>
                    <div className="flex flex-wrap gap-2">
                      {vibeExamples.map((example) => (
                        <button
                          key={example}
                          onClick={() => setVibe(example)}
                          className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      size="lg"
                      variant="glow"
                      onClick={handleCreate}
                      disabled={!vibe.trim() || isProcessing}
                      className="flex-1"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating Magic...
                        </>
                      ) : (
                        <>
                          Create Event
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default CreateEvent;
