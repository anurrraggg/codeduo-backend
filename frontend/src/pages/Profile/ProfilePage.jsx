import React from 'react';
import apiClient from '../../lib/apiClient';
import { useAuth } from '../../auth/AuthContext';
import Top from '../Home/TOP/Top';
import '../Home/TOP/Top.css';
import '../Home/Center/Center.css';

function ProfilePage() {
	const { user } = useAuth();

	return (
		<div>
			<Top />
			<div className="center_body" style={{ backgroundColor: 'black' }}>
				<div style={{ background: '#e6f0ff', padding: 24, borderRadius: 12, color: '#2a4d8f', minWidth: 360 }}>
					<h2 style={{ marginTop: 0 }}>Profile</h2>
					<div style={{ lineHeight: 1.8 }}>
						<p><strong>Username:</strong> {user?.username}</p>
						<p><strong>Display name:</strong> {user?.displayName || user?.username}</p>
						<p><strong>Email:</strong> {user?.email}</p>
						<p><strong>Points:</strong> {user?.points || 0} 🏆</p>
					</div>
					<div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
						<a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Home</button></a>
						<a href="/leaderboard" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/leaderboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Leaderboard</button></a>
						<a href="/settings" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/settings'); window.dispatchEvent(new PopStateEvent('popstate')); }}><button>Settings</button></a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;


