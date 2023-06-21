import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState, useContext, FC} from 'react';
import {faUserPen, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useLocation, useNavigate, Link, NavigateFunction} from 'react-router-dom';
import moment from 'moment';
import {AuthContext} from '../App';
import {deleteBlog, getUserBlog} from '../utils/BlogUtils';

import {BlogInterface} from '../@types/model';
import {AuthContextType} from '../@types/auth';

const SoloBlog: FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const location = useLocation();
	const {auth} = useContext<AuthContextType>(AuthContext);
	const path: string = location.pathname.split('/')[2];
	const [blog, setBlog] = useState<BlogInterface>({} as BlogInterface);
	const folder = `${process.env.REACT_APP_IMAGE_URL}/`;

	useEffect(() => {
		getUserBlog(path, setBlog, navigate);
	}, [path]);

	const capitalize = (name: string) => {
		return name?.toUpperCase();
	};

	const handleDelete = async () => {
		deleteBlog(blog, navigate);
	};

	return (
		<div className="flex flex-col justify-center my-10 px-5 w-4/5 mx-auto">
			<div className="flex justify-center w-4/5 mx-auto">
				<img
					src={folder + (blog.image ? blog.image : '')}
					className="h-96 w-full object-cover rounded-md"
					alt="Blogpost cover image"
				/>
			</div>
			<div className="flex justify-center align-middle w-full mx-auto relative">
				<h1 className="text-3xl text-center mt-14 w-full">{blog.title}</h1>
				{auth && blog && blog.author && auth?.username === blog.author?.username && (
					<div className="absolute right-0 flex flex-col h-full justify-between">
						<FontAwesomeIcon
							icon={faTrashCan}
							className="cursor-pointer w-5 h-5 text-red-700 hover:text-red-600 hover:scale-105 transition-all duration-300"
							onClick={handleDelete}
						/>
						<Link to={`/edit/${blog._id}`}>
							<FontAwesomeIcon
								icon={faUserPen}
								className="cursor-pointer w-6 h-6 hover:text-sky-600 transition-all duration-300 hover:scale-105"
							/>
						</Link>
					</div>
				)}
			</div>
			<div className="flex flex-col w-full my-5 mx-auto max-w-3xl">
				<div className="flex justify-between">
					<p className=" italic">Authored by: {capitalize(blog.author?.username)}</p>
					<p>{moment(blog.createdAt).fromNow()}</p>
				</div>
				<div
					className="mt-5 first-letter:text-3xl first-letter:text-blue-600 first-letter:pr-0"
					dangerouslySetInnerHTML={{__html: blog.content}}></div>

			</div>
		</div>
	);
};

export default SoloBlog;
