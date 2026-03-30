// JournalItem Component
// Displays a single journal card with expand/collapse, edit, delete actions

import React, { useState } from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp, FileText, Clock } from "lucide-react";
import { useJournal } from "../context/JournalContext";
import Button from "./Button";

// Helper: format date string nicely
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper: word count
function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function JournalItem({ entry }) {
  const { handleDelete, handleEdit, editingEntry } = useJournal();
  const [expanded, setExpanded] = useState(false);

  const isBeingEdited = editingEntry?.id === entry.id;
  const preview = entry.content.length > 160
    ? entry.content.slice(0, 160) + "..."
    : entry.content;
  const isLong = entry.content.length > 160;

  return (
    <article className={`journal-card ${isBeingEdited ? "journal-card--editing" : ""}`}>
      {/* Editing badge */}
      {isBeingEdited && (
        <div className="journal-card__editing-badge">
          <Pencil size={10} style={{ marginRight: 4 }} /> Editing…
        </div>
      )}

      {/* Card Header */}
      <div className="journal-card__header">
        <div className="journal-card__meta">
          <Clock size={11} className="meta-icon" />
          <span className="journal-card__date">{formatDate(entry.date)}</span>
          {entry.updatedAt && (
            <span className="journal-card__updated">• edited</span>
          )}
        </div>
        <div className="journal-card__actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(entry)}
            title="Edit entry"
            disabled={isBeingEdited}
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(entry.id)}
            title="Delete entry"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {/* Title */}
      <h3 className="journal-card__title">{entry.title}</h3>

      {/* Content */}
      <p className="journal-card__content">
        {expanded ? entry.content : preview}
      </p>

      {/* Footer */}
      <div className="journal-card__footer">
        <span className="journal-card__wordcount">
          <FileText size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />
          {wordCount(entry.content)} words
        </span>
        {isLong && (
          <button
            className="journal-card__toggle"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded
              ? <><ChevronUp size={13} /> Show less</>
              : <><ChevronDown size={13} /> Read more</>}
          </button>
        )}
      </div>
    </article>
  );
}
