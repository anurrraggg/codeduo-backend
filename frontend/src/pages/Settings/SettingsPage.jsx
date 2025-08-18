import React, { useEffect, useState } from 'react';
import Top from '../Home/TOP/Top';
import '../Home/TOP/Top.css';
import '../Home/Center/Center.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import apiClient from '../../lib/apiClient';
import { useTheme } from '../../theme/ThemeContext';

function SettingsPage() {
	const { user, refreshUser, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const [displayName, setDisplayName] = useState(user?.displayName || user?.username || '');
	const [message, setMessage] = useState('');

	useEffect(() => {
		setDisplayName(user?.displayName || user?.username || '');
	}, [user]);

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			await apiClient.put('/auth/me', { displayName });
			await refreshUser();
			setMessage('Saved!');
		} catch (err) {
			setMessage('Could not save.');
		}
	};

	return (
		<div>
			<Top />
			<div className="center_body">
				<div className="auth-card glass" style={{ minWidth: 420 }}>
					<h2 className="auth-title">Settings</h2>
					<form className="auth-form" onSubmit={handleSave}>
						<label style={{ fontWeight: 700 }}>Display name</label>
						<input className="auth-input" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
						<button className="auth-button" type="submit">Save</button>
					</form>
					{message && <p className="auth-error" style={{ color: theme === 'light' ? '#2a4d8f' : '#eaf2ff' }}>{message}</p>}
					<div style={{ marginTop: 16 }}>
						<label style={{ fontWeight: 700, marginRight: 8 }}>Theme</label>
						<button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'light' ? <span aria-hidden>🌙</span> : <span aria-hidden>☀️</span>}</button>
					</div>
					<div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
						<button onClick={() => navigate('/')}>Back to Home</button>
						<button onClick={logout}>Logout</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;


