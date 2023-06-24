import { MongoClient } from 'mongodb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { WithId } from 'mongodb';

const mongoUri = process.env.DB_URL || '';

interface User {
  id: string;
  email: string;
  password: string;
  // Add other properties if necessary
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jjonahjames@dailybugle.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const client = new MongoClient(mongoUri);

        try {
          await client.connect();
          const db = client.db();

          const collection = db.collection<User>('users');

          const user = await collection.findOne({ email });

          if (user) {
            if (user.password === password) {
              return user;
            } else {
              throw new Error('Incorrect password');
            }
          } else {
            throw new Error('No user found with this email id');
          }
        } finally {
          await client.close();
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
