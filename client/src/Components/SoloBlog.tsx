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
	const path = location.pathname.split('/')[2];
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
		<div className="m-10">
			<div>
				<img
					src={folder + (blog.image ? blog.image : '')}
					className="w-full h-96 object-cover rounded-md"
					alt="profilepic"
				/>
				<h1 className="text-3xl text-center">
					{blog.title}
					{auth && blog && blog.author && auth?.username === blog.author?.username && (
						<div className="float-right text-base">
							<Link to={`/edit/${blog._id}`}>
								<FontAwesomeIcon
									icon={faUserPen}
									className="cursor-pointer  ml-3"
								/>
							</Link>
							<FontAwesomeIcon
								icon={faTrashCan}
								className="cursor-pointer ml-3"
								onClick={handleDelete}
							/>
						</div>
					)}
				</h1>
				<div className="mt-5 mb-4 flex justify-between">
					<span>Authored by:{capitalize(blog.author?.username)}</span>
					<span>{moment(blog.createdAt).fromNow()}</span>
				</div>

				<div
					className="first-letter:ml-5 first-letter:text-3xl first-letter:text-blue-600 first-letter:pr-0"
					dangerouslySetInnerHTML={{__html: blog.content}}
				/>
			</div>
		</div>
	);
};

export default SoloBlog;
