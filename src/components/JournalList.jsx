// JournalList Component
// Renders search/filter bar + grid of JournalItem cards (or empty state)

import React from "react";
import { Search, CalendarSearch, X, BookOpen, Inbox, SlidersHorizontal } from "lucide-react";
import { useJournal } from "../context/JournalContext";
import JournalItem from "./JournalItem";

export default function JournalList() {
  const {
    filteredJournals,
    journals,
    searchQuery,
    setSearchQuery,
    filterDate,
    setFilterDate,
  } = useJournal();

  const hasFilters = searchQuery || filterDate;

  return (
    <section className="journal-list-section">
      {/* ── Search & Filter Bar ── */}
      <div className="search-filter-bar">
        <div className="search-input-wrap">
          <Search size={15} className="search-icon" />
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Search by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-date-wrap">
          <CalendarSearch size={15} className="filter-icon" />
          <input
            id="filter-date"
            type="date"
            className="filter-date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            title="Filter by date"
          />
        </div>

        {hasFilters && (
          <button
            className="clear-filters-btn"
            onClick={() => { setSearchQuery(""); setFilterDate(""); }}
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* ── List Header ── */}
      <div className="list-header">
        <h2 className="list-title">
          <BookOpen size={18} className="list-title-icon" />
          Your Entries
        </h2>
        <span className="entry-count">
          <SlidersHorizontal size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
          {filteredJournals.length}{" "}
          {filteredJournals.length === 1 ? "entry" : "entries"}
          {journals.length !== filteredJournals.length &&
            ` of ${journals.length}`}
        </span>
      </div>

      {/* ── Empty States (conditional rendering) ── */}
      {journals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon-wrap">
            <BookOpen size={48} strokeWidth={1} className="empty-state__icon" />
          </div>
          <h3 className="empty-state__heading">No Journal Entries Yet</h3>
          <p className="empty-state__sub">
            Start writing your first entry. Your thoughts matter.
          </p>
        </div>
      ) : filteredJournals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon-wrap">
            <Inbox size={48} strokeWidth={1} className="empty-state__icon" />
          </div>
          <h3 className="empty-state__heading">No matches found</h3>
          <p className="empty-state__sub">Try a different search or clear filters.</p>
        </div>
      ) : (
        <div className="journal-grid">
          {filteredJournals.map((entry) => (
            <JournalItem key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </section>
  );
}
