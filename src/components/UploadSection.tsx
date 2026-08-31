import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import {
  extensionOf,
  kindOfExtension,
  maxBytesFor,
} from '../../api/_lib/upload-config'
import { useReveal } from '../hooks/useReveal'
import OrnamentalDivider from './OrnamentalDivider'
import { CheckIcon, CloseIcon, RetryIcon, UploadIcon } from './icons'

type UploadStatus = 'queued' | 'uploading' | 'done' | 'error'

interface UploadItem {
  id: string
  file: File
  status: UploadStatus
  progress: number
  error?: string
  /** Network-ish failures can be retried; validation failures cannot. */
  retryable: boolean
}

const MAX_PARALLEL_UPLOADS = 3

/**
 * `image/*,video/*` drives the mobile pickers; explicit HEIC entries keep
 * Safari from transcoding iPhone originals to JPEG on selection.
 */
const ACCEPT = 'image/*,video/*,image/heic,image/heif'

const ERROR_MESSAGES: Record<string, string> = {
  unsupported_type: 'Tento formát neumíme přijmout.',
  file_too_large: 'Soubor je příliš velký.',
  uploads_disabled: 'Nahrávání je momentálně vypnuté. Zkuste to prosím později.',
  network: 'Nahrávání se nezdařilo — zkontrolujte připojení a zkuste to znovu.',
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} kB`
}

/** Returns a Czech validation error, or null when the file is acceptable. */
function validate(file: File): string | null {
  const kind = kindOfExtension(extensionOf(file.name))
  if (!kind) return ERROR_MESSAGES.unsupported_type
  if (file.size > maxBytesFor(kind)) {
    return `Soubor je příliš velký (limit ${Math.round(maxBytesFor(kind) / (1024 * 1024))} MB).`
  }
  return null
}

function putWithProgress(
  url: string,
  file: File,
  contentType: string,
  onProgress: (percent: number) => void,
): Promise<void> {
  // XMLHttpRequest instead of fetch — fetch has no upload progress events.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100))
    }
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(ERROR_MESSAGES.network))
    xhr.onerror = () => reject(new Error(ERROR_MESSAGES.network))
    xhr.send(file)
  })
}

interface UploadRowProps {
  item: UploadItem
  onRetry: (id: string) => void
  onRemove: (id: string) => void
}

function UploadRow({ item, onRetry, onRemove }: UploadRowProps) {
  return (
    <li className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate font-sans text-caption text-brown-900">{item.file.name}</p>
          <span className="shrink-0 font-sans text-label text-taupe-400">
            {formatBytes(item.file.size)}
          </span>
        </div>
        {(item.status === 'uploading' || item.status === 'queued') && (
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cream-200">
            <div
              className="h-full rounded-full bg-pistachio-600 transition-[width] duration-300"
              style={{ width: `${item.status === 'queued' ? 0 : item.progress}%` }}
            />
          </div>
        )}
        {item.status === 'error' && (
          <p className="mt-1 font-sans text-caption text-blush-600">{item.error}</p>
        )}
      </div>
      <div className="flex w-10 shrink-0 justify-center text-taupe-400">
        {item.status === 'done' && <CheckIcon size={20} className="text-pistachio-600" />}
        {item.status === 'uploading' && (
          <span className="whitespace-nowrap font-sans text-label tabular-nums">
            {item.progress}%
          </span>
        )}
        {item.status === 'error' && item.retryable && (
          <button
            onClick={() => onRetry(item.id)}
            aria-label={`Zkusit znovu: ${item.file.name}`}
            className="rounded-full p-1 text-pistachio-600 transition-colors hover:bg-pistachio-50"
          >
            <RetryIcon size={18} />
          </button>
        )}
        {((item.status === 'error' && !item.retryable) || item.status === 'queued') && (
          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Odebrat: ${item.file.name}`}
            className="rounded-full p-1 transition-colors hover:bg-cream-100 hover:text-brown-900"
          >
            <CloseIcon size={18} />
          </button>
        )}
      </div>
    </li>
  )
}

export default function UploadSection() {
  const headingRef = useReveal<HTMLDivElement>()
  const cardRef = useReveal<HTMLDivElement>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<UploadItem[]>([])
  const [guestName, setGuestName] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const setItem = useCallback((id: string, patch: Partial<UploadItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }, [])

  const startUpload = useCallback(
    async (item: UploadItem) => {
      setItem(item.id, { status: 'uploading', progress: 0, error: undefined })
      try {
        const presignRes = await fetch('/api/presign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: item.file.name,
            fileSize: item.file.size,
            guestName,
          }),
        })
        if (!presignRes.ok) {
          const data = (await presignRes.json().catch(() => ({}))) as { error?: string }
          throw new Error(ERROR_MESSAGES[data.error ?? ''] ?? ERROR_MESSAGES.network)
        }
        const { url, contentType } = (await presignRes.json()) as {
          url: string
          contentType: string
        }
        await putWithProgress(url, item.file, contentType, (percent) =>
          setItem(item.id, { progress: percent }),
        )
        setItem(item.id, { status: 'done', progress: 100 })
      } catch (error) {
        setItem(item.id, {
          status: 'error',
          error: error instanceof Error ? error.message : ERROR_MESSAGES.network,
        })
      }
    },
    [guestName, setItem],
  )

  // Upload pump: whenever the queue changes, start the next file while
  // fewer than MAX_PARALLEL_UPLOADS are in flight.
  useEffect(() => {
    const active = items.filter((item) => item.status === 'uploading').length
    if (active >= MAX_PARALLEL_UPLOADS) return
    const next = items.find((item) => item.status === 'queued')
    if (next) void startUpload(next)
  }, [items, startUpload])

  const anyInFlight = items.some(
    (item) => item.status === 'uploading' || item.status === 'queued',
  )

  // Keep the screen awake during uploads — locking the phone aborts them.
  useEffect(() => {
    if (!anyInFlight || !('wakeLock' in navigator)) return
    let sentinel: WakeLockSentinel | null = null
    let cancelled = false
    const acquire = async () => {
      try {
        sentinel = await navigator.wakeLock.request('screen')
        if (cancelled) await sentinel.release()
      } catch {
        // Unsupported or denied — uploads still work, the screen may just sleep.
      }
    }
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') void acquire()
    }
    void acquire()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      void sentinel?.release().catch(() => undefined)
    }
  }, [anyInFlight])

  const addFiles = useCallback((files: FileList | File[]) => {
    const next: UploadItem[] = Array.from(files).map((file) => {
      const error = validate(file)
      return {
        id: crypto.randomUUID(),
        file,
        status: error ? 'error' : 'queued',
        progress: 0,
        error: error ?? undefined,
        retryable: !error,
      }
    })
    setItems((prev) => [...prev, ...next])
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) addFiles(event.target.files)
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files)
  }

  const handleRetry = (id: string) =>
    setItem(id, { status: 'queued', progress: 0, error: undefined })

  const handleRemove = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id))

  const doneCount = items.filter((item) => item.status === 'done').length

  return (
    <section id="momentky" className="bg-cream-100 py-24 px-4">
      <div ref={headingRef} className="reveal text-center mb-12">
        <p className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 mb-3">
          Po svatbě
        </p>
        <h2 className="font-serif text-h2 text-brown-900 font-light">Podělte se o momentky</h2>
        <OrnamentalDivider className="mt-6 mb-6" />
        <p className="font-sans text-body-lg text-taupe-600 font-light max-w-md mx-auto">
          Zachytili jste náš den? Nahrajte nám prosím fotky a videa v původní kvalitě — uděláte
          nám obrovskou radost.
        </p>
      </div>

      <div
        ref={cardRef}
        className="reveal max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-cream-200"
      >
        <label className="block">
          <span className="font-sans text-label uppercase tracking-[0.12em] text-taupe-600">
            Vaše jméno (nepovinné)
          </span>
          <input
            type="text"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Ať víme, komu poděkovat"
            maxLength={60}
            className="mt-2 w-full rounded-lg border border-cream-200 bg-cream-50 px-4 py-3 font-sans text-body text-brown-900 placeholder:text-taupe-400 focus:border-pistachio-400 focus:outline-none"
          />
        </label>

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click()
          }}
          onDragOver={(event) => {
            event.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`mt-5 cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-200 ${
            dragActive
              ? 'border-pistachio-600 bg-pistachio-50'
              : 'border-pistachio-200 bg-cream-50 hover:bg-pistachio-50'
          }`}
        >
          <UploadIcon size={36} className="mx-auto text-pistachio-600" />
          <p className="mt-3 font-sans text-body text-brown-900">
            Klepněte a vyberte soubory
            <span className="hidden sm:inline">, nebo je sem přetáhněte</span>
          </p>
          <p className="mt-2 font-sans text-caption text-taupe-400">
            Fotky do 50 MB · videa do 500 MB · JPG, PNG, HEIC, MP4, MOV a další
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPT}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {items.length > 0 && (
          <>
            <ul className="mt-6 flex flex-col gap-3">
              {items.map((item) => (
                <UploadRow
                  key={item.id}
                  item={item}
                  onRetry={handleRetry}
                  onRemove={handleRemove}
                />
              ))}
            </ul>
            <p className="mt-5 border-t border-cream-200 pt-4 text-center font-sans text-caption text-taupe-600">
              Nahráno {doneCount} z {items.length}
              {anyInFlight && ' — nezhasínejte prosím displej, dokud se nahrávání nedokončí.'}
              {!anyInFlight && doneCount === items.length && ' 🌸 Moc děkujeme!'}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
