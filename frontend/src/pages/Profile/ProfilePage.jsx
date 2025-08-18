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
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;


