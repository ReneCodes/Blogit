import {useEffect, useState, useContext, FC} from 'react';

import Usersolo from '../Components/Usersolo';
import {AuthContext} from '../App';
import {getUserBlogs} from '../utils/BlogUtils';
import {useNavigate, NavigateFunction} from 'react-router-dom';
import {BlogInterface} from '../@types/model';
import {AuthContextType} from '../@types/auth';

const UserPage: FC = () => {
	let navigate: NavigateFunction = useNavigate();
	const {auth} = useContext<AuthContextType>(AuthContext);
	const [blog, setBlog] = useState<BlogInterface[]>([]);

	useEffect(() => {
		getUserBlogs(auth, setBlog, navigate);
	}, []);

	return (
		<div>
			<span className="flex flex-col font-open items-center text-3xl font-semibold italic color text-gray-800">
				My Blogs
			</span>
			{blog.length === 0 && (
				<div className="flex flex-col m-5 p-5 align-center justify-center">
					<h2 className="m-auto font-semibold text-2xl	cursor-pointer ">
						No posts to show, yet. Create one{' '}
						<span
							onClick={() => navigate('/create')}
							className="text-cyan-400">
							here
						</span>
						.
					</h2>
				</div>
			)}
			<div className=" mt-10 px-5 flex justify-center items-center">
				<div className="flex flex-wrap w-4/5 justify-center">
					{blog &&
						blog.map((blog) => (
							<Usersolo
								key={blog._id}
								blog={blog}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default UserPage;
