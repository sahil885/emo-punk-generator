"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Singer = "male" | "female";

interface SongResult {
  title: string;
  lyrics: string;
  singer: Singer;
}

type AudioStatus = "idle" | "loading" | "ready" | "error";
type CheckoutStatus = "idle" | "redirecting" | "success" | "error";

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

function AudioPlayer({
  title,
  singer,
  taskId,
}: {
  title: string;
  singer: Singer;
  taskId: string | null;
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
        <div
          className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
          onClick={seek}
        >
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

      {/* $1 Download paywall */}
      {audioStatus === "ready" && (
        <div className="mt-5 pt-4 border-t border-white/8">
          <button
            onClick={handleDownloadPaywall}
            disabled={checkoutStatus === "redirecting"}
            className="w-full relative rounded-xl py-3 font-bold text-sm tracking-wide transition-all duration-200 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
            }}
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
                  Download MP3 — $1
                  <span className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">one-time</span>
                </>
              )}
            </span>
          </button>
          <p className="text-center text-xs text-white/25 mt-2">
            Secure checkout via Stripe · Instant download after payment
          </p>
        </div>
      )}
    </div>
  );
}

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

const EXAMPLES = [
  "I missed your call at 3am",
  "skipping school in november rain",
  "my hoodie still smells like you",
  "the last text you never read",
];

export default function Home() {
  const [words, setWords] = useState("");
  const [singer, setSinger] = useState<Singer>("male");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SongResult | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [resetAt, setResetAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Handle return from Stripe checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    // Clean the URL immediately
    window.history.replaceState({}, "", "/");

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.audioUrl) {
          setPaymentSuccess(true);

          // Build a proxied URL so the browser gets the right filename
          const proxyUrl = `/api/download?url=${encodeURIComponent(data.audioUrl)}&title=${encodeURIComponent(data.songTitle ?? "emo-punk-song")}`;
          setDownloadUrl(proxyUrl);

          // Auto-trigger download
          const a = document.createElement("a");
          a.href = proxyUrl;
          a.download = `${data.songTitle ?? "emo-punk-song"}.mp3`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Hide banner after 6 seconds
          setTimeout(() => setPaymentSuccess(false), 6000);
        }
      })
      .catch(() => {/* silently fail */});
  }, []);

  const generate = async () => {
    if (!words.trim()) return;
    setLoading(true);
    setError("");
    setRateLimited(false);
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

      if (!lyricsRes.ok) throw new Error(lyricsData.error || "Lyrics generation failed");

      setResult(lyricsData);
      if (typeof lyricsData.remaining === "number") setRemaining(lyricsData.remaining);
      setLoading(false);

      const audioRes = await fetch("/api/audio/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: lyricsData.title, lyrics: lyricsData.lyrics, singer }),
      });
      const audioData = await audioRes.json();
      if (audioRes.ok && audioData.taskId) setTaskId(audioData.taskId);
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
    setWords("");
    setError("");
    setRateLimited(false);
  };

  const hoursUntilReset = resetAt
    ? Math.ceil((resetAt - Date.now()) / 1000 / 60 / 60)
    : null;

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
            <a
              href={downloadUrl}
              download
              className="ml-2 text-xs text-green-400 hover:text-green-300 underline underline-offset-2"
            >
              Download again
            </a>
          )}
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff2d78] uppercase mb-4 border border-[#ff2d78]/30 rounded-full px-4 py-1.5">
            <span>⚡</span> AI Song Generator
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 glitch-text leading-none tracking-tight">
            SCREAM
            <span className="bg-gradient-to-r from-[#ff2d78] via-[#9b30ff] to-[#00cfff] bg-clip-text text-transparent"> IT </span>
            OUT
          </h1>
          <p className="text-white/50 text-lg">
            Drop your words. We&apos;ll turn them into an emo pop punk song.
          </p>
        </div>

        {/* Main card */}
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

          {/* Daily limit counter */}
          {remaining !== null && !rateLimited && (
            <div className="flex justify-end mb-2">
              <span className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">
                {remaining} song{remaining !== 1 ? "s" : ""} left today
              </span>
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={loading || !words.trim() || rateLimited}
            className="w-full relative rounded-xl py-4 font-black text-lg tracking-wide uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group"
            style={{
              background:
                loading || !words.trim() || rateLimited
                  ? "rgba(155, 48, 255, 0.3)"
                  : "linear-gradient(135deg, #ff2d78 0%, #9b30ff 50%, #00cfff 100%)",
            }}
          >
            {!loading && !rateLimited && (
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
              ) : rateLimited ? (
                "🚫 Daily limit reached"
              ) : (
                "⚡ Generate Song"
              )}
            </span>
          </button>

          {/* Rate limit banner */}
          {rateLimited && (
            <div className="mt-4 rounded-xl border border-[#ff2d78]/30 bg-[#ff2d78]/8 px-4 py-4 text-center">
              <p className="text-2xl mb-1">🎸</p>
              <p className="font-bold text-white text-sm">You&apos;ve used all 3 songs for today</p>
              <p className="text-xs text-white/50 mt-1">
                {hoursUntilReset !== null
                  ? `Resets in ~${hoursUntilReset} hour${hoursUntilReset !== 1 ? "s" : ""}`
                  : "Come back tomorrow"}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg border border-[#ff2d78]/40 bg-[#ff2d78]/10 px-4 py-3 text-sm text-[#ff2d78]">
              {error}
            </div>
          )}
        </div>

        {/* Result */}
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

              <AudioPlayer title={result.title} singer={result.singer} taskId={taskId} />
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
