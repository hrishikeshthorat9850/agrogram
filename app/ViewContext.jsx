"use client";
import React, { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const [view, setViewState] = useState("posts");
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  function setView(newView, newsId = null) {
    setViewState(newView);
    if (newView === "news-full") {
      setSelectedNewsId(newsId);
    } else {
      setSelectedNewsId(null);
    }
  }

  return (
    <ViewContext.Provider value={{ view, setView, selectedNewsId }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
} 