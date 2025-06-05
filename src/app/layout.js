"use client"
import '@/css/chat.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
export const runtime = 'edge';

export default function EmbedLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}