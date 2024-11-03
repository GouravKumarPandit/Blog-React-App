import './App.css'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth/'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false))
	}, [])

	return !loading ? (
		<div className='min-h-screen flex flex-wrap content-between bg-blue-100' style={{ 
			backgroundImage: `url("https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg?t=st=1730621543~exp=1730625143~hmac=cebaa5a24aa907d43605a0ec024df0bc67ea03d99c9c60f504ad4f0d7dd3db90&w=1060")`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat'
		}}>
			<div className='w-full block'>
				<Header />
				<main className='min-h-[72vh]'>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : null;
}

export default App
