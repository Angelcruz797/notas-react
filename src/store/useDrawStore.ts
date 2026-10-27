import {
  loadSnapshot,
  squashRecordDiffs,
  type Editor,
  type RecordsDiff,
  type TLRecord,
} from "tldraw";
import { create } from "zustand";
import type { FileData } from "../interfaces/FileData";

interface DrawStore {
  editor: Editor | null;
  hasUnsavedChanges: boolean;
  pendingDiff: RecordsDiff<TLRecord>;
  isSaving: boolean;
  currentFile:FileData| null;
  unlisten: (() => void) | null;
  setEditor: (editor: Editor | null) => void;
  setCurrentFile: (currentFile: FileData | null) => void;
  saveDraw: (updateFile:(fileId: string, updates: { fileName: string; content?:string; fileType: string })
  => Promise<boolean>) => Promise<void>;
  loadDraw: () => void;
  reset: () => void;
}

function emptyDiff(): RecordsDiff<TLRecord> {
  return { added: {}, removed: {}, updated: {} };
}

function isDiffEmpty(diff: RecordsDiff<TLRecord>) {
  for (const _ in diff.added) return false;
  for (const _ in diff.removed) return false;
  for (const _ in diff.updated) return false;
  return true;
}

export const useDrawStore = create<DrawStore>()((set, get) => ({
  editor: null,
  hasUnsavedChanges: false,
  pendingDiff: emptyDiff(),
  isSaving: false,
  unlisten: null,
  currentFile:null,
  
  setEditor: (editor) => {
    // Clear the previous listener if it exist
    get().unlisten?.();

    if (!editor) {
      set({ editor: null, unlisten: null });
      return;
    }

    const unlisten = editor.store.listen(
      (entry) => {
        const { pendingDiff } = get();
        squashRecordDiffs([pendingDiff, entry.changes], {
          mutateFirstDiff: true,
        });
        set({ hasUnsavedChanges: !isDiffEmpty(pendingDiff) });
      },
      { scope: "document", source: "user" }
    );

    set({ editor, unlisten });
  },

  setCurrentFile:(currentFile)=>set({currentFile}),

  //Save the drawing content to the database
  saveDraw: async ( updateFile ) => {
    const { editor, pendingDiff, currentFile } = get();
    if (!editor || !currentFile) return;
    
    const savingFileId = currentFile.id;
    const savingEditor = editor;

    // Same Draw and editor that we are saving
    const isSameDraw = () =>
      get().currentFile?.id === savingFileId && get().editor === savingEditor;

    // Take all changes pending and make a reset
    const pending = pendingDiff;
    set({ pendingDiff: emptyDiff(), hasUnsavedChanges: false, isSaving: true });
    try {
      const content = JSON.stringify({
        diff: pending,
        snapshot: editor.getSnapshot(),
      });
      const isUpdated = await updateFile(currentFile.id, { fileName:currentFile.fileName, content, fileType: "Draw" });
      if(!isUpdated) throw new Error("The request throw false");
    } catch (err) {

      // On failure, restore pending changes to avoid losing them.
      const merged = squashRecordDiffs([pending, get().pendingDiff]);
      set({ pendingDiff: merged, hasUnsavedChanges: true });
      console.error("Error to save the Draw", err);
    } finally {
      set({ isSaving: false });
    }
  },
  
  // Load the drawing content from database
  loadDraw: () => {
    const { editor,currentFile } = get();
    if (!editor || !currentFile?.content?.trim()) return;

    try {
      const loadData = JSON.parse(currentFile.content);
      const snapshot = loadData.snapshot;
      if (!snapshot) return;
  
      editor.store.mergeRemoteChanges(() => {
        loadSnapshot(editor.store, snapshot);
      });
      // On load, there are no unsaved changes
      set({ pendingDiff: emptyDiff(), hasUnsavedChanges: false });
    } catch (error) {
      console.error('error to load snapshot: ',error);
    }
  },

  reset: () => {
    get().unlisten?.();
    set({
      editor: null,
      unlisten: null,
      pendingDiff: emptyDiff(),
      hasUnsavedChanges: false,
      isSaving: false,
    });
  },
}));