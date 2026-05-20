// Contact.jsx — v2.2.5
import { useState, useEffect } from 'react'
import { Helmet }   from 'react-helmet-async'
import { motion }   from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope, faLocationDot, faPaperPlane,
  faCheckCircle, faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { VisibilityGuard } from '../components/shared/VisibilityGuard.jsx'
import { buildTitle }      from '../utils/seo.js'
import { trackPage }       from '../services/analytics.js'
import { sendEmail }       from '../services/worker.js'
import { SITE_CONFIG }     from '../config/site.config.js'

const SOCIALS = [
  { icon: faGithub,   label: 'GitHub',   href: SITE_CONFIG.social.github,   color: '#6B7280' },
  { icon: faLinkedin, label: 'LinkedIn', href: SITE_CONFIG.social.linkedin, color: '#0A66C2' },
  { icon: faTelegram, label: 'Telegram', href: SITE_CONFIG.social.telegram, color: '#2AABEE' },
  { icon: faEnvelope, label: 'Email',    href: `mailto:${SITE_CONFIG.owner.email}`, color: '#3B82F6' },
]

const INIT = { name: '', email: '', subject: '', message: '' }

function ContactContent() {
  useEffect(() => { trackPage('Contact') }, [])
  const [form, setForm]     = useState(INIT)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20) e.message = 'Message too short (min 20 chars)'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      await sendEmail({
        to: SITE_CONFIG.owner.email,
        subject: `[Portfolio] ${form.subject}`,
        replyTo: form.email,
        from_name: form.name,
        html: `<p><b>From:</b> ${form.name} &lt;${form.email}&gt;</p><p><b>Subject:</b> ${form.subject}</p><hr/><p>${form.message.replace(/\n/g,'<br/>')}</p>`,
      })
      setStatus('success')
      setForm(INIT)
    } catch (err) {
      setStatus('error')
      setErrMsg(err.message || 'Failed to send. Please try email directly.')
    }
  }

  function change(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => { const n={...e}; delete n[k]; return n })
  }

  const inputCls = (k) => `w-full px-4 py-3 rounded-xl text-sm bg-[var(--bg-surface-2)]
    border transition-colors duration-200 outline-none text-[var(--text-primary)]
    placeholder:text-[var(--text-tertiary)]
    ${errors[k] ? 'border-red-500/60 focus:border-red-500' : 'border-[var(--border-color)] focus:border-[var(--accent-primary)]'}`

  return (
    <>
      <Helmet>
        <title>{buildTitle('Contact')}</title>
        <meta name="description" content="Contact Muhtasim Rahman — available for web development, design and video editing projects." />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="container-xl max-w-5xl">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Let's Talk</p>
            <h1 className="text-4xl font-display font-bold text-[var(--text-primary)]">Get in Touch</h1>
            <p className="text-[var(--text-secondary)] mt-3 max-w-md mx-auto text-sm leading-relaxed">
              Have a project, question, or collaboration idea? I'd love to hear from you. I typically respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
            <motion.div className="space-y-4"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
              {[
                { icon: faEnvelope,    color: '#3B82F6', label: 'Email',    value: SITE_CONFIG.owner.email },
                { icon: faLocationDot, color: '#10B981', label: 'Location', value: 'Nilphamari, Bangladesh' },
              ].map(({ icon, color, label, value }) => (
                <div key={label} className="card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, color }}>
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">{label}</p>
                    <p className="text-sm text-[var(--text-primary)] font-medium">{value}</p>
                  </div>
                </div>
              ))}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Available for work</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Open to freelance projects, collaborations, and interesting opportunities. All work follows Islamic and ethical principles.
                </p>
              </div>
              <div className="card p-4 space-y-3">
                <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Find me on</p>
                <div className="grid grid-cols-2 gap-2">
                  {SOCIALS.map(({ icon, label, href, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-color)]
                        hover:border-[var(--accent-primary)] text-[var(--text-secondary)]
                        hover:text-[var(--accent-primary)] transition-all duration-200 text-xs font-medium">
                      <FontAwesomeIcon icon={icon} style={{ color }} />{label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="card p-7"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16,1,0.3,1] }}>
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Message Sent!</h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-xs">
                    Thank you for reaching out. I'll get back to you within 24 hours, insha'Allah.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold bg-[var(--accent-primary)]
                      text-white hover:bg-[var(--accent-hover)] transition-colors duration-200">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-1">Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-secondary)]">Your Name *</label>
                      <input value={form.name} onChange={e => change('name', e.target.value)}
                        placeholder="Muhtasim Rahman" className={inputCls('name')} />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-secondary)]">Email Address *</label>
                      <input type="email" value={form.email} onChange={e => change('email', e.target.value)}
                        placeholder="you@example.com" className={inputCls('email')} />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Subject *</label>
                    <input value={form.subject} onChange={e => change('subject', e.target.value)}
                      placeholder="Project inquiry / Collaboration / Other" className={inputCls('subject')} />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Message *</label>
                    <textarea value={form.message} onChange={e => change('message', e.target.value)}
                      rows={5} placeholder="Describe your project or question in detail..."
                      className={`${inputCls('message')} resize-none`} />
                    <div className="flex items-start justify-between">
                      {errors.message ? <p className="text-xs text-red-500">{errors.message}</p> : <span />}
                      <span className="text-[10px] text-[var(--text-tertiary)]">{form.message.length}/2000</span>
                    </div>
                  </div>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-400">
                      <FontAwesomeIcon icon={faCircleExclamation} />{errMsg}
                    </div>
                  )}
                  <button type="submit" disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold
                      text-sm text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]
                      disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-[var(--shadow-glow)]
                      transition-all duration-200 active:scale-[0.98]">
                    {status === 'sending'
                      ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending...</>
                      : <><FontAwesomeIcon icon={faPaperPlane} /> Send Message</>}
                  </button>
                  <p className="text-[10px] text-center text-[var(--text-tertiary)]">
                    No spam. Your info stays private. Reply within 24h insha'Allah.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Contact() {
  return <VisibilityGuard page="contact" skeleton="form"><ContactContent /></VisibilityGuard>
}
