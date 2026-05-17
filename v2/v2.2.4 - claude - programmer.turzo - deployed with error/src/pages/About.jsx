// About.jsx — v2.2.4
// Contents cleared — full redesign planned for v2.3.0
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../config/site.config.js'
import { buildTitle } from '../utils/seo.js'

export default function About() {
  return (
    <>
      <Helmet>
        <title>{buildTitle('About')}</title>
      </Helmet>
      <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'1rem',paddingBlock:'4rem'}}>
        <p style={{fontSize:'3rem',lineHeight:1}}>🚧</p>
        <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:800,color:'var(--text-primary)',textAlign:'center'}}>About page coming soon</h1>
        <p style={{color:'var(--text-secondary)',fontSize:'.9rem',textAlign:'center',maxWidth:400}}>
          Full redesign in progress — will be available in v2.3.0.
        </p>
      </div>
    </>
  )
}
