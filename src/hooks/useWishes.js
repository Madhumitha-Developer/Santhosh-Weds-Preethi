import { useCallback, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { DEMO_WISHES } from '../lib/config'

const COLUMNS = 'id, name, message, created_at'

export function useWishes() {
  const [wishes, setWishes] = useState(isSupabaseConfigured ? [] : DEMO_WISHES)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  // Initial load + realtime subscription
  useEffect(() => {
    if (!supabase) return
    let cancelled = false

    supabase
      .from('wishes')
      .select(COLUMNS)
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) setError('Could not load wishes right now.')
        else setWishes(data)
        setLoading(false)
      })

    const channel = supabase
      .channel('wishes-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' }, ({ new: row }) => {
        setWishes((prev) => (prev.some((w) => w.id === row.id) ? prev : [row, ...prev]))
      })
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  const addWish = useCallback(async ({ name, message }) => {
    const row = {
      name: name.trim(),
      message: message.trim(),
    }

    // No backend configured: keep it local so the UI is still testable
    if (!supabase) {
      setWishes((prev) => [{ id: `local-${Date.now()}`, ...row }, ...prev])
      return { ok: true }
    }

    const { data, error } = await supabase.from('wishes').insert(row).select(COLUMNS).single()
    if (error) return { ok: false, error }
    setWishes((prev) => (prev.some((w) => w.id === data.id) ? prev : [data, ...prev]))
    return { ok: true }
  }, [])

  return { wishes, loading, error, addWish }
}
