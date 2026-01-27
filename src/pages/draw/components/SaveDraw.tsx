import { useCallback, useEffect, useRef, useState } from "react";
import { squashRecordDiffs, useEditor, type RecordsDiff, type TLEditorSnapshot, type TLEventMapHandler, type TLRecord } from "tldraw";

export default function SaveDraw() {
      const editor = useEditor()
      const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
      const rUnsavedChanges = useRef<RecordsDiff<TLRecord>>({ added: {}, removed: {}, updated: {} })
  
      useEffect(() => {
        // [1]
        const handleDocumentChange: TLEventMapHandler<'change'> = (diff) => {
          squashRecordDiffs([rUnsavedChanges.current, diff.changes], { mutateFirstDiff: true })
          setHasUnsavedChanges(
            !isPlainObjectEmpty(rUnsavedChanges.current.added) ||
              !isPlainObjectEmpty(rUnsavedChanges.current.removed) ||
              !isPlainObjectEmpty(rUnsavedChanges.current.updated)
          )
        }
  
        // [2]
        return editor.store.listen(handleDocumentChange, { scope: 'document' })
      }, [editor])
  
      // [3]
      const handleSave = useCallback(() => {
        // The diff is the difference between the current document and the last saved document
        const diff = rUnsavedChanges.current
  
        // Maybe also get the current document / schema snapshot
        const snapshot = editor.getSnapshot()
  
        // Save everything somewhere...
        saveChanges(diff, snapshot)
  
        // Clear the unsaved changes state
        setHasUnsavedChanges(false)
  
        // Reset the diff
        rUnsavedChanges.current = {
          added: {},
          removed: {},
          updated: {},
        }
      }, [editor])
  
      return (
        <button
          onClick={handleSave}
          disabled={!hasUnsavedChanges}
          style={{
            pointerEvents: 'all',
            padding: '8px 16px',
            marginTop: '6px',
            backgroundColor: hasUnsavedChanges ? '#2d7d32' : '#ccc',
            color: hasUnsavedChanges ? 'white' : '#666',
            border: 'none',
            borderRadius: '4px',
            cursor: hasUnsavedChanges ? 'pointer' : 'not-allowed',
            fontWeight: '500',
          }}
        >
          {hasUnsavedChanges ? 'Save Changes' : 'No Changes'}
        </button>
      )
    }
  
  function saveChanges(_diff: RecordsDiff<TLRecord>, _snapshot: TLEditorSnapshot) {
    // todo: do something with the diff, or save the whole document snapshot somewhere
  }
  
  function isPlainObjectEmpty(obj: object) {
    for (const key in obj) return false
    return true
}
