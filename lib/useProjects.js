"use client";

import { useCallback, useEffect, useState } from "react";
import baseProjects from "@/data/projects";

const STORAGE_KEY = "ash-portfolio-custom-projects";
const EVENT_NAME = "ash-portfolio:projects-updated";

function slugify(title) {
  const base = (title || "project")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "project"}-${Date.now().toString(36)}`;
}

function readCustom() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCustom(list) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT_NAME));
}

/**
 * Merges the static `data/projects.js` list with projects added/edited
 * in-browser (persisted to localStorage). This keeps the site a plain
 * static Next.js export (no database) while giving the owner a real
 * "add a project" UI. Locally-added projects are tagged `custom: true`
 * and only visible in the browser that added them — the export panel
 * in ProjectsAdmin turns the merged list back into code to paste into
 * data/projects.js for a permanent, deployed change.
 */
export function useProjects() {
  const [custom, setCustom] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCustom(readCustom());
    setHydrated(true);
    const onUpdate = () => setCustom(readCustom());
    window.addEventListener(EVENT_NAME, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const addProject = useCallback((project) => {
    const list = readCustom();
    const withMeta = { ...project, id: slugify(project.title), custom: true };
    writeCustom([...list, withMeta]);
  }, []);

  const updateProject = useCallback((id, patch) => {
    const list = readCustom().map((p) => (p.id === id ? { ...p, ...patch } : p));
    writeCustom(list);
  }, []);

  const removeProject = useCallback((id) => {
    writeCustom(readCustom().filter((p) => p.id !== id));
  }, []);

  const clearCustom = useCallback(() => writeCustom([]), []);

  return {
    projects: [...baseProjects, ...custom],
    customProjects: custom,
    addProject,
    updateProject,
    removeProject,
    clearCustom,
    hydrated,
  };
}
