import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = {
    name: 'John Doe',
    email: 'H2yZM@example.com',
    role: 'admin',
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}