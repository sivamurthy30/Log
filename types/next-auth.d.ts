import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's login type (user or hr) */
      loginType?: 'user' | 'hr';
    } & DefaultSession['user'];
  }

  interface User {
    /** The user's login type (user or hr) */
    loginType?: 'user' | 'hr';
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's login type (user or hr) */
    loginType?: 'user' | 'hr';
  }
}