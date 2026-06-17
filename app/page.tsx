"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Singer = "male" | "female";

interface SongResult {
  title: string;
  lyrics: string;
  singer: Singer;
}

type AudioStatus = "idle" | "loading" | "ready" | "error";
type CheckoutStatus = "idle" | "redirecting" | "success" | "error";

// ─── EQ Visualizer ──────────────────────────────────────────────────────────
function EqVisualizer({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-1 rounded-sm bg-gradient-to-t from-[#ff2d78] to-[#9b30ff] ${
            playing ? "eq-bar" : "h-1"
          }`}
          style={playing ? { animationDelay: `${i * 0.08}s` } : undefined}
        />
      ))}
    </div>
  );
}

// ─── Audio Player ────────────────────────────────────────────────────────────
function AudioPlayer({
  title,
  singer,
  taskId,
  saved,
}: {
  title: string;
  singer: Singer;
  taskId: string | null;
  saved: boolean; // song is in the user's library → downloads are free
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [audioStatus, setAudioStatus] = useState<AudioStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pollSeconds, setPollSeconds] = useState(0);
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle");
  const elapsedTickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPoll = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!taskId) return;
    setAudioStatus("loading");
    setPollSeconds(0);

    const poll = async () => {
      try {
        const res = await fetch(`/api/audio/status?taskId=${taskId}`);
        const data = await res.json();
        setPollSeconds((s) => s + 5);
        if (data.done) {
          stopPoll();
          if (data.failed || !data.audioUrl) {
            setAudioStatus("error");
          } else {
            setAudioUrl(data.audioUrl);
            setImageUrl(data.imageUrl ?? null);
            setDuration(data.duration ?? 0);
            setAudioStatus("ready");
          }
        }
      } catch {
        stopPoll();
        setAudioStatus("error");
      }
    };

    poll();
    pollRef.current = setInterval(poll, 5000);
    return () => stopPoll();
  }, [taskId, stopPoll]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
      elapsedTickRef.current = setInterval(() => {
        setElapsed(Math.floor(audio.currentTime));
      }, 500);
    };
    const onPause = () => {
      setPlaying(false);
      if (elapsedTickRef.current) clearInterval(elapsedTickRef.current);
    };
    const onEnded = () => {
      setPlaying(false);
      setElapsed(0);
      if (elapsedTickRef.current) clearInterval(elapsedTickRef.current);
    };
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.floor(audio.duration));
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      if (elapsedTickRef.current) clearInterval(elapsedTickRef.current);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.pause() : audio.play();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
    setElapsed(Math.floor(audio.currentTime));
  };

  const handleDownloadPaywall = async () => {
    if (!taskId) return;
    setCheckoutStatus("redirecting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, songTitle: title }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error("Failed to create checkout");
      window.location.href = data.url;
    } catch {
      setCheckoutStatus("error");
      setTimeout(() => setCheckoutStatus("idle"), 3000);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const singerLabel = singer === "female" ? "Female Vocalist" : "Male Vocalist";
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;

  return (
    <div className="mt-6 rounded-xl border border-[#9b30ff]/40 bg-[#0f0520]/80 p-5 glow-border">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 noise-bg overflow-hidden"
          style={{
            background: imageUrl
              ? undefined
              : "linear-gradient(135deg, #ff2d78, #9b30ff, #00cfff)",
          }}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="cover" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl">🎸</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white truncate">{title}</p>
          <p className="text-sm text-[#9b30ff]">{singerLabel} · AI-generated</p>
        </div>
        {audioStatus === "ready" && <EqVisualizer playing={playing} />}
        {audioStatus === "loading" && (
          <div className="flex flex-col items-end gap-1">
            <svg className="animate-spin w-5 h-5 text-[#9b30ff]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-[10px] text-white/30">{pollSeconds}s</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={seek}>
          <div
            className="h-full bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] progress-bar-fill rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/40 mt-1">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => {
            if (audioRef.current) { audioRef.current.currentTime = 0; setElapsed(0); }
          }}
          className="text-white/40 hover:text-white transition-colors disabled:opacity-20"
          disabled={audioStatus !== "ready"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          disabled={audioStatus !== "ready"}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#9b30ff]/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => {
            if (audioRef.current && duration) {
              audioRef.current.currentTime = duration;
              setElapsed(duration);
            }
          }}
          className="text-white/40 hover:text-white transition-colors disabled:opacity-20"
          disabled={audioStatus !== "ready"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Status messages */}
      {audioStatus === "idle" && !taskId && (
        <p className="text-center text-xs text-white/25 mt-4 italic">
          🎵 Audio will generate after lyrics are ready
        </p>
      )}
      {audioStatus === "loading" && (
        <p className="text-center text-xs text-white/40 mt-4 animate-pulse">
          Generating your song... this takes ~2 minutes ⚡
        </p>
      )}
      {audioStatus === "error" && (
        <p className="text-center text-xs text-[#ff2d78]/70 mt-4">
          Audio generation failed — try generating again
        </p>
      )}

      {/* Download — free for saved (paid) songs, $2.99 paywall otherwise */}
      {audioStatus === "ready" && saved && audioUrl && (
        <div className="mt-5 pt-4 border-t border-white/8">
          <a
            href={`/api/download?url=${encodeURIComponent(audioUrl)}&title=${encodeURIComponent(title)}`}
            download={`${title}.mp3`}
            className="w-full relative rounded-xl py-3 font-bold text-sm tracking-wide transition-all duration-200 overflow-hidden group flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            Download MP3
          </a>
          <p className="text-center text-xs text-white/25 mt-2">
            Saved to your account — download anytime from My Songs
          </p>
        </div>
      )}
      {audioStatus === "ready" && !saved && (
        <div className="mt-5 pt-4 border-t border-white/8">
          <button
            onClick={handleDownloadPaywall}
            disabled={checkoutStatus === "redirecting"}
            className="w-full relative rounded-xl py-3 font-bold text-sm tracking-wide transition-all duration-200 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)" }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            <span className="relative flex items-center justify-center gap-2 text-white">
              {checkoutStatus === "redirecting" ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Redirecting to checkout...
                </>
              ) : checkoutStatus === "error" ? (
                "Something went wrong — try again"
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                  Download MP3 — $2.99
                  <span className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">one-time</span>
                </>
              )}
            </span>
          </button>
          <p className="text-center text-xs text-white/25 mt-2">
            Secure checkout via Stripe · Instant download · Saved to your account
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Lyrics Display ──────────────────────────────────────────────────────────
function LyricsDisplay({ lyrics }: { lyrics: string }) {
  const sections = lyrics.split(/(\[.+?\])/).filter(Boolean);
  return (
    <div className="space-y-4 lyrics-appear">
      {sections.map((section, i) => {
        if (section.match(/^\[.+?\]$/)) {
          return (
            <p key={i} className="text-[#ff2d78] text-xs font-bold tracking-widest uppercase mt-6 first:mt-0">
              {section}
            </p>
          );
        }
        return (
          <div key={i} className="space-y-1">
            {section.trim().split("\n").filter(Boolean).map((line, j) => (
              <p key={j} className="text-white/85 leading-relaxed">{line}</p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── Credit Packs ────────────────────────────────────────────────────────────
function CreditPacks({ onBuy }: { onBuy: (pack: "3pack" | "10pack") => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {/* 3-pack */}
      <button
        onClick={() => onBuy("3pack")}
        className="relative rounded-xl p-4 border-2 border-[#9b30ff]/50 bg-[#9b30ff]/10 hover:border-[#9b30ff] hover:bg-[#9b30ff]/20 text-left transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b30ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="text-3xl font-black text-white">3</div>
          <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">Songs</div>
          <div className="mt-3 text-xl font-black text-[#9b30ff]">$7.49</div>
          <div className="text-xs text-white/40 mt-0.5">~$2.50 / song</div>
        </div>
      </button>

      {/* 10-pack */}
      <button
        onClick={() => onBuy("10pack")}
        className="relative rounded-xl p-4 border-2 border-[#ff2d78]/50 bg-[#ff2d78]/10 hover:border-[#ff2d78] hover:bg-[#ff2d78]/20 text-left transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d78]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -top-1 -right-1">
          <span className="bg-[#ff2d78] text-white text-[10px] font-black px-2 py-0.5 rounded-bl-lg rounded-tr-xl uppercase tracking-wide">
            Best Value
          </span>
        </div>
        <div className="relative">
          <div className="text-3xl font-black text-white">10</div>
          <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">Songs</div>
          <div className="mt-3 text-xl font-black text-[#ff2d78]">$19.99</div>
          <div className="text-xs text-white/40 mt-0.5">~$2.00 / song</div>
        </div>
      </button>
    </div>
  );
}

// ─── My Songs library ────────────────────────────────────────────────────────
interface SavedSong {
  id: string;
  title: string;
  lyrics: string;
  singer: Singer;
  audio_url: string | null;
  image_url: string | null;
  duration: number | null;
  created_at: string;
}

function SongsModal({ onClose }: { onClose: () => void }) {
  const [songs, setSongs] = useState<SavedSong[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch("/api/songs")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setSongs(data.songs ?? []))
      .catch(() => setLoadError(true));
  }, []);

  const togglePlay = (song: SavedSong) => {
    const audio = audioRef.current;
    if (!audio || !song.audio_url) return;
    if (playingId === song.id) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.src = song.audio_url;
      audio.play();
      setPlayingId(song.id);
    }
  };

  const deleteSong = async (id: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    }
    setSongs((prev) => prev?.filter((s) => s.id !== id) ?? null);
    await fetch(`/api/songs?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl border border-[#00cfff]/40 bg-[#0f0520] p-6 shadow-2xl shadow-[#00cfff]/20 lyrics-appear"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <div className="text-center mb-4">
          <p className="text-2xl mb-2">🎵</p>
          <h3 className="text-xl font-black text-white">My Songs</h3>
          <p className="text-xs text-white/40 mt-1">Every song you&apos;ve made with credits, saved forever</p>
        </div>

        <div className="overflow-y-auto flex-1 -mx-2 px-2">
          {loadError ? (
            <p className="text-sm text-[#ff2d78] text-center py-8">Couldn&apos;t load your songs — try again.</p>
          ) : songs === null ? (
            <p className="text-sm text-white/40 text-center py-8">Loading…</p>
          ) : songs.length === 0 ? (
            <p className="text-sm text-white/40 text-center py-8">
              No songs yet — generate one and it&apos;ll be saved here automatically.
            </p>
          ) : (
            <ul className="space-y-3">
              {songs.map((song) => (
                <li key={song.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{
                        background: song.image_url
                          ? undefined
                          : "linear-gradient(135deg, #ff2d78, #9b30ff, #00cfff)",
                      }}
                    >
                      {song.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={song.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">🎸</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm truncate">{song.title}</p>
                      <p className="text-xs text-white/35">
                        {song.singer === "female" ? "Female" : "Male"} vocalist ·{" "}
                        {new Date(song.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {song.audio_url ? (
                      <button
                        onClick={() => togglePlay(song)}
                        className="w-9 h-9 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
                        aria-label={playingId === song.id ? "Pause" : "Play"}
                      >
                        {playingId === song.id ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    ) : (
                      <span className="text-[10px] text-white/30 flex-shrink-0">audio pending</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 pl-14">
                    <button
                      onClick={() => setExpandedId(expandedId === song.id ? null : song.id)}
                      className="text-xs text-[#00cfff] hover:text-[#7ee4ff] transition-colors"
                    >
                      {expandedId === song.id ? "Hide lyrics" : "Lyrics"}
                    </button>
                    {song.audio_url && (
                      <a
                        href={`/api/download?url=${encodeURIComponent(song.audio_url)}&title=${encodeURIComponent(song.title)}`}
                        download={`${song.title}.mp3`}
                        className="text-xs text-[#9b30ff] hover:text-[#b86aff] transition-colors"
                      >
                        Download
                      </a>
                    )}
                    <button
                      onClick={() => deleteSong(song.id)}
                      className="text-xs text-white/25 hover:text-[#ff2d78] transition-colors ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                  {expandedId === song.id && (
                    <div className="mt-3 pl-14 pr-2 max-h-48 overflow-y-auto">
                      <LyricsDisplay lyrics={song.lyrics} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Local persistence of the last generated song ───────────────────────────
// Survives the full-page navigation of sign-in (magic link / Google OAuth),
// tab closes, and refreshes — so a song is never lost mid-session.
const LAST_SONG_KEY = "epg:lastSong";

interface StoredSong {
  title: string;
  lyrics: string;
  singer: Singer;
  taskId: string | null;
  songId: string | null; // set once saved to an account
  paidSessionId: string | null; // Stripe session of the $2.99 download purchase
  savedAt: number;
}

function readStoredSong(): StoredSong | null {
  try {
    const raw = localStorage.getItem(LAST_SONG_KEY);
    if (!raw) return null;
    const song = JSON.parse(raw) as StoredSong;
    if (!song.title || !song.lyrics) return null;
    // Suno audio links go stale; only restore recent songs
    if (Date.now() - song.savedAt > 48 * 60 * 60 * 1000) return null;
    return song;
  } catch {
    return null;
  }
}

function writeStoredSong(song: StoredSong | null) {
  try {
    if (song) localStorage.setItem(LAST_SONG_KEY, JSON.stringify(song));
    else localStorage.removeItem(LAST_SONG_KEY);
  } catch {
    /* private mode etc. */
  }
}

// ─── Main examples ────────────────────────────────────────────────────────────
const EXAMPLES = [
  "I missed your call at 3am",
  "skipping school in november rain",
  "fast times at summer heights",
  "the last text you never read",
];

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { data: session, status: authStatus } = useSession();

  const [words, setWords] = useState("");
  const [singer, setSinger] = useState<Singer>("male");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SongResult | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [noCredits, setNoCredits] = useState(false);
  const [resetAt, setResetAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [creditsSuccess, setCreditsSuccess] = useState(false);

  // Sign-in form state
  const [signInEmail, setSignInEmail] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [signInDone, setSignInDone] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [showBuyCredits, setShowBuyCredits] = useState(false);
  const [buyingCredits, setBuyingCredits] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [showSongs, setShowSongs] = useState(false);
  const [songClaimed, setSongClaimed] = useState(false);
  const [songId, setSongId] = useState<string | null>(null);
  const claimAttemptedRef = useRef(false);

  // ── Fetch credit balance when user is signed in ─────────────────────────────
  const fetchCredits = useCallback(async () => {
    if (authStatus !== "authenticated") return;
    try {
      const res = await fetch("/api/credits");
      const data = await res.json();
      if (typeof data.credits === "number") setCredits(data.credits);
    } catch {
      /* silent */
    }
  }, [authStatus]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  // ── Restore the last generated song after reload or sign-in redirect ────────
  useEffect(() => {
    const stored = readStoredSong();
    if (!stored) return;
    setResult({ title: stored.title, lyrics: stored.lyrics, singer: stored.singer });
    setSinger(stored.singer);
    setSongId(stored.songId);
    if (stored.taskId) setTaskId(stored.taskId);
  }, []);

  // ── Claim a purchased song into the user's account ───────────────────────────
  // Only songs with a verified $2.99 purchase can be claimed; credit-generated
  // songs are saved at generation time and never reach this path.
  const claimStoredSong = useCallback(() => {
    if (authStatus !== "authenticated" || claimAttemptedRef.current) return;
    const stored = readStoredSong();
    if (!stored || stored.songId || !stored.paidSessionId || !stored.taskId) return;
    claimAttemptedRef.current = true;

    fetch("/api/songs/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: stored.title,
        lyrics: stored.lyrics,
        singer: stored.singer,
        taskId: stored.taskId,
        sessionId: stored.paidSessionId,
      }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (data.songId) {
          writeStoredSong({ ...stored, songId: data.songId });
          setSongId(data.songId);
          if (data.claimed) {
            setSongClaimed(true);
            setTimeout(() => setSongClaimed(false), 6000);
          }
        }
      })
      .catch(() => {
        claimAttemptedRef.current = false; // retry on next auth change
      });
  }, [authStatus]);

  useEffect(() => {
    claimStoredSong();
  }, [claimStoredSong]);

  // ── Handle Stripe return URLs ────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const creditsSession = params.get("credits_session");

    // Download payment return
    if (sessionId) {
      window.history.replaceState({}, "", "/");
      fetch(`/api/checkout/verify?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.audioUrl) {
            setPaymentSuccess(true);
            const proxyUrl = `/api/download?url=${encodeURIComponent(data.audioUrl)}&title=${encodeURIComponent(data.songTitle ?? "emo-punk-song")}`;
            setDownloadUrl(proxyUrl);
            const a = document.createElement("a");
            a.href = proxyUrl;
            a.download = `${data.songTitle ?? "emo-punk-song"}.mp3`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => setPaymentSuccess(false), 6000);

            // Mark the stored song as purchased so it can be claimed
            // into the user's account (now, or when they later sign in)
            const stored = readStoredSong();
            if (stored && stored.taskId && stored.taskId === data.taskId) {
              writeStoredSong({ ...stored, paidSessionId: sessionId });
              claimAttemptedRef.current = false;
              claimStoredSong();
            }
          }
        })
        .catch(() => {});
    }

    // Credit purchase return — verify with Stripe and fulfill credits
    if (creditsSession) {
      window.history.replaceState({}, "", "/");
      fetch(`/api/checkout/credits/verify?session_id=${encodeURIComponent(creditsSession)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.ok) {
            setCreditsSuccess(true);
            setNoCredits(false);
            setRateLimited(false);
            if (typeof data.credits === "number") setCredits(data.credits);
            setTimeout(() => setCreditsSuccess(false), 6000);
          }
        })
        .catch(() => {});
    }
  }, [fetchCredits, claimStoredSong]);

  // ── Sign-in handler ──────────────────────────────────────────────────────────
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) return;
    setSigningIn(true);
    setSignInError("");
    try {
      const res = await signIn("resend", { email: signInEmail, redirect: false });
      if (res?.error) {
        setSignInError("Couldn't send the magic link — check the email address and try again.");
      } else {
        setSignInDone(true);
      }
    } catch {
      setSignInError("Something went wrong — try again.");
    } finally {
      setSigningIn(false);
    }
  };

  // ── Buy credits ──────────────────────────────────────────────────────────────
  const handleBuyCredits = async (pack: "3pack" | "10pack") => {
    setBuyingCredits(true);
    setBuyError("");
    try {
      const res = await fetch("/api/checkout/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setBuyError(data.error || "Couldn't start checkout — try again.");
      setBuyingCredits(false);
    } catch {
      setBuyError("Couldn't start checkout — try again.");
      setBuyingCredits(false);
    }
  };

  // ── Generate song ────────────────────────────────────────────────────────────
  const generate = async () => {
    if (!words.trim()) return;
    setLoading(true);
    setError("");
    setRateLimited(false);
    setNoCredits(false);
    setResult(null);
    setTaskId(null);

    try {
      const lyricsRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words, singer }),
      });
      const lyricsData = await lyricsRes.json();

      if (lyricsRes.status === 429) {
        setRateLimited(true);
        setResetAt(lyricsData.resetAt ?? null);
        setLoading(false);
        return;
      }

      if (lyricsRes.status === 402) {
        setNoCredits(true);
        setLoading(false);
        return;
      }

      if (!lyricsRes.ok) throw new Error(lyricsData.error || "Lyrics generation failed");

      setResult(lyricsData);
      if (typeof lyricsData.remaining === "number") setRemaining(lyricsData.remaining);
      if (typeof lyricsData.creditsRemaining === "number") {
        setCredits(lyricsData.creditsRemaining);
      }
      setLoading(false);

      const storedSong: StoredSong = {
        title: lyricsData.title,
        lyrics: lyricsData.lyrics,
        singer,
        taskId: null,
        songId: lyricsData.songId ?? null,
        paidSessionId: null,
        savedAt: Date.now(),
      };
      writeStoredSong(storedSong);
      setSongId(lyricsData.songId ?? null);
      claimAttemptedRef.current = false; // new song, claimable after purchase

      const audioRes = await fetch("/api/audio/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: lyricsData.title,
          lyrics: lyricsData.lyrics,
          singer,
          songId: lyricsData.songId ?? null,
        }),
      });
      const audioData = await audioRes.json();
      if (audioRes.ok && audioData.taskId) {
        setTaskId(audioData.taskId);
        writeStoredSong({ ...storedSong, taskId: audioData.taskId });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  const copyLyrics = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.lyrics}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setResult(null);
    setTaskId(null);
    setSongId(null);
    setWords("");
    setError("");
    setRateLimited(false);
    setNoCredits(false);
    writeStoredSong(null);
  };

  const hoursUntilReset = resetAt
    ? Math.ceil((resetAt - Date.now()) / 1000 / 60 / 60)
    : null;

  const isBlocked = rateLimited || noCredits;
  const isSignedIn = authStatus === "authenticated";

  const signInFormBlock = !signInDone ? (
    <>
      <button
        type="button"
        onClick={() => signIn("google")}
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-white text-[#1f1f1f] font-semibold text-sm px-4 py-2.5 hover:bg-white/90 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        Continue with Google
      </button>
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/30">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <form onSubmit={handleSignIn} className="flex gap-2">
        <input
          type="email"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoFocus
          className="flex-1 min-w-0 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 px-3 py-2.5 text-sm focus:outline-none focus:border-[#9b30ff]/60 transition-all"
        />
        <button
          type="submit"
          disabled={signingIn || !signInEmail.trim()}
          className="rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap"
        >
          {signingIn ? "Sending…" : "Send Magic Link"}
        </button>
      </form>
      {signInError && (
        <p className="text-xs text-[#ff2d78] mt-2 text-center">{signInError}</p>
      )}
      <p className="text-xs text-white/30 mt-3 text-center">
        No password needed — we&apos;ll email you a sign-in link.
      </p>
    </>
  ) : (
    <div className="text-center rounded-xl bg-[#9b30ff]/15 border border-[#9b30ff]/30 py-4 px-4">
      <p className="text-white font-bold text-sm">📬 Check your inbox!</p>
      <p className="text-xs text-white/50 mt-1">
        We sent a magic link to <span className="text-white/70">{signInEmail}</span>. Click it to sign in.
      </p>
      <button
        onClick={() => { setSignInDone(false); setSignInError(""); }}
        className="text-xs text-[#9b30ff] hover:text-[#b86aff] mt-2 underline underline-offset-2"
      >
        Use a different email
      </button>
    </div>
  );

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9b30ff]/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ff2d78]/6 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#00cfff]/3 blur-[180px]" />
        <div className="absolute inset-0 noise-bg opacity-30" />
      </div>

      {/* Payment success banner */}
      {paymentSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl border border-green-500/40 bg-green-500/15 backdrop-blur px-5 py-3 shadow-xl lyrics-appear">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-white text-sm">Payment successful!</p>
            <p className="text-xs text-white/60">Your download has started automatically.</p>
          </div>
          {downloadUrl && (
            <a href={downloadUrl} download className="ml-2 text-xs text-green-400 hover:text-green-300 underline underline-offset-2">
              Download again
            </a>
          )}
        </div>
      )}

      {/* Credits success banner */}
      {creditsSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl border border-[#9b30ff]/40 bg-[#9b30ff]/15 backdrop-blur px-5 py-3 shadow-xl lyrics-appear">
          <span className="text-xl">🎸</span>
          <div>
            <p className="font-bold text-white text-sm">Credits added!</p>
            <p className="text-xs text-white/60">Go make some noise.</p>
          </div>
        </div>
      )}

      {songClaimed && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl border border-[#00cfff]/40 bg-[#00cfff]/15 backdrop-blur px-5 py-3 shadow-xl lyrics-appear">
          <span className="text-xl">🎵</span>
          <div>
            <p className="font-bold text-white text-sm">Song saved to your account!</p>
            <p className="text-xs text-white/60">Find it anytime under My Songs.</p>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">

        {/* ── Auth bar ─────────────────────────────────────────────── */}
        <div className="flex justify-end mb-6 min-h-[32px]">
          {authStatus === "loading" ? null : isSignedIn ? (
            <div className="flex items-center gap-3">
              {/* Credit balance chip */}
              <div className="flex items-center gap-1.5 text-xs border border-[#9b30ff]/40 rounded-full px-3 py-1.5 bg-[#9b30ff]/10">
                <span className="text-[#9b30ff]">⚡</span>
                <span className="text-white font-semibold">
                  {credits === null ? "…" : credits} credit{credits !== 1 ? "s" : ""}
                </span>
              </div>
              {/* My Songs library */}
              <button
                onClick={() => setShowSongs(true)}
                className="text-xs font-bold text-white border border-[#00cfff]/40 bg-[#00cfff]/10 rounded-full px-4 py-1.5 hover:bg-[#00cfff]/20 transition-colors"
              >
                🎵 My Songs
              </button>
              {/* Buy more credits */}
              <button
                onClick={() => { setShowBuyCredits(true); setBuyError(""); }}
                className="text-xs font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] rounded-full px-4 py-1.5 hover:opacity-90 transition-opacity"
              >
                + Buy credits
              </button>
              {/* Sign out */}
              <button
                onClick={() => signOut()}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setShowSignIn(true); setSignInError(""); }}
              className="flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-[#ff2d78] to-[#9b30ff] rounded-full px-5 py-2 hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#9b30ff]/30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Sign In
            </button>
          )}
        </div>

        {/* ── Sign-in modal ───────────────────────────────────────── */}
        {showSignIn && !isSignedIn && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => setShowSignIn(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-sm rounded-2xl border border-[#9b30ff]/40 bg-[#0f0520] p-6 shadow-2xl shadow-[#9b30ff]/20 lyrics-appear"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSignIn(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              <div className="text-center mb-5">
                <p className="text-2xl mb-2">🎸</p>
                <h3 className="text-xl font-black text-white">Sign In</h3>
                <p className="text-xs text-white/40 mt-1">
                  Buy credit packs &amp; keep making songs
                </p>
              </div>
              {signInFormBlock}
            </div>
          </div>
        )}

        {/* ── My Songs modal ──────────────────────────────────────── */}
        {showSongs && isSignedIn && <SongsModal onClose={() => setShowSongs(false)} />}

        {/* ── Buy credits modal ───────────────────────────────────── */}
        {showBuyCredits && isSignedIn && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => !buyingCredits && setShowBuyCredits(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-sm rounded-2xl border border-[#ff2d78]/40 bg-[#0f0520] p-6 shadow-2xl shadow-[#ff2d78]/20 lyrics-appear"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowBuyCredits(false)}
                disabled={buyingCredits}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors disabled:opacity-30"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              <div className="text-center mb-2">
                <p className="text-2xl mb-2">🪙</p>
                <h3 className="text-xl font-black text-white">Buy Credits</h3>
                <p className="text-xs text-white/40 mt-1">
                  1 credit = 1 song · Credits never expire
                </p>
              </div>
              {buyingCredits ? (
                <div className="flex items-center justify-center gap-2 py-8 text-white/50 text-sm">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Redirecting to checkout…
                </div>
              ) : (
                <CreditPacks onBuy={handleBuyCredits} />
              )}
              {buyError && (
                <p className="text-xs text-[#ff2d78] mt-3 text-center">{buyError}</p>
              )}
              <p className="text-center text-xs text-white/25 mt-3">
                Secure checkout via Stripe
              </p>
            </div>
          </div>
        )}

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-4 border border-[#ff2d78]/30 rounded-full px-4 py-1.5">
            <span>⚡</span> AI Song Generator
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 glitch-text leading-none tracking-tight">
            TEXT
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent"> TO </span>
            EMO
          </h1>
          <p className="text-white/50 text-lg">
            Drop your words. We&apos;ll turn them into an emo pop punk song.
          </p>
        </div>

        {/* ── Main card ─────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
          {/* Singer selector */}
          <div className="mb-6">
            <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
              Pick your vocalist
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["male", "female"] as Singer[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSinger(s)}
                  className={`relative rounded-xl p-4 border-2 text-left transition-all duration-200 overflow-hidden ${
                    singer === s
                      ? "border-[#9b30ff] bg-[#9b30ff]/15"
                      : "border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/6"
                  }`}
                >
                  {singer === s && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9b30ff]/10 to-[#ff2d78]/10" />
                  )}
                  <div className="relative">
                    <div className="text-2xl mb-1">{s === "male" ? "🎤" : "🎙️"}</div>
                    <div className="font-bold text-white capitalize">{s}</div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {s === "male"
                        ? "Fall Out Boy · Green Day · MCR"
                        : "Paramore · PVRIS · Avril Lavigne"}
                    </div>
                  </div>
                  {singer === s && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#9b30ff] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="mb-4">
            <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
              Your words / phrase
            </label>
            <textarea
              value={words}
              onChange={(e) => setWords(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate();
              }}
              placeholder="Type anything — a feeling, a memory, a sentence..."
              rows={3}
              className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-base focus:outline-none focus:border-[#9b30ff]/60 focus:bg-white/8 transition-all resize-none"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setWords(ex)}
                  className="text-xs text-white/35 hover:text-[#9b30ff] border border-white/10 hover:border-[#9b30ff]/40 rounded-full px-3 py-1 transition-all"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Counter — show credits if signed in, IP limit otherwise */}
          {isSignedIn
            ? credits !== null && !isBlocked && (
                <div className="flex justify-end mb-2">
                  <span className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">
                    {credits} credit{credits !== 1 ? "s" : ""} remaining
                  </span>
                </div>
              )
            : remaining !== null && !rateLimited && (
                <div className="flex justify-end mb-2">
                  <span className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">
                    {remaining} free song{remaining !== 1 ? "s" : ""} left today
                  </span>
                </div>
              )}

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={loading || !words.trim() || isBlocked}
            className="w-full relative rounded-xl py-4 font-black text-lg tracking-wide uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group"
            style={{
              background:
                loading || !words.trim() || isBlocked
                  ? "rgba(155, 48, 255, 0.3)"
                  : "linear-gradient(135deg, #ff2d78 0%, #9b30ff 50%, #00cfff 100%)",
            }}
          >
            {!loading && !isBlocked && (
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            )}
            <span className="relative text-white">
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Writing your song...
                </span>
              ) : isBlocked ? (
                noCredits ? "🪙 No credits left" : "🚫 Daily limit reached"
              ) : (
                "⚡ Generate Song"
              )}
            </span>
          </button>

          {/* ── Rate limit / no-credits banner ──────────────────────────── */}
          {(rateLimited || noCredits) && (
            <div className="mt-4 rounded-xl border border-[#9b30ff]/30 bg-[#0f0520]/60 px-5 py-5">
              {rateLimited && !isSignedIn && (
                <>
                  <div className="text-center mb-4">
                    <p className="text-2xl mb-1">🎸</p>
                    <p className="font-bold text-white text-sm">You&apos;ve used all 3 free songs today</p>
                    {hoursUntilReset !== null && (
                      <p className="text-xs text-white/40 mt-1">
                        Free limit resets in ~{hoursUntilReset} hour{hoursUntilReset !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-white/50 text-center mb-3">
                      Want more songs now? Sign in to buy a credit pack.
                    </p>
                  </div>
                </>
              )}

              {noCredits && isSignedIn && (
                <div className="text-center mb-4">
                  <p className="text-2xl mb-1">🪙</p>
                  <p className="font-bold text-white text-sm">You&apos;re out of credits</p>
                  <p className="text-xs text-white/40 mt-1">Top up to keep making songs</p>
                </div>
              )}

              {/* Sign-in form (shared block) */}
              {!isSignedIn && signInFormBlock}

              {/* Show credit packs once signed in */}
              {isSignedIn && (
                <>
                  {buyingCredits ? (
                    <div className="flex items-center justify-center gap-2 py-4 text-white/50 text-sm">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Redirecting to checkout…
                    </div>
                  ) : (
                    <CreditPacks onBuy={handleBuyCredits} />
                  )}
                  {buyError && (
                    <p className="text-xs text-[#ff2d78] mt-3 text-center">{buyError}</p>
                  )}
                  <p className="text-center text-xs text-white/25 mt-3">
                    Secure checkout via Stripe · Credits never expire
                  </p>
                </>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg border border-[#ff2d78]/40 bg-[#ff2d78]/10 px-4 py-3 text-sm text-[#ff2d78]">
              {error}
            </div>
          )}
        </div>

        {/* ── Song result ─────────────────────────────────────────────── */}
        {result && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden lyrics-appear">
            <div className="px-6 pt-6 pb-4 border-b border-white/8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-1">Your Song</p>
                  <h2 className="text-2xl font-black text-white leading-tight">{result.title}</h2>
                  <p className="text-sm text-white/40 mt-1">
                    {result.singer === "female" ? "Female" : "Male"} vocalist · Emo Pop Punk
                  </p>
                </div>
                <button
                  onClick={copyLyrics}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs text-white/40 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-3 py-2 transition-all"
                >
                  {copied ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                      </svg>
                      Copy lyrics
                    </>
                  )}
                </button>
              </div>

              <AudioPlayer title={result.title} singer={result.singer} taskId={taskId} saved={!!songId} />
            </div>

            <div className="px-6 py-6">
              <LyricsDisplay lyrics={result.lyrics} />
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={reset}
                className="w-full text-sm text-white/30 hover:text-white/60 border border-white/8 hover:border-white/20 rounded-xl py-3 transition-all"
              >
                Write another song →
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-white/20 mt-10">
          Powered by Claude AI + Suno · Full song in minutes
        </p>
      </div>
    </main>
  );
}
