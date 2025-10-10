import { Redirect } from 'expo-router';

import { useAuth } from '@/main/auth';

export default function Index() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return null;
  }

  return <Redirect href={isAuthenticated ? '/(tabs)' : '/auth'} />;
}
