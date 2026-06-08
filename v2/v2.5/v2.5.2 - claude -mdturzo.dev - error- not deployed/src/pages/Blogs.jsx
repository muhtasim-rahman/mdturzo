// Blogs.jsx — v2.5.0
// Redirects to /feed?type=blog (Feed is now the unified system)
import { Navigate } from 'react-router-dom'
export default function Blogs() { return <Navigate to="/feed?type=blog" replace /> }
