
import {useState, useContext, useEffect, FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png';
import avatar from '../images/avatar.jpeg';
import {Link, useNavigate, useLocation, NavigateFunction} from 'react-router-dom';
import {AuthContext} from '../App';
import {logout, fetchAuthUser} from '../utils/AuthUtils';
import {AuthContextType} from '../@types/auth';

const Navbar: FC = () => {
	const [navLink, setNavLink] = useState<string>('/');
	let navigate: NavigateFunction = useNavigate();
	const folder = process.env.REACT_APP_IMAGE_URL;
	const {auth, setAuth, setReload} = useContext<AuthContextType>(AuthContext);
	const {pathname} = useLocation();

	useEffect(() => {
		fetchAuthUser(setAuth, setReload, navigate).catch((err) => {
			console.log(err);
		});
	}, []);

	function handleLogout() {
		logout(setAuth, setReload, navigate);
		setNavLink('/login');
	}

	const capitalize = (name: string) => name.toUpperCase();

	return (
		<nav className="w-full h-12 my-3 bg-white sticky top-0 flex items-center font-lora">
			<div
				style={{flex: 2}}
				className="flex items-center justify-center">
				<Link
					to="/"
					onClick={() => setNavLink('/')}>
					<img
						src={logo}
						className="w-30 h-10"
						alt="logo"
					/>
				</Link>
			</div>
			<div style={{flex: 4}}>
				<ul className="flex gap-10 justify-start h-8 list-none">
					<li className="cursor-pointer font-light text-lg ml-10">
						<Link
							className={`nav-link ${navLink === '/' && 'current'}`}
							onClick={() => setNavLink('/')}
							to="/">
							HOME
						</Link>
					</li>
					{auth && (
						<li className="cursor-pointer font-light text-lg">
							<Link
								className={`nav-link ${navLink === '/create' && 'current'}`}
								onClick={() => setNavLink('/create')}
								to="/create">
								CREATE
							</Link>

						</li>
					)}
				</ul>
			</div>
			<div
				style={{flex: 6}}
				className="flex justify-evenly align-middle h-8">
				<div>
					{auth && (
						<ul className="flex gap-10 cursor-pointer font-light text-lg">
							<li>
								<Link
									className={`cursor-pointer text-lg nav-link ${navLink === '/userpage' && 'current'}`}
									onClick={() => setNavLink('/userpage')}
									to="/userpage">{`HI ${capitalize(auth.username)}`}</Link>
							</li>

							<li>
								<a
									className="cursor-pointer text-lg nav-link"
									onClick={handleLogout}>
									LOGOUT
								</a>
							</li>

							<li
								className={`cursor-pointer text-lg nav-link ${navLink === '/profile' && 'current'}`}
								onClick={() => setNavLink('/profile')}>
								<Link to="/profile">
									<img
										className="w-8 h-8 rounded-full items-center cursor-pointer"
										src={auth.image ? folder + '/' + auth.image : avatar}
										alt="profile avatar"
									/>
								</Link>
							</li>
						</ul>
					)}

					{!auth && (
						<ul className="flex gap-10 cursor-pointer font-light text-lg mx-8">
							<li>
								<Link
									className={`cursor-pointer text-lg nav-link ${navLink === '/login' && 'current'}`}
									onClick={() => setNavLink('/login')}
									to="/login">
									LOGIN
								</Link>
							</li>
							<li>
								<Link
									className={`cursor-pointer text-lg nav-link ${navLink === '/register' && 'current'}`}
									onClick={() => setNavLink('/register')}
									to="/register">
									REGISTER
								</Link>
							</li>
						</ul>
					)}
				</div>

				<div>
					<label>
						<FontAwesomeIcon
							className="ml-2 cursor-pointer w-5 h-7"
							icon={faMagnifyingGlass}
						/>
						<input
							type="text"
							placeholder="Search here"
							className="h-full rounded-md mx-3 p-2 w-28"
						/>
					</label>
				</div>

			</div>
		</nav>
	);
};

export default Navbar;
