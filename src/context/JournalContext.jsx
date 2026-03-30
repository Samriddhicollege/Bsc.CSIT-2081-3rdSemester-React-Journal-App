// Context API: JournalContext
// Provides global state for journals and theme across the entire app

import { createContext, useContext, useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const JournalContext = createContext(null);

export function JournalProvider({ children }) {
  // Persist journals and theme in localStorage via custom hook
  const [journals, setJournals] = useLocalStorage("journals", []);
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  // Edit mode state
  const [editingEntry, setEditingEntry] = useState(null); // null = add mode

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // CREATE: Add new journal entry
  const handleAdd = useCallback((title, content, date) => {
    const newEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: date || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };
    setJournals((prev) => [newEntry, ...prev]);
  }, [setJournals]);

  // UPDATE: Save edited entry
  const handleUpdate = useCallback((id, title, content, date) => {
    setJournals((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, title: title.trim(), content: content.trim(), date, updatedAt: new Date().toISOString() }
          : entry
      )
    );
    setEditingEntry(null);
  }, [setJournals]);

  // DELETE: Remove entry by id
  const handleDelete = useCallback((id) => {
    setJournals((prev) => prev.filter((entry) => entry.id !== id));
    // If deleting the entry currently being edited, cancel edit mode
    setEditingEntry((current) => (current?.id === id ? null : current));
  }, [setJournals]);

  // EDIT: Set the entry to edit
  const handleEdit = useCallback((entry) => {
    setEditingEntry(entry);
  }, []);

  // CANCEL edit mode
  const handleCancelEdit = useCallback(() => {
    setEditingEntry(null);
  }, []);

  // Toggle dark/light theme
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  // Derived: filtered + searched list
  const filteredJournals = journals.filter((entry) => {
    const matchesSearch =
      searchQuery === "" ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = filterDate === "" || entry.date === filterDate;
    return matchesSearch && matchesDate;
  });

  return (
    <JournalContext.Provider
      value={{
        journals,
        filteredJournals,
        theme,
        editingEntry,
        searchQuery,
        setSearchQuery,
        filterDate,
        setFilterDate,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleEdit,
        handleCancelEdit,
        toggleTheme,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

// Custom hook for consuming context
export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used inside JournalProvider");
  return ctx;
}
