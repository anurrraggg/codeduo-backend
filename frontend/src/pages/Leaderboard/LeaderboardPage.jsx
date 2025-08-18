import React, { useEffect, useState } from 'react';
import Top from '../Home/TOP/Top';
import '../Home/TOP/Top.css';
import '../Home/Center/Center.css';
import apiClient from '../../lib/apiClient';

function LeaderboardPage() {
	const [data, setData] = useState({ top: [], me: null });

	useEffect(() => {
		(async () => {
			const resp = await apiClient.get('/leaderboard?limit=50');
			setData(resp.data);
		})();
	}, []);

	return (
		<div>
			<Top />
			<div className="center_body">
				<div className="center_card glass" style={{ maxWidth: 720 }}>
					<h2 className="center_title">Leaderboard</h2>
					<div style={{ 
						display: 'flex', 
						flexDirection: 'column', 
						alignItems: 'center', 
						justifyContent: 'center', 
						minHeight: '300px',
						gap: '20px'
					}}>
						<div style={{ 
							fontSize: '4rem', 
							marginBottom: '20px',
							animation: 'pulse 2s infinite'
						}}>
							🚧
						</div>
						<h3 style={{ 
							color: 'var(--text-ink)', 
							fontSize: '1.5rem', 
							margin: '0',
							fontWeight: '600'
						}}>
							Working on it!
						</h3>
						<p style={{ 
							color: 'var(--neutral-600)', 
							textAlign: 'center', 
							maxWidth: '400px',
							lineHeight: '1.6'
						}}>
							We're building an amazing leaderboard system. 
							Soon you'll be able to compete with other players and see your ranking!
						</p>
						<div style={{ 
							background: '#00af9b', 
							color: 'white',
							padding: '12px 24px',
							borderRadius: '6px',
							fontWeight: '600',
							marginTop: '20px'
						}}>
							Coming Soon! 🎉
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LeaderboardPage;



