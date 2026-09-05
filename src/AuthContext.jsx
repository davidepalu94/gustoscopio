import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  function signUp(email, password) {
    return supabase.auth.signUp({ email, password });
  }

  function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function hasPurchased(courseId) {
    if (!session?.user) return false;
    const { data, error } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('course_id', courseId)
      .maybeSingle();
    if (error) return false;
    return Boolean(data);
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
    hasPurchased,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve essere usato dentro <AuthProvider>');
  }
  return ctx;
}
