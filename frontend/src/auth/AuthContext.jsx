import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import apiClient from '../lib/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [isInitializing, setIsInitializing] = useState(true);

	const getStoredToken = () => localStorage.getItem('token');

	const fetchAuthenticatedUser = useCallback(async () => {
		const token = getStoredToken();
		if (!token) {
			setCurrentUser(null);
			return null;
		}
		try {
			const response = await apiClient.get('/auth/me');
			setCurrentUser(response.data?.user ?? response.data);
			return response.data;
		} catch (_error) {
			localStorage.removeItem('token');
			setCurrentUser(null);
			return null;
		}
	}, []);

	useEffect(() => {
		(async () => {
			await fetchAuthenticatedUser();
			setIsInitializing(false);
		})();
	}, [fetchAuthenticatedUser]);

	const login = useCallback(async (email, password) => {
		try {
			const response = await apiClient.post('/auth/login', { emailOrUsername: email, password });
			localStorage.setItem('token', response.data.token);
			setCurrentUser(response.data.user);
			return response.data.user;
		} catch (error) {
			const message = error?.response?.data?.message || 'Login failed';
			throw new Error(message);
		}
	}, []);

	const register = useCallback(async (name, email, password) => {
		try {
			// Include 'username' to support backends expecting that field name
			const response = await apiClient.post('/auth/register', { name, username: name, email, password });
			localStorage.setItem('token', response.data.token);
			setCurrentUser(response.data.user);
			return response.data.user;
		} catch (error) {
			const message = error?.response?.data?.message || 'Registration failed';
			throw new Error(message);
		}
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		setCurrentUser(null);
	}, []);

	const value = {
		user: currentUser,
		isInitializing,
		login,
		register,
		logout,
		refreshUser: fetchAuthenticatedUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
}


