import React, { useState } from 'react';
import Top from '../Home/TOP/Top';
import '../Home/TOP/Top.css';
import '../Home/Center/Center.css';
import './authTheme.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function RegisterPage() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await register(name, email, password);
			navigate('/profile');
		} catch (err) {
			setError(err?.message || 'Registration failed.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Top />
			<div className="center_body" style={{ backgroundColor: 'black' }}>
				<div className="auth-card">
					<h2 className="auth-title">Create your account</h2>
					<form className="auth-form" onSubmit={handleSubmit}>
						<input className="auth-input" type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required />
						<input className="auth-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
						<button className="auth-button" type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
					</form>
					{error && <p className="auth-error">{error}</p>}
					<p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;


