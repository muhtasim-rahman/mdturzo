// CommentsSection.jsx — v2.4.0
// Full nested comments system. 2-level replies. Like/dislike on comments.
// Auth-gated with section-aware redirect. Paginated (10 + load more).

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faReply, faThumbsUp, faThumbsDown, faTrash,
  faEllipsisVertical, faSort, faChevronDown, faSpinner,
  faUser, faCircleExclamationCircle, faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg } from '@fortawesome/free-regular-svg-icons'
import { useAuthStore } from '../../store/authStore.js'
import { useToastStore } from '../../store/toastStore.js'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  getProjectComments, getCommentReplies,
  submitComment, toggleCommentLike
} from '../../services/supabase.js'

const PAGE_SIZE = 10
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
]

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`
  if (diff < 86400)return `${Math.floor(diff/3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff/86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
}

function Avatar({ user: u, size = 32 }) {
  if (u?.photo_url) return (
    <img src={u.photo_url} alt={u.display_name || 'User'}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
  )
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'var(--bg-surface-3)', display:'flex', alignItems:'center', justifyContent:'center',
      color:'var(--text-tertiary)', fontSize: size * 0.45
    }}>
      <FontAwesomeIcon icon={faUser}/>
    </div>
  )
}

// ── Single Comment ─────────────────────────────────────────
function Comment({ comment, currentUser, onReply, contentType, contentId, depth = 0 }) {
  const addToast = useToastStore(s => s.add)
  const [likes,     setLikes]     = useState(comment.likes?.filter(l=>l.reaction==='like').length || 0)
  const [dislikes,  setDislikes]  = useState(comment.likes?.filter(l=>l.reaction==='dislike').length || 0)
  const [myReact,   setMyReact]   = useState(null)
  const [likeLoad,  setLikeLoad]  = useState(false)
  const [showMenu,  setShowMenu]  = useState(false)
  const [replies,   setReplies]   = useState([])
  const [rLoading,  setRLoading]  = useState(false)
  const [rShown,    setRShown]    = useState(false)

  const handleLike = async (reaction) => {
    if (!currentUser) return onReply('login')
    if (likeLoad) return
    const prev = { likes, dislikes, myReact }
    let nl = likes, nd = dislikes, nr = myReact
    if (myReact === reaction) { reaction === 'like' ? nl-- : nd--; nr = null }
    else {
      if (myReact === 'like') nl--; if (myReact === 'dislike') nd--
      reaction === 'like' ? nl++ : nd++; nr = reaction
    }
    setLikes(Math.max(0,nl)); setDislikes(Math.max(0,nd)); setMyReact(nr)
    setLikeLoad(true)
    try {
      await toggleCommentLike(comment.id, currentUser.uid, reaction)
    } catch {
      setLikes(prev.likes); setDislikes(prev.dislikes); setMyReact(prev.myReact)
      addToast('Could not save reaction', 'error')
    } finally { setLikeLoad(false) }
  }

  const loadReplies = async () => {
    if (rShown) { setRShown(false); return }
    setRLoading(true)
    try {
      const data = await getCommentReplies(comment.id)
      setReplies(data); setRShown(true)
    } catch { addToast('Could not load replies','error') }
    finally { setRLoading(false) }
  }

  const isOwner = currentUser?.uid === comment.user_id
  const replyCount = comment.reply_count || 0

  return (
    <div className={`cs-comment ${depth > 0 ? 'cs-comment--reply' : ''}`}>
      <Avatar user={comment.author} size={depth > 0 ? 28 : 36}/>
      <div className="cs-comment-body">
        <div className="cs-comment-meta">
          <span className="cs-username">{comment.author?.display_name || comment.author?.username || 'Anonymous'}</span>
          <span className="cs-time">{timeAgo(comment.created_at)}</span>
          {comment.status === 'pending' && <span className="cs-pending">Pending</span>}
          {isOwner && (
            <div className="cs-menu-wrap">
              <button className="cs-menu-btn" onClick={() => setShowMenu(p=>!p)}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
              </button>
              {showMenu && (
                <div className="cs-menu">
                  <button className="cs-menu-item cs-menu-item--danger" onClick={() => { setShowMenu(false); addToast('Delete not yet enabled in v2.4.0','info') }}>
                    <FontAwesomeIcon icon={faTrash}/> Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="cs-text">{comment.body}</p>

        <div className="cs-actions">
          <button className={`cs-action-btn ${myReact==='like'?'cs-action-btn--active':''}`} onClick={()=>handleLike('like')}>
            <FontAwesomeIcon icon={myReact==='like' ? faThumbsUp : faThumbsUpReg}/>
            {likes > 0 && <span>{likes}</span>}
          </button>
          <button className={`cs-action-btn ${myReact==='dislike'?'cs-action-btn--red':''}`} onClick={()=>handleLike('dislike')}>
            <FontAwesomeIcon icon={myReact==='dislike' ? faThumbsDown : faThumbsDownReg}/>
          </button>
          {depth === 0 && (
            <button className="cs-action-btn cs-action-reply" onClick={() => onReply(comment)}>
              <FontAwesomeIcon icon={faReply}/> Reply
            </button>
          )}
        </div>

        {/* Reply toggle */}
        {depth === 0 && replyCount > 0 && (
          <button className="cs-replies-toggle" onClick={loadReplies}>
            {rLoading
              ? <FontAwesomeIcon icon={faSpinner} spin/>
              : <FontAwesomeIcon icon={faChevronDown} style={{ transform: rShown ? 'rotate(180deg)' : 'none', transition:'transform .2s' }}/>
            }
            {rShown ? 'Hide' : 'View'} {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
          </button>
        )}

        {/* Replies */}
        <AnimatePresence>
          {rShown && replies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="cs-replies"
            >
              {replies.map(r => (
                <Comment key={r.id} comment={r} currentUser={currentUser}
                  onReply={onReply} contentType={contentType} contentId={contentId} depth={1}/>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Comment Form ───────────────────────────────────────────
function CommentForm({ currentUser, onSubmit, onLoginRedirect, replyingTo, onCancelReply, placeholder }) {
  const [body,   setBody]   = useState('')
  const [sending,setSending] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (replyingTo) textareaRef.current?.focus()
  }, [replyingTo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentUser) { onLoginRedirect(); return }
    if (!body.trim() || sending) return
    setSending(true)
    try {
      await onSubmit(body.trim())
      setBody('')
    } finally { setSending(false) }
  }

  if (!currentUser) return (
    <div className="cs-login-prompt" onClick={onLoginRedirect}>
      <div className="cs-login-avatar"><FontAwesomeIcon icon={faUser}/></div>
      <div className="cs-login-text">
        <strong>Join the conversation</strong>
        <span>Sign in to leave a comment</span>
      </div>
    </div>
  )

  return (
    <form className="cs-form" onSubmit={handleSubmit}>
      <Avatar user={{ photo_url: currentUser.photoURL, display_name: currentUser.displayName }} size={36}/>
      <div className="cs-form-right">
        {replyingTo && (
          <div className="cs-replying-banner">
            <FontAwesomeIcon icon={faReply}/> Replying to <strong>{replyingTo.author?.display_name || 'comment'}</strong>
            <button type="button" className="cs-cancel-reply" onClick={onCancelReply}>Cancel</button>
          </div>
        )}
        <textarea
          ref={textareaRef}
          className="cs-textarea"
          placeholder={placeholder || 'Write a comment…'}
          value={body}
          onChange={e => setBody(e.target.value)}
          maxLength={1000}
          rows={replyingTo ? 2 : 3}
        />
        <div className="cs-form-footer">
          <span className="cs-char">{body.length}/1000</span>
          <button
            type="submit"
            className="cs-submit"
            disabled={!body.trim() || sending}
          >
            {sending
              ? <FontAwesomeIcon icon={faSpinner} spin/>
              : <><FontAwesomeIcon icon={faPaperPlane}/> {replyingTo ? 'Reply' : 'Comment'}</>
            }
          </button>
        </div>
      </div>
    </form>
  )
}

// ── Main CommentsSection ───────────────────────────────────
export default function CommentsSection({
  contentType = 'project',
  contentId,
  enabled     = true,
}) {
  const user      = useAuthStore(s => s.user)
  const addToast  = useToastStore(s => s.add)
  const navigate  = useNavigate()
  const location  = useLocation()

  const [comments,   setComments]   = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [hasMore,    setHasMore]    = useState(false)
  const [loadingMore,setLoadingMore] = useState(false)
  const [page,       setPage]       = useState(0)
  const [sort,       setSort]       = useState('newest')
  const [sortOpen,   setSortOpen]   = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [total,      setTotal]      = useState(0)

  const loginRedirect = useCallback((target = 'comments') => {
    const returnUrl = encodeURIComponent(location.pathname + '#comments')
    navigate(`/login?redirect=${returnUrl}`)
  }, [location, navigate])

  const fetchComments = useCallback(async (resetPage = true) => {
    if (!contentId) return
    if (resetPage) { setLoading(true); setComments([]); setPage(0) }
    else setLoadingMore(true)
    try {
      const offset = resetPage ? 0 : page * PAGE_SIZE
      const data = await getProjectComments(contentId, { limit: PAGE_SIZE, offset, sort })
      if (resetPage) setComments(data)
      else setComments(prev => [...prev, ...data])
      setHasMore(data.length === PAGE_SIZE)
      if (resetPage) setPage(1)
      else setPage(p => p + 1)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false); setLoadingMore(false)
    }
  }, [contentId, page, sort])

  useEffect(() => {
    if (enabled) fetchComments(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId, sort, enabled])

  const handleSubmit = useCallback(async (body) => {
    if (!user) { loginRedirect(); return }
    try {
      await submitComment({
        contentType, contentId, userId: user.uid, body,
        parentId: replyingTo?.id || null,
      })
      addToast('Comment submitted! It\'ll appear after review.', 'success')
      setReplyingTo(null)
      // Optimistic: add pending comment
      const newComment = {
        id: Date.now(), body, created_at: new Date().toISOString(),
        status: 'pending', user_id: user.uid,
        author: { display_name: user.displayName, photo_url: user.photoURL },
        likes: [], reply_count: 0,
      }
      if (!replyingTo) setComments(p => [newComment, ...p])
      setTotal(p => p + 1)
    } catch {
      addToast('Failed to submit comment. Try again.', 'error')
    }
  }, [user, contentType, contentId, replyingTo, loginRedirect, addToast])

  if (!enabled) return null

  const sortLabel = SORT_OPTIONS.find(s => s.value === sort)?.label

  return (
    <section className="cs-section" id="comments">
      <div className="cs-header">
        <h3 className="cs-title">
          <FontAwesomeIcon icon={faComment}/>
          Comments {total > 0 && <span className="cs-count">{total}</span>}
        </h3>

        {/* Sort dropdown */}
        <div className="cs-sort-wrap">
          <button className="cs-sort-btn" onClick={() => setSortOpen(p => !p)}>
            <FontAwesomeIcon icon={faSort}/> {sortLabel}
          </button>
          <AnimatePresence>
            {sortOpen && (
              <motion.div
                className="cs-sort-menu"
                initial={{ opacity:0, y:-6, scale:.97 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:-6, scale:.97 }}
                transition={{ duration:.15 }}
              >
                {SORT_OPTIONS.map(o => (
                  <button key={o.value} className={`cs-sort-item ${sort===o.value?'cs-sort-item--active':''}`}
                    onClick={() => { setSort(o.value); setSortOpen(false) }}>
                    {o.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comment form */}
      <CommentForm
        currentUser={user}
        onSubmit={handleSubmit}
        onLoginRedirect={loginRedirect}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />

      {/* Loading skeleton */}
      {loading && (
        <div className="cs-skeletons">
          {[1,2,3].map(i => (
            <div key={i} className="cs-comment-sk">
              <div className="sk-avatar"/>
              <div className="cs-comment-sk-body">
                <div className="sk-line sk-line--short"/>
                <div className="sk-line sk-line--full"/>
                <div className="sk-line sk-line--med"/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="cs-error">
          <FontAwesomeIcon icon={faCircleExclamationCircle}/>
          Could not load comments.
          <button onClick={() => fetchComments(true)}>Retry</button>
        </div>
      )}

      {/* Comment list */}
      {!loading && !error && (
        <>
          <div className="cs-list">
            <AnimatePresence initial={false}>
              {comments.map(comment => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity:0, y:12 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0 }}
                  transition={{ duration:.2 }}
                >
                  <Comment
                    comment={comment}
                    currentUser={user}
                    onReply={(target) => {
                      if (target === 'login') loginRedirect()
                      else setReplyingTo(target)
                    }}
                    contentType={contentType}
                    contentId={contentId}
                  />
                  {/* Inline reply form */}
                  {replyingTo?.id === comment.id && (
                    <motion.div
                      className="cs-inline-reply"
                      initial={{ opacity:0, height:0 }}
                      animate={{ opacity:1, height:'auto' }}
                      exit={{ opacity:0, height:0 }}
                    >
                      <CommentForm
                        currentUser={user}
                        onSubmit={handleSubmit}
                        onLoginRedirect={loginRedirect}
                        replyingTo={replyingTo}
                        onCancelReply={() => setReplyingTo(null)}
                        placeholder={`Reply to ${replyingTo.author?.display_name || 'comment'}…`}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {comments.length === 0 && (
            <div className="cs-empty">
              <div className="cs-empty-icon"><FontAwesomeIcon icon={faComment}/></div>
              <div className="cs-empty-title">No comments yet</div>
              <div className="cs-empty-sub">Be the first to share your thoughts!</div>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="cs-loadmore-wrap">
              <button
                className="cs-loadmore"
                onClick={() => fetchComments(false)}
                disabled={loadingMore}
              >
                {loadingMore
                  ? <><FontAwesomeIcon icon={faSpinner} spin/> Loading…</>
                  : <><FontAwesomeIcon icon={faChevronDown}/> Load more comments</>
                }
              </button>
            </div>
          )}
        </>
      )}

      <style>{`
        .cs-section { padding: 2rem 0; }
        .cs-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .cs-title {
          display: flex; align-items: center; gap: .6rem;
          font-size: 1.15rem; font-weight: 700; color: var(--text-primary);
          margin: 0;
        }
        .cs-count {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 22px; height: 22px; padding: 0 6px;
          background: var(--accent-light); color: var(--accent-primary);
          border-radius: var(--radius-full); font-size: .7rem; font-weight: 700;
        }
        .cs-sort-wrap { position: relative; }
        .cs-sort-btn {
          display: flex; align-items: center; gap: .4rem;
          padding: .4rem .75rem; border-radius: 8px;
          background: transparent; border: 1px solid var(--border-color);
          font-size: .8rem; color: var(--text-secondary); cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cs-sort-btn:hover { background: var(--bg-surface-2); }
        .cs-sort-menu {
          position: absolute; right: 0; top: calc(100% + 6px);
          background: var(--bg-elevated); border: 1px solid var(--border-color);
          border-radius: 10px; min-width: 160px;
          box-shadow: var(--shadow-md); overflow: hidden; z-index: 50;
        }
        .cs-sort-item {
          display: block; width: 100%; text-align: left;
          padding: .6rem .9rem; font-size: .85rem; color: var(--text-secondary);
          background: transparent; border: none; cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cs-sort-item:hover { background: var(--bg-surface-2); color: var(--text-primary); }
        .cs-sort-item--active { color: var(--accent-primary); font-weight: 600; }

        /* Login prompt */
        .cs-login-prompt {
          display: flex; align-items: center; gap: .75rem;
          padding: .9rem 1rem;
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          border-radius: 12px; cursor: pointer; margin-bottom: 1.5rem;
          transition: all var(--transition-fast);
        }
        .cs-login-prompt:hover { border-color: var(--accent-primary); background: var(--accent-light); }
        .cs-login-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--bg-surface-3); display: flex; align-items: center; justify-content: center;
          color: var(--text-tertiary); flex-shrink: 0;
        }
        .cs-login-text { display: flex; flex-direction: column; }
        .cs-login-text strong { font-size: .9rem; color: var(--text-primary); }
        .cs-login-text span { font-size: .8rem; color: var(--text-tertiary); margin-top: 1px; }

        /* Form */
        .cs-form { display: flex; gap: .75rem; align-items: flex-start; margin-bottom: 1.5rem; }
        .cs-form-right { flex: 1; display: flex; flex-direction: column; gap: .5rem; }
        .cs-replying-banner {
          display: flex; align-items: center; gap: .5rem;
          font-size: .8rem; color: var(--text-tertiary);
          background: var(--bg-surface-2); padding: .4rem .7rem;
          border-radius: 8px;
        }
        .cs-replying-banner strong { color: var(--text-primary); }
        .cs-cancel-reply {
          margin-left: auto; background: transparent; border: none;
          font-size: .78rem; color: var(--text-accent); cursor: pointer;
        }
        .cs-textarea {
          width: 100%; background: var(--bg-surface-2);
          border: 1px solid var(--border-color);
          border-radius: 10px; padding: .6rem .8rem;
          font-size: .9rem; color: var(--text-primary);
          font-family: var(--font-body); resize: none; outline: none;
          transition: border-color var(--transition-fast);
        }
        .cs-textarea:focus { border-color: var(--accent-primary); }
        .cs-form-footer { display: flex; align-items: center; justify-content: space-between; }
        .cs-char { font-size: .72rem; color: var(--text-tertiary); }
        .cs-submit {
          display: flex; align-items: center; gap: .4rem;
          padding: .45rem .9rem; border-radius: 8px;
          background: var(--accent-primary); border: none; color: #fff;
          font-size: .83rem; font-weight: 600; cursor: pointer;
          transition: background var(--transition-fast);
        }
        .cs-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .cs-submit:disabled { opacity: .5; cursor: not-allowed; }

        /* Comment */
        .cs-comment {
          display: flex; gap: .75rem; padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .cs-comment:last-child { border-bottom: none; }
        .cs-comment--reply { padding: .75rem 0 .75rem 1rem; border-bottom: none; }
        .cs-comment-body { flex: 1; min-width: 0; }
        .cs-comment-meta {
          display: flex; align-items: center; gap: .5rem;
          margin-bottom: .4rem; flex-wrap: wrap;
        }
        .cs-username { font-size: .88rem; font-weight: 600; color: var(--text-primary); }
        .cs-time { font-size: .78rem; color: var(--text-tertiary); }
        .cs-pending {
          font-size: .7rem; padding: 1px 6px; border-radius: 4px;
          background: rgba(234,179,8,.12); color: #d97706; border: 1px solid rgba(234,179,8,.3);
        }
        .cs-menu-wrap { position: relative; margin-left: auto; }
        .cs-menu-btn {
          background: transparent; border: none; cursor: pointer;
          color: var(--text-tertiary); padding: 2px 6px;
          border-radius: 6px; transition: all var(--transition-fast);
        }
        .cs-menu-btn:hover { background: var(--bg-surface-2); color: var(--text-primary); }
        .cs-menu {
          position: absolute; right: 0; top: 100%;
          background: var(--bg-elevated); border: 1px solid var(--border-color);
          border-radius: 8px; min-width: 130px;
          box-shadow: var(--shadow-md); z-index: 30;
        }
        .cs-menu-item {
          display: flex; align-items: center; gap: .5rem;
          width: 100%; text-align: left; padding: .5rem .75rem;
          background: transparent; border: none; font-size: .83rem;
          color: var(--text-secondary); cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cs-menu-item:hover { background: var(--bg-surface-2); }
        .cs-menu-item--danger { color: #ef4444; }
        .cs-text {
          font-size: .9rem; color: var(--text-secondary);
          line-height: 1.6; margin: 0 0 .5rem; white-space: pre-wrap; word-break: break-word;
        }
        .cs-actions { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
        .cs-action-btn {
          display: flex; align-items: center; gap: .35rem;
          padding: .3rem .6rem; border-radius: 6px;
          background: transparent; border: none;
          font-size: .8rem; color: var(--text-tertiary); cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cs-action-btn:hover { background: var(--bg-surface-2); color: var(--text-primary); }
        .cs-action-btn--active { color: var(--accent-primary) !important; background: var(--accent-light) !important; }
        .cs-action-btn--red { color: #ef4444 !important; }
        .cs-action-reply { margin-left: 4px; }

        .cs-replies-toggle {
          display: inline-flex; align-items: center; gap: .4rem;
          margin-top: .4rem;
          background: transparent; border: none;
          font-size: .8rem; color: var(--accent-primary); cursor: pointer;
          transition: opacity var(--transition-fast);
        }
        .cs-replies-toggle:hover { opacity: .75; }
        .cs-replies { margin-top: .5rem; padding-left: .75rem; border-left: 2px solid var(--border-color); }
        .cs-inline-reply { padding-left: 2.75rem; margin-top: .5rem; overflow: hidden; }

        /* Skeletons */
        .cs-skeletons { display: flex; flex-direction: column; gap: 1rem; }
        .cs-comment-sk { display: flex; gap: .75rem; }
        .sk-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--sk-base); flex-shrink: 0;
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: sk-shimmer 1.4s infinite linear; }
        .cs-comment-sk-body { flex: 1; display: flex; flex-direction: column; gap: .4rem; padding-top: .25rem; }
        .sk-line { height: 14px; border-radius: 6px; background: var(--sk-base);
          background-image: linear-gradient(90deg, var(--sk-base) 0%, var(--sk-shine) 50%, var(--sk-base) 100%);
          background-size: 200% 100%; animation: sk-shimmer 1.4s infinite linear; }
        .sk-line--short { width: 30%; }
        .sk-line--full  { width: 100%; }
        .sk-line--med   { width: 60%; }
        @keyframes sk-shimmer { to { background-position: -200% 0; } }

        /* Error */
        .cs-error {
          display: flex; align-items: center; gap: .6rem;
          padding: 1rem; background: rgba(239,68,68,.06);
          border: 1px solid rgba(239,68,68,.2); border-radius: 10px;
          font-size: .88rem; color: var(--text-secondary);
        }
        .cs-error button {
          margin-left: auto; background: transparent; border: none;
          color: var(--accent-primary); cursor: pointer; font-size: .85rem;
        }

        /* Empty */
        .cs-empty { text-align: center; padding: 2.5rem 1rem; }
        .cs-empty-icon { font-size: 2rem; color: var(--border-strong); margin-bottom: .75rem; }
        .cs-empty-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: .25rem; }
        .cs-empty-sub { font-size: .85rem; color: var(--text-tertiary); }

        /* Load more */
        .cs-loadmore-wrap { text-align: center; padding: 1rem 0; }
        .cs-loadmore {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .55rem 1.25rem; border-radius: 10px;
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          font-size: .875rem; color: var(--text-secondary); cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cs-loadmore:hover:not(:disabled) { background: var(--bg-surface-3); }
        .cs-loadmore:disabled { opacity: .6; cursor: not-allowed; }
      `}</style>
    </section>
  )
}
