import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    setJoke(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 overflow-hidden">
      {/* Animated floating smileys */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <svg
            key={i}
            className={`absolute w-8 h-8 animate-float animate-spin opacity-20 fill-yellow-400`}
            // className={`absolute w-8 h-8 animate-float opacity-20 fill-yellow-400`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              transform: `scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 360}deg)`
            }}
            viewBox="0 0 64 64"
          >
            <circle cx="32" cy="32" r="30" />
            <circle cx="22" cy="24" r="4" fill="black" />
            <circle cx="42" cy="24" r="4" fill="black" />
            <path d="M22 44c4 4 16 4 20 0" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        ))}
      </div>

      <header className="relative z-10 text-center py-6">
        <h1 className="text-4xl font-bold">bahagia itu sederhana <small>[katanya..]</small></h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 px-4 py-2 bg-blue-800 text-white dark:bg-blue-200 dark:text-black rounded hover:opacity-80 inline-flex items-center gap-2"
        >
          {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <main className="relative z-10 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">celotehan receh..</h2>

        {loading ? (
          <p className="text-center text-gray-500">bentar liat primbon dulu...</p>
        ) : (
          <div>
            <p className="text-lg mb-3 font-semibold">🧑🏽‍💻{joke?.setup}</p>
            <p className="text-xl">👨‍💻{joke?.punchline}</p>
          </div>
        )}

        <button
          onClick={fetchJoke}
          className="mt-6 px-4 py-2 bg-blue-800 text-white dark:bg-blue-200 dark:text-black rounded-lg hover:bg-blue-600"
        >
          senyumin lagi?😅 <small>klik!</small>
        </button>
      </main>
    </div>
  );
}