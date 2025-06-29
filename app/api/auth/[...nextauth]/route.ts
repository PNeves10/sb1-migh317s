import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock users for demo - in production, verify against your database
        const mockUsers = {
          'demo@buyer.com': {
            id: '1',
            email: 'demo@buyer.com',
            name: 'Demo Buyer',
            userType: 'buyer'
          },
          'demo@seller.com': {
            id: '2',
            email: 'demo@seller.com',
            name: 'Demo Seller',
            userType: 'seller'
          },
          'admin@aiquira.com': {
            id: '3',
            email: 'admin@aiquira.com',
            name: 'AIQuira Admin',
            userType: 'both'
          }
        }

        const user = mockUsers[credentials.email as keyof typeof mockUsers]
        
        if (user && credentials.password === 'demo123') {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            userType: user.userType
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub
        session.user.userType = token.userType
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export async function GET(request: Request) {
  return handler(request)
}

export async function POST(request: Request) {
  return handler(request)
}