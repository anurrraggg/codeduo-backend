import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function GuestRoute({ children }) {
	const { user, isInitializing } = useAuth();
	if (isInitializing) return null;
	if (user) return <Navigate to="/" replace />;
	return children;
}

export default GuestRoute;


