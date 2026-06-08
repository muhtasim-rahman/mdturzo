// CommentSection.jsx — v2.4.7
// Complete rebuild:
//   - 3000-char limit with live counter (yellow at -100, red at -30)
//   - Anonymous toggle
//   - Emoji picker via emoji-mart CDN (loaded lazily)
//   - Realtime updates via Supabase channel
//   - 1-level replies (reply to reply → tagged under main)
//   - @mentions clickable, @admin/@turzo → admin profile
//   - Admin comments: special badge + accent border
//   - Comment likes
//   - Sort by: latest / oldest / top
//   - 3-dot menu: edit/delete (own), report (others)
//   - Direct public (no approval needed)

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faPaperPlane, faTrash, faPencil, faFlag,
  faUser, faReply, faEllipsisVertical, faHeart, faSmile,
  faChevronDown, faChevronUp, faShield,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '../../hooks/useAuth.js'
import { useAdmin } from '../../hooks/useAdmin.js'
import { loginWithGoogle } from '../../services/firebase.js'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  getComments, submitComment, updateComment, deleteOwnComment,
  toggleCommentLike, getUserCommentLikes,
} from '../../services/supabase.js'
import { supabase } from '../../config/supabase.config.js'
import { formatDistanceToNow } from '../../utils/formatters.js'
import { useToastStore } from '../../store/toastStore.js'
import { submitReport } from '../../services/supabase.js'

const MAX_CHARS    = 3000
const WARN_YELLOW  = 100  // chars remaining
const WARN_RED     = 30

// Admin handles that route to admin profile
const ADMIN_HANDLES = ['admin', 'turzo', 'muhtasim', 'muhtasim-rahman']

// ── Helpers ──────────────────────────────────────────────────
function fmtRel(s) {
  try { return formatDistanceToNow(s) } catch { return '' }
}

function parseTextWithMentions(text) {
  if (!text) return null
  const parts = text.split(/(@[\w-]+)/g)
  return parts.map((part, i) => {
    if (part.startsWith('@')) {
      const handle = part.slice(1).toLowerCase()
      const isAdmin = ADMIN_HANDLES.includes(handle)
      return (
        <Link key={i}
          to={isAdmin ? '/@admin' : `/@${part.slice(1)}`}
          className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] font-semibold hover:underline transition-colors">
          {part}
        </Link>
      )
    }
    return <span key={i}>{part}</span>
  })
}

// ── Components ───────────────────────────────────────────────

function Avatar({ user, isAnonymous = false, size = 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[9px]' : 'w-9 h-9 text-xs'
  if (isAnonymous) {
    return (
      <div className={`${sz} rounded-full bg-[var(--bg-surface-3)] flex items-center justify-center flex-shrink-0 border border-[var(--border-color)]`}>
        <FontAwesomeIcon icon={faUser} className="text-[var(--text-tertiary)] text-[10px]" />
      </div>
    )
  }
  if (user?.photo_url) {
    return (
      <img src={user.photo_url} alt={user.display_name || '?'}
        className={`${sz} rounded-full object-cover flex-shrink-0 border border-[var(--border-color)]`} />
    )
  }
  const initial = (user?.display_name || user?.username || '?').charAt(0).toUpperCase()
  return (
    <div className={`${sz} rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0 border border-[var(--accent-primary)]/25`}>
      <span className="font-bold text-[var(--accent-primary)]">{initial}</span>
    </div>
  )
}

function TruncatedText({ text, threshold = 280 }) {
  const [expanded, setExpanded] = useState(false)
  if (!text) return null
  const needs = text.length > threshold
  return (
    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
      {!expanded && needs ? text.slice(0, threshold) : text}
      {needs && !expanded && (
        <>
          {'… '}
          <button onClick={() => setExpanded(true)}
            className="font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
            see more
          </button>
        </>
      )}
      {needs && expanded && (
        <>
          {' '}
          <button onClick={() => setExpanded(false)}
            className="font-bold text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
            show less
          </button>
        </>
      )}
    </p>
  )
}

function ThreeDotMenu({ items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-all opacity-0 group-hover/comment:opacity-100">
        <FontAwesomeIcon icon={faEllipsisVertical} className="text-xs" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-8 z-50 min-w-[148px] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden">
            {items.map((item, i) => (
              <button key={i} onClick={() => { item.onClick(); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium transition-colors hover:bg-[var(--bg-surface-2)] ${
                  item.danger ? 'text-red-400 hover:text-red-300' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}>
                <FontAwesomeIcon icon={item.icon} className="text-[10px] flex-shrink-0" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Emoji Picker (lazy-loaded from CDN) ──────────────────────
let emojiMartLoaded = false
function loadEmojiMart() {
  return new Promise((resolve) => {
    if (emojiMartLoaded) { resolve(); return }
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/emoji-mart@5/dist/browser.js'
    script.onload = () => { emojiMartLoaded = true; resolve() }
    document.head.appendChild(script)
  })
}

function EmojiPickerButton({ onEmoji, textareaRef }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const pickerRef = useRef(null)
  const btnRef = useRef(null)

  const open_ = async () => {
    if (!loaded) { await loadEmojiMart(); setLoaded(true) }
    setOpen(o => !o)
  }

  useEffect(() => {
    if (!open || !loaded || !pickerRef.current) return
    const existing = pickerRef.current.querySelector('em-emoji-picker')
    if (existing) return
    const picker = document.createElement('em-emoji-picker')
    picker.setAttribute('theme', document.documentElement.dataset.theme || 'dark')
    picker.setAttribute('skin-tone-position', 'none')
    picker.style.cssText = 'width:100%;height:360px;'
    picker.addEventListener('emoji-click', (e) => {
      const emoji = e.detail.unicode
      const el = textareaRef?.current
      if (el) {
        const start = el.selectionStart
        const end   = el.selectionEnd
        const val   = el.value
        const next  = val.slice(0, start) + emoji + val.slice(end)
        // Trigger React synthetic event
        const nativeInput = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')
        nativeInput?.set?.call(el, next)
        el.dispatchEvent(new Event('input', { bubbles: true }))
        setTimeout(() => { el.selectionStart = el.selectionEnd = start + emoji.length; el.focus() }, 0)
      }
      setOpen(false)
    })
    pickerRef.current.appendChild(picker)
    return () => { if (pickerRef.current?.contains(picker)) pickerRef.current.removeChild(picker) }
  }, [open, loaded])

  useEffect(() => {
    const h = (e) => {
      if (btnRef.current?.contains(e.target) || pickerRef.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div className="relative">
      <button ref={btnRef} type="button" onClick={open_}
        title="Add emoji"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-3)] transition-all">
        <FontAwesomeIcon icon={faSmile} className="text-base" />
      </button>
      {open && (
        <div ref={pickerRef}
          className="absolute bottom-10 right-0 z-50 w-[320px] shadow-2xl rounded-2xl overflow-hidden border border-[var(--border-color)]" />
      )}
    </div>
  )
}

// ── Comment Input Box ────────────────────────────────────────

function CommentInput({
  value, onChange, onSubmit, placeholder = 'Write a comment…',
  submitting = false, isAnonymous, onToggleAnonymous,
  replyTo = null, onCancelReply = null,
  uid, avatar, displayName,
  className = '',
}) {
  const textareaRef = useRef(null)
  const remaining   = MAX_CHARS - value.length

  const charClass = remaining <= 0
    ? 'text-red-500'
    : remaining <= WARN_RED
    ? 'text-red-400'
    : remaining <= WARN_YELLOW
    ? 'text-amber-400'
    : 'text-[var(--text-tertiary)]'

  const showCounter = remaining <= WARN_YELLOW

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  return (
    <div className={`${className}`}>
      {replyTo && (
        <div className="flex items-center justify-between mb-2 px-3 py-1.5 rounded-lg bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
          <span className="text-[10px] font-semibold text-[var(--accent-primary)] flex items-center gap-1.5">
            <FontAwesomeIcon icon={faReply} className="text-[8px]" />
            Replying to @{replyTo}
          </span>
          <button onClick={onCancelReply} className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
            ×
          </button>
        </div>
      )}
      <div className="relative rounded-2xl border border-[var(--border-color)] focus-within:border-[var(--accent-primary)] focus-within:ring-2 focus-within:ring-[var(--accent-primary)]/15 transition-all bg-[var(--bg-surface-2)] overflow-hidden">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ minHeight: 72, maxHeight: 200, resize: 'none' }}
          className="w-full px-4 pt-3.5 pb-2 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] bg-transparent outline-none leading-relaxed"
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              if (value.trim() && remaining >= 0 && !submitting) onSubmit()
            }
          }}
        />
        {/* Bottom bar */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-[var(--border-color)]/50 bg-[var(--bg-surface-2)]">
          <div className="flex items-center gap-1">
            <EmojiPickerButton onEmoji={() => {}} textareaRef={textareaRef} />
            {onToggleAnonymous && (
              <button type="button" onClick={onToggleAnonymous}
                title={isAnonymous ? 'Post as yourself' : 'Post anonymously'}
                className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-lg transition-all ${
                  isAnonymous
                    ? 'bg-[var(--bg-surface-3)] text-[var(--text-secondary)] border border-[var(--border-strong)]'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-3)]'
                }`}>
                <FontAwesomeIcon icon={faUser} className="text-[8px]" />
                {isAnonymous ? 'Anonymous' : 'As you'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showCounter && (
              <span className={`text-[9px] font-mono font-bold transition-colors ${charClass}`}>
                {remaining < 0 ? `${remaining}` : remaining}/{MAX_CHARS}
              </span>
            )}
            <button onClick={onSubmit}
              disabled={!value.trim() || remaining < 0 || submitting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-[10px] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
              <FontAwesomeIcon icon={faPaperPlane} className="text-[9px]" />
              {submitting ? 'Posting…' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {!showCounter && (
        <p className="text-[9px] text-[var(--text-tertiary)] mt-1.5 text-right">
          {MAX_CHARS - value.length} chars remaining · Ctrl+Enter to submit
        </p>
      )}
    </div>
  )
}

// ── Single Comment Card ──────────────────────────────────────

function CommentCard({
  comment, replies = [], currentUserId, isAdminUser,
  likedIds, onLike, onReply, onEdit, onDelete,
  depth = 0,
}) {
  const [editMode, setEditMode]   = useState(false)
  const [editText, setEditText]   = useState(comment.text)
  const [submitting, setSubmitting] = useState(false)
  const { addToast } = useToastStore()

  const user     = comment.users || {}
  const isAnon   = comment.is_anonymous
  const isAdmin  = isAdminUser // check if the comment author is admin (passed from parent)
  const isOwn    = currentUserId && comment.user_id === currentUserId
  const isLiked  = likedIds.includes(comment.id)
  const username = user.username || null
  const name     = isAnon ? 'Anonymous' : (user.display_name || 'User')

  // For admin identification: store admin UIDs in RTDB → check via useAdmin
  // Here we receive `isAdminComment` prop from parent that pre-checks
  const isAdminComment = comment.is_admin_comment === true

  const handleSaveEdit = async () => {
    if (!editText.trim()) return
    setSubmitting(true)
    const result = await onEdit(comment.id, editText)
    if (result) { setEditMode(false) }
    setSubmitting(false)
  }

  const menuItems = [
    ...(isOwn ? [
      { icon: faPencil, label: 'Edit',   onClick: () => { setEditMode(true); setEditText(comment.text) } },
      { icon: faTrash,  label: 'Delete', onClick: () => onDelete(comment.id), danger: true },
    ] : [
      { icon: faFlag, label: 'Report', onClick: () => addToast({ type: 'info', title: 'Report sent', message: 'Thank you for reporting this comment.' }) },
    ]),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className={`group/comment ${depth > 0 ? 'ml-10 sm:ml-12 border-l-2 border-[var(--border-color)] pl-4' : ''}`}>
      <div className={`flex gap-3 py-3 ${depth === 0 && replies.length > 0 ? 'pb-2' : ''}`}>
        {/* Avatar */}
        {!isAnon && username && !isAdminComment ? (
          <Link to={`/@${username}`} className="flex-shrink-0">
            <Avatar user={user} isAnonymous={isAnon} />
          </Link>
        ) : (
          <Avatar user={user} isAnonymous={isAnon} />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              {/* Name */}
              {!isAnon && username && !isAdminComment ? (
                <Link to={`/@${username}`}
                  className="text-xs font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
                  {name}
                </Link>
              ) : (
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  {isAdminComment ? 'Turzo (Admin)' : name}
                </span>
              )}
              {/* Admin badge */}
              {isAdminComment && (
                <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[var(--accent-primary)] text-white">
                  <FontAwesomeIcon icon={faShield} className="text-[7px]" />
                  ADMIN
                </span>
              )}
              <span className="text-[10px] text-[var(--text-tertiary)]">{fmtRel(comment.created_at)}</span>
              {comment.created_at !== comment.updated_at && (
                <span className="text-[9px] text-[var(--text-tertiary)] italic">(edited)</span>
              )}
            </div>
            <ThreeDotMenu items={menuItems} />
          </div>

          {/* Text */}
          {editMode ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                maxLength={MAX_CHARS}
                rows={3}
                className="w-full px-3 py-2 rounded-xl text-xs text-[var(--text-primary)] bg-[var(--bg-surface-2)] border border-[var(--accent-primary)]/30 focus:ring-2 focus:ring-[var(--accent-primary)]/15 outline-none resize-none transition-all"
              />
              <div className="flex gap-2">
                <button onClick={handleSaveEdit} disabled={submitting}
                  className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50">
                  {submitting ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => setEditMode(false)}
                  className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-color)] transition-all">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={`mt-1.5 ${isAdminComment ? 'pl-2 border-l-2 border-[var(--accent-primary)]/40' : ''}`}>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {parseTextWithMentions(comment.text)}
              </p>
            </div>
          )}

          {/* Actions */}
          {!editMode && (
            <div className="flex items-center gap-3 mt-2">
              <button onClick={() => onLike(comment.id)}
                className={`flex items-center gap-1.5 text-[10px] font-semibold transition-all px-2 py-1 rounded-lg ${
                  isLiked
                    ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                    : 'text-[var(--text-tertiary)] hover:text-rose-400 border border-transparent hover:border-rose-500/20 hover:bg-rose-500/8'
                }`}>
                <FontAwesomeIcon icon={isLiked ? faHeart : faHeartEmpty} className="text-[9px]" />
                {comment.likes_count > 0 && <span>{comment.likes_count}</span>}
              </button>
              {depth === 0 && (
                <button onClick={() => onReply(comment)}
                  className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors px-2 py-1 rounded-lg hover:bg-[var(--accent-light)]">
                  <FontAwesomeIcon icon={faReply} className="text-[9px]" />
                  Reply
                  {replies.length > 0 && <span className="text-[9px]">({replies.length})</span>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {depth === 0 && replies.length > 0 && (
        <div className="space-y-0">
          <AnimatePresence initial={false}>
            {replies.map(reply => (
              <CommentCard
                key={reply.id}
                comment={reply}
                replies={[]}
                currentUserId={currentUserId}
                isAdminUser={isAdminUser}
                likedIds={likedIds}
                onLike={onLike}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
                depth={1}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

// ── Main CommentSection ──────────────────────────────────────

export default function CommentSection({ contentType, contentId, contentSlug }) {
  const { isLoggedIn, uid, displayName, avatar } = useAuth()
  const { isAdmin }  = useAdmin()
  const { addToast } = useToastStore()
  const navigate     = useNavigate()

  const [comments, setComments]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [text, setText]               = useState('')
  const [submitting, setSubmitting]   = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [sort, setSort]               = useState('latest')
  const [likedIds, setLikedIds]       = useState([])
  const [replyTo, setReplyTo]         = useState(null) // { id, username, parentId }
  const [signingIn, setSigningIn]     = useState(false)
  const inputRef = useRef(null)

  const load = useCallback(async (sortOverride) => {
    if (!contentId) return
    const s = sortOverride || sort
    setLoading(true)
    const data = await getComments(contentType, contentId, s).catch(() => [])
    setComments(data || [])
    if (isLoggedIn && uid && data?.length) {
      const ids = await getUserCommentLikes(data.map(c => c.id), uid).catch(() => [])
      setLikedIds(ids)
    }
    setLoading(false)
  }, [contentType, contentId, sort, uid, isLoggedIn])

  useEffect(() => { load() }, [load])

  // Realtime subscription
  useEffect(() => {
    if (!contentId) return
    const sub = supabase
      .channel(`comments:${contentId}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'comments',
        filter: `content_id=eq.${contentId}`,
      }, () => { load() })
      .subscribe()
    return () => { supabase.removeChannel(sub) }
  }, [contentId, load])

  // Build comment tree
  const { roots, repliesMap } = useMemo(() => {
    const roots = comments.filter(c => !c.parent_id)
    const repliesMap = {}
    comments.filter(c => c.parent_id).forEach(c => {
      if (!repliesMap[c.parent_id]) repliesMap[c.parent_id] = []
      repliesMap[c.parent_id].push(c)
    })
    return { roots, repliesMap }
  }, [comments])

  const totalCount = comments.length

  const handleSort = (s) => { setSort(s); load(s) }

  const handleLogin = async () => {
    setSigningIn(true)
    try { await loginWithGoogle() }
    catch { }
    finally { setSigningIn(false) }
  }

  const handleReplyClick = (comment) => {
    const user = comment.users
    const username = comment.is_anonymous ? 'anonymous' : (user?.username || user?.display_name || 'user')
    setReplyTo({ id: comment.id, parentId: comment.parent_id || comment.id, username })
    setText(`@${username} `)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(username.length + 2, username.length + 2)
    }, 50)
  }

  const handleSubmit = async () => {
    if (!isLoggedIn) { addToast({ type: 'info', title: 'Login required' }); return }
    if (!text.trim() || text.length > MAX_CHARS) return
    setSubmitting(true)
    try {
      const newComment = await submitComment({
        contentType, contentId, contentSlug,
        userId: uid,
        text: text.trim(),
        parentId: replyTo?.parentId || null,
        isAnonymous,
      })
      setText('')
      setReplyTo(null)
      setComments(prev => [newComment, ...prev])
      addToast({ type: 'success', title: 'Comment posted!' })
    } catch (e) {
      addToast({ type: 'error', title: 'Error', message: e.message || 'Could not post comment.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLike = async (id) => {
    if (!isLoggedIn) { addToast({ type: 'info', title: 'Sign in to like comments' }); return }
    const result = await toggleCommentLike(id, uid).catch(() => null)
    if (!result) return
    setLikedIds(prev => result.liked ? [...prev, id] : prev.filter(x => x !== id))
    setComments(prev => prev.map(c => c.id === id
      ? { ...c, likes_count: (c.likes_count || 0) + (result.liked ? 1 : -1) }
      : c
    ))
  }

  const handleEdit = async (id, newText) => {
    try {
      const updated = await updateComment(id, uid, newText)
      setComments(prev => prev.map(c => c.id === id ? updated : c))
      return true
    } catch {
      addToast({ type: 'error', title: 'Could not edit comment' })
      return false
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this comment?')) return
    try {
      await deleteOwnComment(id, uid)
      setComments(prev => prev.filter(c => c.id !== id))
      addToast({ type: 'info', title: 'Comment deleted' })
    } catch {
      addToast({ type: 'error', title: 'Could not delete comment' })
    }
  }

  const SORTS = [
    { key: 'latest', label: 'Latest' },
    { key: 'oldest', label: 'Oldest' },
    { key: 'top',    label: 'Top'    },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-5 h-5 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
            <FontAwesomeIcon icon={faComment} className="text-[8px] text-[var(--accent-primary)]" />
          </span>
          Comments
          {totalCount > 0 && (
            <span className="text-xs font-bold text-[var(--text-tertiary)] bg-[var(--bg-surface-2)] px-2 py-0.5 rounded-lg border border-[var(--border-color)]">
              {totalCount}
            </span>
          )}
        </h3>
        {/* Sort */}
        {roots.length > 1 && (
          <div className="flex items-center gap-1.5">
            {SORTS.map(s => (
              <button key={s.key} onClick={() => handleSort(s.key)}
                className={`text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  sort === s.key
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      {isLoggedIn ? (
        <div className="flex gap-3">
          <Avatar user={{ display_name: displayName, photo_url: avatar }} isAnonymous={isAnonymous} />
          <div className="flex-1 min-w-0">
            <CommentInput
              value={text}
              onChange={setText}
              onSubmit={handleSubmit}
              submitting={submitting}
              isAnonymous={isAnonymous}
              onToggleAnonymous={() => setIsAnonymous(a => !a)}
              replyTo={replyTo?.username || null}
              onCancelReply={() => { setReplyTo(null); setText('') }}
              uid={uid}
              avatar={avatar}
              displayName={displayName}
              placeholder={replyTo ? `Replying to @${replyTo.username}…` : 'Write a comment…'}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] border-dashed">
          <FontAwesomeIcon icon={faComment} className="text-2xl text-[var(--text-tertiary)]/30" />
          <p className="text-xs font-semibold text-[var(--text-secondary)]">Sign in to join the conversation</p>
          <button onClick={handleLogin} disabled={signingIn}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-surface-2)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-color)] hover:border-[var(--border-strong)] text-xs font-bold text-[var(--text-primary)] transition-all disabled:opacity-60 shadow-sm">
            <FontAwesomeIcon icon={faGoogle} className="text-[#4285F4]" />
            {signingIn ? 'Signing in…' : 'Continue with Google'}
          </button>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex gap-3">
              <div className="sk w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="sk h-3 w-24 rounded" />
                <div className="sk h-3 w-full rounded" />
                <div className="sk h-3 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : roots.length === 0 ? (
        <div className="text-center py-10">
          <FontAwesomeIcon icon={faComment} className="text-3xl text-[var(--text-tertiary)]/20 mb-3 block" />
          <p className="text-sm font-bold text-[var(--text-secondary)]">No comments yet</p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Be the first to comment!</p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--border-color)]">
          <AnimatePresence initial={false}>
            {roots.map(comment => (
              <CommentCard
                key={comment.id}
                comment={comment}
                replies={repliesMap[comment.id] || []}
                currentUserId={uid}
                isAdminUser={isAdmin}
                likedIds={likedIds}
                onLike={handleLike}
                onReply={handleReplyClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
                depth={0}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
