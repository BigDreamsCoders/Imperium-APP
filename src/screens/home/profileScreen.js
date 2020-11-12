import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Layout } from './components/layout';

export function ProfileScreen() {
  const {
    state: { user },
  } = useContext(AuthContext);
  console.log(user);
  return <Layout></Layout>;
}
