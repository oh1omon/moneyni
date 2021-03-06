import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HomeIcon } from '../assets/icons/HomeIcon'
import { ProfileIcon } from '../assets/icons/ProfileIcon'
import AddOperation from './AddOperation'
import Me from './Me'
import Update from './Update'

const Navbar = (): JSX.Element => {
	const location = useLocation()
	const [component, setComponent] = useState('')

	useEffect(() => {
		switch (location.pathname) {
			case '/addspend':
				setComponent('addspend')
				break
			case '/me':
				setComponent('me')
				break
			case '/update':
				setComponent('update')
				break
			default:
				setComponent('')
		}
	}, [location.pathname])
	return (
		<div className='fixed bottom-0 left-0 flex justify-around items-center flex-col w-full h-auto rounded-t-2xl bg-gradient-to-t from-main-dark to-main-light'>
			<div
				className={`transition-all duration-200 ease-out w-full ${
					component === 'addspend' && 'h-screen-4.5/10'
				} ${component === 'me' && 'h-16'} ${component === '' && 'h-0'} ${
					component === 'update' && 'h-64'
				}`}
			>
				{component === 'addspend' && <AddOperation />}
				{component === 'me' && <Me />}
				{component === 'update' && <Update />}
			</div>
			<div className=' w-full h-full flex justify-center items-center py-5'>
				<ul className='w-4/5 h-4/5 bg-blue-300  flex flex-row justify-between items-center '>
					<li className='flex justify-center items-center '>
						<NavLink activeClassName='text-red-700' to={'/'}>
							<HomeIcon />
						</NavLink>
					</li>
					<li className='flex justify-center items-center'>
						<NavLink activeClassName='text-red-700' to={'/me'}>
							<ProfileIcon />
						</NavLink>
					</li>
					<li className='flex justify-center items-center'>
						<NavLink activeClassName='text-red-700' to={'/addspend'}>
							<div
								className={'bg-main-yellow text-main-dark py-1.5 px-3 font-semibold  rounded-2xl'}
							>
								ADD
							</div>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar
