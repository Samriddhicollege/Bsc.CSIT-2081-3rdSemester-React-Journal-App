// JournalForm Component
// Handles both ADD and EDIT modes toggled via editingEntry from context

import React, { useState, useEffect } from "react";
import { PenLine, Calendar, AlignLeft, Plus, Save, X, AlertCircle } from "lucide-react";
import { useJournal } from "../context/JournalContext";
import Button from "./Button";

export default function JournalForm() {
  const { handleAdd, handleUpdate, handleCancelEdit, editingEntry } = useJournal();

  // Local form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  const isEditMode = editingEntry !== null;

  // Populate form when switching to edit mode
  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setContent(editingEntry.content);
      setDate(editingEntry.date);
      setError("");
    } else {
      setTitle("");
      setContent("");
      setDate(new Date().toISOString().split("T")[0]);
      setError("");
    }
  }, [editingEntry]);

  // onChange handlers
  const handleTitleChange = (e) => { setTitle(e.target.value); if (error) setError(""); };
  const handleContentChange = (e) => { setContent(e.target.value); if (error) setError(""); };
  const handleDateChange = (e) => setDate(e.target.value);

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    if (isEditMode) {
      handleUpdate(editingEntry.id, title, content, date);
    } else {
      handleAdd(title, content, date);
    }
    setTitle("");
    setContent("");
    setDate(new Date().toISOString().split("T")[0]);
    setError("");
  };

  return (
    <div className="journal-form-card">
      <h2 className="form-heading">
        {isEditMode
          ? <><PenLine size={18} className="form-heading-icon" /> Edit Entry</>
          : <><Plus size={18} className="form-heading-icon" /> New Journal Entry</>}
      </h2>

      <form onSubmit={handleSubmit} className="journal-form" noValidate>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="journal-title" className="form-label">
            <PenLine size={12} style={{ marginRight: 5, verticalAlign: "middle" }} />
            Title
          </label>
          <input
            id="journal-title"
            type="text"
            className="form-input"
            placeholder="Give your entry a title..."
            value={title}
            onChange={handleTitleChange}
            maxLength={100}
          />
          <span className="char-count">{title.length}/100</span>
        </div>

        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="journal-date" className="form-label">
            <Calendar size={12} style={{ marginRight: 5, verticalAlign: "middle" }} />
            Date
          </label>
          <input
            id="journal-date"
            type="date"
            className="form-input"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        {/* Content Textarea */}
        <div className="form-group">
          <label htmlFor="journal-content" className="form-label">
            <AlignLeft size={12} style={{ marginRight: 5, verticalAlign: "middle" }} />
            What's on your mind?
          </label>
          <textarea
            id="journal-content"
            className="form-textarea"
            placeholder="Write freely... this is your safe space."
            value={content}
            onChange={handleContentChange}
            rows={6}
          />
          <span className="char-count">{content.length} chars</span>
        </div>

        {/* Validation Error */}
        {error && (
          <p className="form-error">
            <AlertCircle size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {error}
          </p>
        )}

        {/* Action Buttons */}
        <div className="form-actions">
          <Button type="submit" variant="primary" size="md">
            {isEditMode
              ? <><Save size={15} /> Save Changes</>
              : <><Plus size={15} /> Add Entry</>}
          </Button>
          {isEditMode && (
            <Button type="button" variant="ghost" size="md" onClick={handleCancelEdit}>
              <X size={15} /> Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
