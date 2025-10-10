import connectDB from '@/lib/mongodb'
import { User, UserDocument } from '@/models/User'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminUsersPage() {
  await connectDB()
  const users = await User.find().sort({ createdAt: -1 })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No users found.
            </p>
          ) : (
            <div className="space-y-4">
              {users.map((user: UserDocument) => (
                <div
                  key={user._id.toString()}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        user.role === 'admin'
                          ? 'default'
                          : user.role === 'author'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
