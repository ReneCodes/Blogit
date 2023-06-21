
import {Link, useNavigate, NavigateFunction} from 'react-router-dom';
import {useEffect, useState, FC} from 'react';
import SidebarContent from './SidebarContent';
import {getBlog} from '../utils/BlogUtils';
import {BlogInterface} from '../@types/model';

const Sidebar = () => {
	const navigate: NavigateFunction = useNavigate();
	const [blog, setBlog] = useState<BlogInterface[]>([]);

	useEffect(() => {
		getBlog(setBlog, navigate);
	}, []);

	const options = ['All', 'Music', 'Travel', 'Technology', 'Science', 'Art', 'Sports', 'Food'];
	const allItems = options.map((item) => {
		return (
			<li
				className="cursor-pointer py-1 px-2 rounded-md bg-white hover:text-sky-600"
				key={item}>
				<Link
					className=""
					to={`/?cat=${item}`}>
					{item}
				</Link>
			</li>
		);
	});

	return (
		<div
			style={{flex: 3}}
			className="mt-5 pb-8 bg-gray-100 flex rounded-lg flex-col items-center h-full">
			<div className="sidebarItem">
				<span className="my-5 w-full text-center  font-semibold ">CATEGORIES</span>
				<ul className="flex gap-2 flex-wrap my-5 justify-center">{allItems}</ul>
			</div>
			<span className="w-full px-4 mt-5 text-center leading-5 font-semibold">TOP PICKS</span>
			<div className="flex flex-wrap justify-center ">
				<ul>
					{blog &&
						blog.map((blog) => (
							<SidebarContent
								key={blog._id}
								blog={blog}
							/>
						))}
				</ul>
			</div>
		</div>
	);

};

export default Sidebar;
