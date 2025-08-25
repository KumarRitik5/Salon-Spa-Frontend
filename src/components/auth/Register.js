import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		phone: '',
		role: 'user',
	});
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		try {
			const userData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
				phone: formData.phone,
				role: formData.role
			};
			await register(userData);
			navigate('/');
		} catch (err) {
			setError(err.message || 'Registration failed');
		}
	};

	return (
			<div className="auth-container" style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'linear-gradient(120deg, #f8fafc 60%, #ffe5e5 100%)',
			}}>
				<div className="auth-box" style={{
					boxShadow: '0 4px 24px #ff6b6b22',
					borderRadius: 12,
					padding: '1.3rem 1.2rem',
					maxWidth: 350,
					width: '100%',
					background: 'rgba(255,255,255,0.98)',
					position: 'relative',
					border: '1px solid #ffe5e5',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
			<div style={{ textAlign: 'center', marginBottom: 32 }}>
					  {/* <img src="/favicon.ico" alt="logo" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 6, boxShadow: '0 2px 8px #ff6b6b22' }} /> */}
					<h2 style={{ color: '#ff6b6b', margin: 0, fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>Salon & Spa</h2>
					<div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>Create your account to get started.</div>
				</div>
				{error && <div className="error-message">{error}</div>}
				<form onSubmit={handleSubmit} autoComplete="on">
					<div className="form-group">
						<label htmlFor="register-name">Name</label>
						<input
							id="register-name"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							autoFocus
							aria-label="Name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="register-email">Email</label>
						<input
							id="register-email"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							aria-label="Email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="register-phone">Phone</label>
						<input
							id="register-phone"
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							required
							aria-label="Phone"
						/>
					</div>
					<div className="form-group" style={{ position: 'relative' }}>
						<label htmlFor="register-password">Password</label>
						<input
							id="register-password"
							type={showPassword ? 'text' : 'password'}
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							style={{ paddingRight: 36 }}
							aria-label="Password"
						/>
						<span
							onClick={() => setShowPassword((v) => !v)}
							style={{ position: 'absolute', right: 10, top: 36, cursor: 'pointer', color: '#888', fontSize: 18 }}
							title={showPassword ? 'Hide password' : 'Show password'}
							tabIndex={0}
							role="button"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(v => !v); }}
						>
							{showPassword ? '🙈' : '👁️'}
						</span>
					</div>
					<div className="form-group" style={{ position: 'relative' }}>
						<label htmlFor="register-confirm-password">Confirm Password</label>
						<input
							id="register-confirm-password"
							type={showConfirmPassword ? 'text' : 'password'}
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							style={{ paddingRight: 36 }}
							aria-label="Confirm Password"
						/>
						<span
							onClick={() => setShowConfirmPassword((v) => !v)}
							style={{ position: 'absolute', right: 10, top: 36, cursor: 'pointer', color: '#888', fontSize: 18 }}
							title={showConfirmPassword ? 'Hide password' : 'Show password'}
							tabIndex={0}
							role="button"
							aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
							onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowConfirmPassword(v => !v); }}
						>
							{showConfirmPassword ? '🙈' : '👁️'}
						</span>
					</div>
					<div className="form-group">
						<label htmlFor="register-role">Account Type</label>
						<select id="register-role" name="role" value={formData.role} onChange={handleChange} required aria-label="Account Type">
							<option value="user">Customer</option>
							<option value="owner">Shop Owner</option>
						</select>
					</div>
					<button type="submit" className="auth-button" style={{ fontWeight: 700, fontSize: 17, marginTop: 8 }}>Register</button>
				</form>
				<div style={{ textAlign: 'center', margin: '1.5rem 0 0.5rem', color: '#aaa', fontSize: 14 }}>or register with</div>
				<div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 10 }}>
					<button style={{ background: '#fff', border: '1px solid #eee', borderRadius: 6, padding: '0.4rem 1.2rem', color: '#333', fontWeight: 600, cursor: 'not-allowed', opacity: 0.6 }} disabled>Google</button>
					<button style={{ background: '#fff', border: '1px solid #eee', borderRadius: 6, padding: '0.4rem 1.2rem', color: '#333', fontWeight: 600, cursor: 'not-allowed', opacity: 0.6 }} disabled>Facebook</button>
				</div>
				<div style={{ textAlign: 'center', marginTop: 10, fontSize: 15 }}>
					Already have an account? <a href="/login" style={{ color: '#ff6b6b', fontWeight: 600, textDecoration: 'none' }}>Login</a>
				</div>
			</div>
		</div>
		);
};

export default Register;
