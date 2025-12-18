'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>('light');

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

    // 1) thème manuel (persisté)
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    // 2) sinon : défaut forcé = light (pas de thème système)
    const def: Theme = 'light';
    setTheme(def);
    applyTheme(def);
    localStorage.setItem(STORAGE_KEY, def);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
      aria-label={
        theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'
      }
      title={theme === 'dark' ? 'Mode sombre' : 'Mode clair'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
