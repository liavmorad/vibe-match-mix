import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Users, Play, Share2, Copy, Check, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import ParticleBackground from "@/components/ParticleBackground";
import GlassCard from "@/components/GlassCard";
import ContributionBar from "@/components/ContributionBar";
import MusicWave from "@/components/MusicWave";
import { toast } from "sonner";

const mockParticipants = [
  { id: 1, name: "Alex", avatar: "A", color: "#1DB954", contribution: 28 },
  { id: 2, name: "Jordan", avatar: "J", color: "#9B59B6", contribution: 24 },
  { id: 3, name: "Sam", avatar: "S", color: "#E74C3C", contribution: 22 },
  { id: 4, name: "Taylor", avatar: "T", color: "#3498DB", contribution: 26 },
];

const mockPlaylist = [
  { title: "Blinding Lights", artist: "The Weeknd", contributors: ["Alex", "Jordan"] },
  { title: "Levitating", artist: "Dua Lipa", contributors: ["Sam", "Taylor"] },
  { title: "Good 4 U", artist: "Olivia Rodrigo", contributors: ["Alex", "Sam"] },
  { title: "Heat Waves", artist: "Glass Animals", contributors: ["Jordan", "Taylor"] },
  { title: "Stay", artist: "The Kid LAROI & Justin Bieber", contributors: ["Alex", "Jordan", "Sam"] },
];

const EventDashboard = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [playlistGenerated, setPlaylistGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const joinUrl = `${window.location.origin}/join/${eventId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePlaylist = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setPlaylistGenerated(true);
    toast.success("Playlist generated successfully!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold">JamOn</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Event Code:</span>
            <span className="font-mono font-bold text-primary">{eventId}</span>
          </div>
        </motion.header>

        <main className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Left Column - QR & Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <GlassCard hover={false}>
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Invite Guests
              </h2>
              
              <div className="bg-card/50 rounded-xl p-4 flex justify-center mb-4">
                <QRCodeSVG
                  value={joinUrl}
                  size={180}
                  bgColor="transparent"
                  fgColor="hsl(160, 84%, 45%)"
                  level="M"
                />
              </div>

              <Button variant="outline" className="w-full" onClick={copyLink}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Invite Link
                  </>
                )}
              </Button>
            </GlassCard>

            <GlassCard hover={false}>
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Participants ({mockParticipants.length})
              </h2>

              <div className="space-y-3">
                {mockParticipants.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: p.color + "30", color: p.color }}
                    >
                      {p.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Connected via Spotify</p>
                    </div>
                    <MusicWave barCount={3} />
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column - Playlist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {!playlistGenerated ? (
              <GlassCard hover={false} className="text-center py-16">
                <Sparkles className="w-16 h-16 text-accent mx-auto mb-6 animate-pulse" />
                <h2 className="font-display text-2xl font-bold mb-2">
                  Ready to Generate Your Playlist
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {mockParticipants.length} participants connected. Our AI will analyze everyone's taste and create the perfect mix.
                </p>
                <Button
                  size="xl"
                  variant="glow"
                  onClick={generatePlaylist}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      Mixing Tracks...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Generate Playlist
                    </>
                  )}
                </Button>
              </GlassCard>
            ) : (
              <>
                <GlassCard hover={false}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Your JamOn Mix</h2>
                      <p className="text-muted-foreground">{mockPlaylist.length} tracks • ~18 min</p>
                    </div>
                    <Button variant="glow">
                      <ExternalLink className="w-4 h-4" />
                      Open in Spotify
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {mockPlaylist.map((track, i) => (
                      <motion.div
                        key={track.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-muted-foreground text-sm w-6">{i + 1}</span>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                          <Music className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{track.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-1">
                          {track.contributors.map((c) => {
                            const participant = mockParticipants.find((p) => p.name === c);
                            return (
                              <div
                                key={c}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold -ml-1 first:ml-0 border-2 border-background"
                                style={{
                                  backgroundColor: participant?.color + "40",
                                  color: participant?.color,
                                }}
                              >
                                {c[0]}
                              </div>
                            );
                          })}
                        </div>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <Play className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard hover={false}>
                  <h3 className="font-display text-xl font-semibold mb-6">
                    Taste Contributions
                  </h3>
                  <div className="space-y-4">
                    {mockParticipants.map((p, i) => (
                      <ContributionBar
                        key={p.id}
                        name={p.name}
                        percentage={p.contribution}
                        color={p.color}
                        delay={i * 0.15}
                      />
                    ))}
                  </div>
                </GlassCard>
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default EventDashboard;
