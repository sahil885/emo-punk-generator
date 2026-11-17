/* eslint-disable @next/next/no-img-element -- third-party badge images; the
   directories ask for their own hosted file, so next/image adds nothing. */

// Site-wide footer. Holds the "featured on" badges directories ask for in
// exchange for a listing — each one is also a backlink back to them.
export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-6">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-4">
        <a href="https://twelve.tools/" target="_blank" rel="noopener">
          <img
            src="https://twelve.tools/badge0-white.svg"
            alt="Featured on Twelve Tools"
            width={200}
            height={54}
            loading="lazy"
          />
        </a>
        <a href="https://showmebest.ai" target="_blank" rel="noopener">
          <img
            src="https://showmebest.ai/badge/feature-badge-white.webp"
            alt="Featured on ShowMeBestAI"
            width={220}
            height={60}
            loading="lazy"
          />
        </a>
      </div>
    </footer>
  );
}
