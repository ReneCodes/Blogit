import Blog from './Blog';
import {useEffect, useState, FC} from 'react';
import {useLocation, useNavigate, NavigateFunction} from 'react-router-dom';
import {searchBlog} from '../utils/BlogUtils';
import {BlogInterface} from '../@types/model';

const Blogs: FC = () => {
	let navigate: NavigateFunction = useNavigate();
	const [blogs, setBlogs] = useState<BlogInterface[]>([]);
	const {search} = useLocation();

	useEffect(() => {
		searchBlog(search, setBlogs, navigate);
	}, [search]);

	return (
		<div style={{flex: 9}}>
			{blogs.length === 0 && (
				<div className="flex flex-col m-5 p-5 align-center justify-center w-1/2">
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
			<div className="flex flex-wrap p-5">
				{blogs &&
					blogs.map((blog: BlogInterface) => (
						<Blog
							blog={blog}
							key={blog._id}
						/>
					))}
			</div>
		</div>
	);

};

export default Blogs;
