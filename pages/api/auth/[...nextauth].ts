import NextAuth from 'next-auth'
import LinkedInProvider from 'next-auth/providers/linkedin'

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      version: '2.0',
    }),
  ],
})
