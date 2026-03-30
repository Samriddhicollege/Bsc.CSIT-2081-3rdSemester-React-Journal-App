// JournalContainer Component
// Acts as the layout wrapper (App → JournalContainer → children)
// Renders the form on the left and the list on the right (two-column layout)

import React from "react";
import JournalForm from "./JournalForm";
import JournalList from "./JournalList";

export default function JournalContainer() {
  return (
    <main className="journal-container">
      {/* Left column: form */}
      <aside className="container-sidebar">
        <JournalForm />
      </aside>

      {/* Right column: list */}
      <div className="container-main">
        <JournalList />
      </div>
    </main>
  );
}
