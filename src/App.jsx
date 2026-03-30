// App.jsx — Root Component
// Wraps the app in JournalProvider and applies the current theme class

import React from "react";
import { BookOpen, Sun, Moon, BarChart2, Feather } from "lucide-react";
import { JournalProvider, useJournal } from "./context/JournalContext";
import JournalContainer from "./components/JournalContainer";
import Button from "./components/Button";

// Inner component so it can consume context for theme
function AppInner() {
  const { theme, toggleTheme, journals } = useJournal();

  return (
    <div className={`app theme--${theme}`}>
      {/* ── Top Navigation Header ── */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo-wrap">
            <BookOpen className="header-logo-icon" size={28} strokeWidth={1.5} />
            <Feather className="header-feather-icon" size={14} />
          </div>
          <div>
            <h1 className="header-title">MyJournal</h1>
            <p className="header-tagline">Your personal digital diary</p>
          </div>
        </div>

        <div className="header-right">
          <div className="header-stats">
            <BarChart2 size={13} strokeWidth={2} />
            <span>{journals.length} {journals.length === 1 ? "entry" : "entries"}</span>
          </div>
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark"
              ? <><Sun size={15} strokeWidth={2} /> Light</>
              : <><Moon size={15} strokeWidth={2} /> Dark</>}
          </Button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <JournalContainer />

      {/* ── Footer ── */}
      <footer className="app-footer">
        <BookOpen size={13} style={{ verticalAlign: "middle", marginRight: 5, opacity: 0.5 }} />
        MyJournal &copy; {new Date().getFullYear()} — Write every day.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <JournalProvider>
      <AppInner />
    </JournalProvider>
  );
}
