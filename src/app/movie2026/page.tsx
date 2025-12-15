'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo, useRef } from 'react';
import { ThumbsUp, ThumbsDown, ArrowDown } from 'lucide-react';

type Vote = {
  movie_id: number;
  upvotes: number;
  downvotes: number;
};

const YEAR = 2026;
const LOCAL_STORAGE_KEY = `votedMovies_${YEAR}_v2`;

const SOCIAL_LINKS = [
  { label: 'X', url: 'https://x.com/roissi' },
  { label: 'Insta', url: 'https://www.instagram.com/cyrildegraeve/' },
  { label: 'Lkd', url: 'https://www.linkedin.com/in/cyril-de-graeve/' },
  { label: 'Ghub', url: 'https://github.com/roissi' },
  { label: 'Linktr', url: 'https://linktr.ee/cyrildegraeve' },
];

const movies = [
  {
    id: 0,
    title: 'Une bataille après l’autre',
    director: 'Paul Thomas Anderson',
    poster: '/movies/bataille.webp',
  },
  {
    id: 1,
    title: 'Mektoub, my love : Canto due',
    director: 'Abdellatif Kechiche',
    poster: '/movies/mektoub.webp',
  },
  {
    id: 2,
    title: 'Fragments d’un parcours amoureux',
    director: 'Chloé Barreau',
    poster: '/movies/fragments.webp',
  },
  {
    id: 3,
    title: 'Black dog',
    director: 'Guan Hu',
    poster: '/movies/blackdog.webp',
  },
  {
    id: 4,
    title: 'Eddington',
    director: 'Ari Aster',
    poster: '/movies/eddington.webp',
  },
  {
    id: 5,
    title: 'Les feux sauvages',
    director: 'Jia Zhangke',
    poster: '/movies/feuxsauvages.jpg',
  },
  {
    id: 6,
    title: 'Le rire et le couteau',
    director: 'Pedro Pinho',
    poster: '/movies/rirecouteau.webp',
  },
  {
    id: 7,
    title: 'Évanouis',
    director: 'Zach Cregger',
    poster: '/movies/évanouis.webp',
  },
  {
    id: 8,
    title: 'Babygirl',
    director: 'Halina Reijn',
    poster: '/movies/babygirl.webp',
  },
  {
    id: 9,
    title: 'Deux sœurs',
    director: 'Mike Leigh',
    poster: '/movies/deuxsoeurs.jpg',
  },

  {
    id: 10,
    title: 'Nouvelle vague',
    director: 'Richard Linklater',
    poster: '/movies/nouvellevague.jpg',
  },
  {
    id: 11,
    title: 'Baby invasion',
    director: 'Harmony Korine',
    poster: '/movies/babyinvasion.webp',
  },
  {
    id: 12,
    title: 'Harvest',
    director: 'Athina Rachel Tsangari',
    poster: '/movies/harvest.jpg',
  },
  {
    id: 13,
    title: 'The life of Chuck',
    director: 'Mike Flanagan',
    poster: '/movies/chuck.webp',
  },
  {
    id: 14,
    title: 'Miroirs no. 3',
    director: 'Christian Petzold',
    poster: '/movies/miroirs3.webp',
  },
];

// Variants pour l'animation d'entrée des numéros
const numberVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.3, rotate: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.15 + 0.3,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
};

export default function CinemaPage() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [votedMovies, setVotedMovies] = useState<number[]>([]);
  const [showTop15, setShowTop15] = useState(false);

  const bonusAnchorRef = useRef<HTMLDivElement | null>(null);

  const top10 = useMemo(() => movies.slice(0, 10), []);
  const bonus5 = useMemo(() => movies.slice(10, 15), []);

  useEffect(() => {
    const storedVotes = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    );
    setVotedMovies(storedVotes);

    async function fetchVotes() {
      try {
        const res = await fetch(`/api/votes?year=${YEAR}`);
        if (!res.ok) throw new Error('Erreur');
        const data: Vote[] = await res.json();
        const mappedVotes = movies.map((m) => {
          const v = data.find((dv) => dv.movie_id === m.id);
          return {
            movie_id: m.id,
            upvotes: v?.upvotes ?? 0,
            downvotes: v?.downvotes ?? 0,
          };
        });
        setVotes(mappedVotes);
      } catch (err) {
        console.error(err);
      }
    }
    fetchVotes();
  }, []);

  const handleVote = async (movieId: number, type: 'up' | 'down') => {
    if (votedMovies.includes(movieId)) return;
    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: movieId, type, year: YEAR }),
      });

      if (res.ok) {
        const updatedVoted = [...votedMovies, movieId];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedVoted));
        setVotedMovies(updatedVoted);

        setVotes((prev) =>
          prev.map((v) =>
            v.movie_id === movieId
              ? {
                  ...v,
                  [type === 'up' ? 'upvotes' : 'downvotes']:
                    v[type === 'up' ? 'upvotes' : 'downvotes'] + 1,
                }
              : v
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderMovieCard = (
    movie: (typeof movies)[number],
    globalIndex: number
  ) => {
    const movieVote = votes.find((v) => v.movie_id === movie.id) || {
      upvotes: 0,
      downvotes: 0,
    };
    const hasVoted = votedMovies.includes(movie.id);

    return (
      <motion.div
        key={movie.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (globalIndex % 5) * 0.1 }}
        className="group relative"
      >
        {/* NUMÉRO */}
        <motion.div
          className="absolute -top-10 -left-4 z-20 pointer-events-none"
          variants={numberVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={globalIndex}
        >
          <span className="text-8xl font-black italic leading-none text-yellow-500 drop-shadow-[0_10px_15px_rgba(0,0,0,1)] select-none transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300 inline-block">
            {globalIndex + 1}
          </span>
        </motion.div>

        {/* AFFICHE */}
        <div className="relative z-10 aspect-[2/3] rounded-sm overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover:border-yellow-500/50 shadow-2xl">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-hover:bg-black/85 group-hover:backdrop-blur-md transition-all duration-500 flex flex-col justify-between p-6">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: (globalIndex % 5) * 0.1 + 0.4,
                }}
              >
                <h3 className="text-xl font-black leading-tight text-white uppercase italic mb-2 tracking-tighter transition-colors group-hover:text-yellow-400">
                  {movie.title}
                </h3>
                <p className="text-xs font-bold text-yellow-500 tracking-[0.2em] uppercase transition-colors group-hover:text-white">
                  {movie.director}
                </p>
              </motion.div>
            </div>

            {/* Votes */}
            <div className="mt-auto space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <div className="h-[1px] w-full bg-zinc-700/50" />
              <div className="flex gap-2">
                <button
                  onClick={() => handleVote(movie.id, 'up')}
                  disabled={hasVoted}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm border transition-all duration-300 ${
                    hasVoted
                      ? 'border-zinc-800 text-zinc-600 bg-zinc-900/50 cursor-not-allowed'
                      : 'border-white/10 hover:border-yellow-500 hover:text-yellow-500 text-white bg-white/5 active:scale-95'
                  }`}
                >
                  <ThumbsUp
                    size={14}
                    className={hasVoted ? '' : 'group-hover:animate-pulse'}
                  />
                  <span className="text-[10px] font-black tracking-widest">
                    {movieVote.upvotes}
                  </span>
                </button>

                <button
                  onClick={() => handleVote(movie.id, 'down')}
                  disabled={hasVoted}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm border transition-all duration-300 ${
                    hasVoted
                      ? 'border-zinc-800 text-zinc-600 bg-zinc-900/50 cursor-not-allowed'
                      : 'border-white/10 hover:border-red-500 hover:text-red-500 text-white bg-white/5 active:scale-95'
                  }`}
                >
                  <ThumbsDown size={14} />
                  <span className="text-[10px] font-black tracking-widest">
                    {movieVote.downvotes}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const handleRevealTop15 = () => {
    if (showTop15) return;
    setShowTop15(true);
    requestAnimationFrame(() => {
      setTimeout(
        () =>
          bonusAnchorRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          }),
        50
      );
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-yellow-500/30 pb-20">
      {/* Header Style "Cinéma Premium" */}
      <header className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 z-0" />
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] uppercase italic leading-none">
            <span className="text-zinc-500">Top</span>{' '}
            <span className="text-yellow-500">Ten</span>
            <br />
            <span className="text-white">Ma liste 2025</span>
          </h1>
          <div className="mt-6 h-1 w-24 bg-yellow-500 mx-auto" />
          <p className="mt-6 text-zinc-400 font-medium tracking-widest uppercase text-[10px] md:text-xs">
            Tu peux donner ton avis toi aussi en survolant les affiches des
            films en question
          </p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-20">
          {/* TOP 10 */}
          {top10.map((movie, index) => renderMovieCard(movie, index))}

          {/* BLOC CENTRÉ : card "rab" à gauche + Letterboxd à droite */}
          <div className="lg:col-span-5 flex flex-col lg:flex-row justify-center items-stretch gap-6">
            {/* CARD “TOP 15” */}
            <motion.button
              type="button"
              onClick={handleRevealTop15}
              className="group relative flex-1 max-w-2xl p-10 text-left"
            >
              <div className="h-full w-full rounded-sm border border-zinc-800 bg-zinc-900/20 transition-all duration-300 group-hover:border-violet-500/40 group-hover:bg-zinc-900/35 shadow-2xl p-10">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                  Bonus track
                </p>

                <h3 className="mt-4 text-3xl font-black uppercase italic tracking-tight text-violet-500">
                  Tu veux du rab ?
                  <br />
                  Clique ici
                  <br />
                  <span className="text-zinc-200">
                    (parce que c&apos;est toi)
                  </span>
                </h3>

                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-400 flex items-center gap-3">
                  {showTop15 ? (
                    <>
                      Voilà. Descends{' '}
                      <motion.span
                        className="inline-flex"
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <ArrowDown className="h-5 w-5 text-violet-500" />
                      </motion.span>
                    </>
                  ) : (
                    'Débloque 5 films de plus.'
                  )}
                </p>

                <div className="mt-8 h-[1px] w-full bg-zinc-800/60" />
                <div className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">
                  {showTop15 ? 'MON TOP 15, DU COUP' : 'TOP 10 OFFICIEL'}
                </div>
              </div>
            </motion.button>

            {/* LETTERBOXD */}
            <motion.a
              href="https://letterboxd.com/roissi/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 max-w-2xl p-10"
            >
              <div className="h-full w-full rounded-sm border border-zinc-800 bg-zinc-900/20 shadow-2xl p-10 transition-all duration-300 group-hover:border-lime-500/40 group-hover:bg-zinc-900/35">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                  {/* TEXTE */}
                  <div className="max-w-xl text-center lg:text-left">
                    <h2 className="text-3xl font-black uppercase italic tracking-tight text-lime-400">
                      T&apos;as encore faim ?
                      <br />
                      Viens manger sur mon LetterBoxd
                    </h2>
                    <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-400">
                      Scan le QR code ou clique ici
                    </p>
                  </div>

                  {/* QR */}
                  <div className="relative w-60 h-60 sm:w-80 sm:h-80 group/qr">
                    <div
                      className="
                        absolute -inset-1
                        rounded-[3rem]
                        bg-lime-400/35
                        blur-3xl
                        opacity-0
                        transition-opacity duration-300
                        group-hover/qr:opacity-100
                        pointer-events-none
                      "
                    />
                    <div
                      className="
                        relative z-10 h-full w-full
                        transition-transform duration-300
                        group-hover/qr:-translate-y-1
                      "
                    >
                      <Image
                        src="/movies/ltbxd.png"
                        alt="QR Code LetterBoxd"
                        fill
                        sizes="320px"
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          </div>

          {/* BONUS 5 : on remonte TOUT le bloc bonus (pas juste la 1ère card) */}
          {showTop15 && (
            <div
              ref={bonusAnchorRef}
              className="lg:col-span-5 scroll-mt-24 lg:-mt-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-20">
                {bonus5.map((movie, i) => renderMovieCard(movie, 10 + i))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer avec Liens réels */}
      <footer className="max-w-7xl mx-auto border-t border-zinc-900 pt-12 px-6 flex flex-col md:flex-row justify-between items-center text-zinc-600 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
            © 2026 • Cyril De Graeve
          </p>
        </div>

        <div className="flex gap-10">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition-all duration-300 font-black text-[10px] tracking-[0.3em] uppercase relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-yellow-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
