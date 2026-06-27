// Reviews.jsx -- v2.3.6 (renamed from Testimonials.jsx; "Reviews" name already used since v2.2.2)
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faQuoteLeft, faPen, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getApprovedReviews } from '../../services/supabase.js'
import { SkeletonBox, SkeletonCircle } from '../ui/Skeleton.jsx'

const FALLBACK = [
  { id:1, reviewer_name:'Arif Hossain',  reviewer_role:'Client -- Logo Design',      rating:5, body:'Exceptional design work! Muhtasim delivered a professional logo that perfectly captured my brand vision. Fast, communicative, and highly skilled.' },
  { id:2, reviewer_name:'Tanvir Ahmed',  reviewer_role:'Client -- Website',           rating:5, body:'The portfolio website he built for me was clean, fast, and exactly what I needed. Great attention to detail and responsive to feedback.' },
  { id:3, reviewer_name:'Rina Begum',    reviewer_role:'Client -- Thumbnail Design',  rating:4, body:'Loved the YouTube thumbnails -- vibrant and eye-catching. Click-through rate improved noticeably after switching to his designs.' },
]

function Stars({n}){
  return <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><FontAwesomeIcon key={i} icon={faStar} className={`text-xs ${i<=n?'text-amber-400':'text-[var(--border-strong)]'}`}/>)}</div>
}

function Card({r,i}){
  const initials = r.reviewer_name?.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
  return(
    <motion.div className="card p-6 flex flex-col gap-4"
      initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:.2}} transition={{duration:.5,delay:i*.09}}>
      <FontAwesomeIcon icon={faQuoteLeft} className="text-[var(--accent-primary)] opacity-25 text-2xl"/>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 italic">"{r.body}"</p>
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          {r.avatar_url
            ? <img src={r.avatar_url} alt={r.reviewer_name} className="w-9 h-9 rounded-full object-cover"/>
            : <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] text-xs font-bold flex-shrink-0">{initials}</div>
          }
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{r.reviewer_name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)]">{r.reviewer_role}</p>
          </div>
        </div>
        <Stars n={r.rating}/>
      </div>
    </motion.div>
  )
}

export default function Reviews(){
  const [reviews,setReviews] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    getApprovedReviews({limit:3})
      .then(d=>setReviews(d?.length ? d : FALLBACK))
      .catch(()=>setReviews(FALLBACK))
      .finally(()=>setLoading(false))
  },[])

  return(
    <section className="section" id="reviews">
      <div className="container-xl">
        {/* Header with Give Review btn */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.5}}>
            <p className="text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold mb-2">Kind Words</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Reviews</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">From clients, collaborators &amp; visitors</p>
          </motion.div>
          <motion.div className="flex items-center gap-3 flex-shrink-0"
            initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5,delay:.1}}>
            <Link to="/reviews" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 group">
              View all <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform duration-200 group-hover:translate-x-1"/>
            </Link>
            <Link to="/reviews/give" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-colors duration-200 active:scale-[.97]">
              <FontAwesomeIcon icon={faPen} className="text-xs"/> Give Review
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loading
            ? Array.from({length:3},(_,i)=>(
                <div key={i} className="card p-6 space-y-4">
                  <SkeletonBox h="h-4" w="w-8" rounded="rounded"/>
                  <SkeletonBox h="h-16" rounded="rounded" delay={.05}/>
                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)]">
                    <SkeletonCircle size={36}/> <div className="space-y-1.5 flex-1"><SkeletonBox h="h-3.5" w="w-24" rounded="rounded"/><SkeletonBox h="h-3" w="w-16" rounded="rounded" delay={.08}/></div>
                  </div>
                </div>
              ))
            : reviews.map((r,i)=><Card key={r.id} r={r} i={i}/>)
          }
        </div>
      </div>
    </section>
  )
}
