// Posts.jsx — v2.5.0
// Redirects to /feed?type=post (Feed is now the unified system)
import { Navigate } from 'react-router-dom'
export default function Posts() { return <Navigate to="/feed?type=post" replace /> }
