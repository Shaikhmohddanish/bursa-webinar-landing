export const metadata = {
  title: 'Admin - Bursa Webinar',
  description: 'Admin panel for Bursa Webinar',
}

export default function AdminLayout({ children }) {
  // Don't wrap with html and body elements
  return children;
}
