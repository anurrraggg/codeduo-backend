import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }) {
	const { user, isInitializing } = useAuth();
	if (isInitializing) {
		return null;
	}
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
}

export default ProtectedRoute;


