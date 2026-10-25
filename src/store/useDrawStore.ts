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

  //set del editor
  setEditor: (editor) => {
    // Limpiar el listener anterior si existe
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

  //guardar el dibujo en db
  saveDraw: async ( updateFile ) => {
    const { editor, pendingDiff, currentFile } = get();
    if (!editor || !currentFile) return;
    
    // Tomamos los cambios pendientes y reiniciamos
    const pending = pendingDiff;
    set({ pendingDiff: emptyDiff(), hasUnsavedChanges: false, isSaving: true });
    try {
      const content = JSON.stringify({
        diff: pending,
        snapshot: editor.getSnapshot(),
      });
      const isUpdated = updateFile(currentFile.id, { fileName:currentFile.fileName, content, fileType: "Draw" });
      if(!isUpdated) throw new Error("The request throw false");
    } catch (err) {

      // Si falla, devolvemos los cambios pendientes para no perderlos
      const merged = squashRecordDiffs([pending, get().pendingDiff]);
      set({ pendingDiff: merged, hasUnsavedChanges: true });
      console.error("Error to save the Draw", err);
    } finally {
      set({ isSaving: false });
    }
  },
  
  //load el dibujo en db
  loadDraw: () => {
    const { editor,currentFile } = get();
    if (!editor || !currentFile) return;

    const loadData = JSON.parse(currentFile.content);
    const snapshot = loadData.snapshot;
    if (!snapshot) return;

    editor.store.mergeRemoteChanges(() => {
      loadSnapshot(editor.store, snapshot);
  });
    // Al cargar, no hay cambios sin guardar
    set({ pendingDiff: emptyDiff(), hasUnsavedChanges: false });
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