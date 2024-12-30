'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Déclaration du type Vote
type Vote = {
  movie_id: number;
  upvotes: number;
  downvotes: number;
};

const movies = [
  {
    id: 0,
    title: 'Joker : folie à deux',
    director: 'Todd Phillips',
    poster: '/movies/jocker2.jpg',
  },
  {
    id: 1,
    title: 'Miséricorde',
    director: 'Alain Guiraudie',
    poster: '/movies/misericorde.jpg',
  },
  {
    id: 2,
    title: 'Civil war',
    director: 'Alex Garland',
    poster: '/movies/civilwar.jpg',
  },
  {
    id: 3,
    title: 'Furiosa : une saga Mad Max',
    director: 'George Miller',
    poster: '/movies/furiosa.jpg',
  },
  {
    id: 4,
    title: 'Cent mille milliards',
    director: 'Virgil Vernier',
    poster: '/movies/centmillemilliards.jpg',
  },
  {
    id: 5,
    title: 'Les reines du drame',
    director: 'Alexis Langlois',
    poster: '/movies/lesreinesdudrame.jpg',
  },
  {
    id: 6,
    title: 'Los delincuentes',
    director: 'Rodrigo Moreno',
    poster: '/movies/losdelicuentes.jpg',
  },
  {
    id: 7,
    title: 'La zone d’intérêt',
    director: 'Jonathan Glazer',
    poster: '/movies/lazonedinteret.jpg',
  },
  {
    id: 8,
    title: 'The sweet east',
    director: 'Sean Price Williams',
    poster: '/movies/thesweeteast.jpg',
  },
  {
    id: 9,
    title: 'Anora',
    director: 'Sean Baker',
    poster: '/movies/anora.jpg',
  },
];

const CinemaPage = () => {
  const [votes, setVotes] = useState<Vote[]>([]); // Déclare votes comme un tableau de Vote
  const [votedMovies, setVotedMovies] = useState<number[]>([]); // Déclare votedMovies comme un tableau de nombres
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);

  useEffect(() => {
    const LOCAL_STORAGE_KEY = 'votedMovies';
    const storedVotesString = localStorage.getItem(LOCAL_STORAGE_KEY); // Cela retourne "string | null"
    const storedVotes = storedVotesString ? JSON.parse(storedVotesString) : []; // Vérifiez si "storedVotesString" n'est pas null
    setVotedMovies(storedVotes);
  }, []);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const res = await fetch('/api/votes');
        if (!res.ok) throw new Error('Erreur lors du chargement des votes');
        const data: Vote[] = await res.json();
        const mappedVotes = movies.map((movie) => {
          const voteData = data.find(
            (vote: Vote) => vote.movie_id === movie.id
          );
          return {
            movie_id: movie.id,
            upvotes: voteData?.upvotes || 0,
            downvotes: voteData?.downvotes || 0,
          };
        });
        setVotes(mappedVotes);
      } catch (err) {
        if (err instanceof Error) {
          console.error(
            'Erreur lors de la récupération des votes :',
            err.message
          );
        } else {
          console.error(
            'Erreur inconnue lors de la récupération des votes :',
            err
          );
        }
      }
    }
    fetchVotes();
  }, []);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouchDevice();

    const handleResize = () => {
      if (window.innerWidth > 640) {
        setActiveHover(null); // Réinitialisez sur les affichages desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleVote = async (movieId: number, type: 'up' | 'down') => {
    const LOCAL_STORAGE_KEY = 'votedMovies';
    const storedVotes = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    ) as number[];

    // Vérifiez si l'utilisateur a déjà voté pour ce film
    if (storedVotes.includes(movieId)) {
      alert('Tu as déjà voté pour ce film, calme-toi :)');
      return;
    }

    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: movieId, type }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Erreur API: ${res.status} - ${errorData.error || 'Unknown error'}`
        );
      }

      // Ajouter le film dans les votes locaux
      const updatedVotes = [...storedVotes, movieId];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedVotes));
      setVotedMovies(updatedVotes);

      // Recharger les votes après la mise à jour
      const updatedVotesFromApi = await fetch('/api/votes').then((res) =>
        res.json()
      );
      setVotes(updatedVotesFromApi);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Erreur lors de la mise à jour des votes :', err.message);
      } else {
        console.error(
          'Erreur inconnue lors de la mise à jour des votes :',
          err
        );
      }
    }
  };

  const shareUrl = 'https://www.bethere.cyrildegraeve.dev/';
  const shareText = 'Découvrez le Top 10 Cinéma 2024 de Roissi !';

  return (
    <div className="font-figtree bg-gray-200 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center py-12 px-6 relative">
        <motion.h1
          className="text-center text-3xl sm:text-4xl font-extrabold text-black bg-yellow-500 px-8 py-4 rounded-full shadow-md border-2 border-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Top 10 Cinéma 2024
        </motion.h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl mt-16">
          {movies.map((movie, index) => {
            const movieVote = votes.find(
              (vote) => vote.movie_id === movie.id
            ) || { upvotes: 0, downvotes: 0 };
            const hasVoted = votedMovies.includes(movie.id);
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out"
              >
                <motion.div
                  className={`relative w-full h-full group rounded-lg overflow-hidden`}
                  onClick={
                    isTouchDevice
                      ? () =>
                          setActiveHover(activeHover === index ? null : index)
                      : undefined
                  }
                >
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={240}
                    height={360}
                    className="w-full object-cover"
                  />
                  <motion.div
                    className={`absolute inset-0 bg-black/80 flex flex-col items-center justify-center transition duration-500 text-center px-2 ${
                      isTouchDevice
                        ? activeHover === index
                          ? 'opacity-100 pointer-events-auto'
                          : 'opacity-0 pointer-events-none'
                        : 'sm:opacity-0 sm:group-hover:opacity-100'
                    }`}
                  >
                    <p className="text-yellow-500 text-4xl font-bold">
                      {movie.title}
                    </p>
                    <p className="text-white text-5xl font-medium mt-4">
                      {movie.director}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        className={`flex items-center gap-1 bg-gray-200 text-black px-3 py-1 rounded-md ${
                          hasVoted
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleVote(movie.id, 'up')}
                        disabled={hasVoted}
                      >
                        😊 {movieVote.upvotes}
                      </button>
                      <button
                        className={`flex items-center gap-1 bg-gray-200 text-black px-3 py-1 rounded-md ${
                          hasVoted
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleVote(movie.id, 'down')}
                        disabled={hasVoted}
                      >
                        😞 {movieVote.downvotes}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Numéro en pastille stylisée */}
                {index === 0 ? (
                  <motion.div
                    className="absolute -top-6 left-2 bg-yellow-500 text-black border-4 border-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-extrabold shadow-xl"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.8, 1], rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {index + 1}
                  </motion.div>
                ) : index === 1 ? (
                  <motion.div
                    className="absolute -top-6 left-2 bg-yellow-500 text-black border-4 border-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-extrabold shadow-xl"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {index + 1}
                  </motion.div>
                ) : index === 2 ? (
                  <motion.div
                    className="absolute -top-6 left-2 bg-yellow-500 text-black border-4 border-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-extrabold shadow-xl"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {index + 1}
                  </motion.div>
                ) : (
                  <div className="absolute -top-6 left-2 bg-yellow-500 text-black border-4 border-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-extrabold shadow-xl">
                    {index + 1}
                  </div>
                )}
              </motion.li>
            );
          })}

          {/* Texte occupant 2 colonnes sur les écrans larges, à droite */}
          <div className="flex items-center justify-center px-6 py-4 bg-yellow-500 text-black text-center rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-2 lg:row-start-3 lg:col-start-3">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Tu veux afficher sur les Internets ton Top 10 à toi ?{' '}
              <motion.a
                href="https://www.bethere.cyrildegraeve.dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactez-moi via ce lien"
                className="text-black font-bold inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Contacte-moi
              </motion.a>
              . Donne-moi ta liste et le classement, et je m&apos;occupe de
              tout.
            </p>
          </div>
        </ul>
      </div>

      {/* Boutons de partage */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-lg font-semibold text-gray-700">
          Si tu veux partager mon travail :
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partager sur Facebook"
          >
            <Image
              src="/movies/facebook-round-color-icon.svg"
              alt="Partager sur Facebook"
              width={40}
              height={40}
              className="rounded-full hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partager sur X"
          >
            <Image
              src="/movies/x-social-media-round-icon.svg"
              alt="Partager sur X"
              width={40}
              height={40}
              className="rounded-full hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partager sur Instagram"
          >
            <Image
              src="/movies/ig-instagram-icon.svg"
              alt="Partager sur Instagram"
              width={40}
              height={40}
              className="rounded-full hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Partager sur LinkedIn"
          >
            <Image
              src="/movies/linkedin-app-icon.svg"
              alt="Partager sur LinkedIn"
              width={40}
              height={40}
              className="rounded-full hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>

      <footer className="w-full py-4 text-center text-black font-medium mt-4">
        © 2025 | CDG
      </footer>
    </div>
  );
};

export default CinemaPage;
