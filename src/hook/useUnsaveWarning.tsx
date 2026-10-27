import { useEffect } from 'react'
import { useBlocker } from 'react-router'

export function useUnsavedWarning(
    hasUnsavedChanges: boolean,
    message:string = 'Leave this page? Unsaved changes will be lost.' 
 ) {
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  const blocker = useBlocker(hasUnsavedChanges)

  useEffect(() => {
    if (blocker.state !== 'blocked') return

    if (window.confirm(message)) blocker.proceed()
    else blocker.reset()
  }, [blocker, message])
}