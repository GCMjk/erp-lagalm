import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo', type: 'email', placeholder: 'correo@algo.com' },
                password: { label: 'Contraseña', type: 'password' }
            },
            async authorize(credentials) {

                console.log({ credentials })
                return null;

            }
        })
    ],

    jwt: {

    },

    callbacks: {

        async jwt({ token, account, user }) {

            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {

                    case 'credentials':
                        token.user = user;
                        break;

                }
            }

            return token;
        },

        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.user = token.user as any;

            return session;
        }

    }
}

export default NextAuth(authOptions)