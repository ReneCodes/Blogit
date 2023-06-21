
import {FC} from 'react';
import {Link} from 'react-router-dom';
import {BlogInterface} from '../@types/model';

interface Props {
	key: string;
	blog: BlogInterface;
}

const SidebarContent: FC<Props> = (props) => {
	const {title, _id, content, image} = props.blog;
	const folder = process.env.REACT_APP_IMAGE_URL;

	function extractBlogBlurb() {
		const contentArray = content
			.replace(/<[^>]+>/gi, '|')
			.split('|')
			.filter((item) => item.length > 0);

		return contentArray[0].slice(0, 99);
	}

	// console.log(content);
	return (
		<>
			<div className="sidebarItem my-5 ">
				<Link to={`/blog/${_id}`}>
					<img
						src={folder + '/' + image}
						className="w-full h-44 object-cover rounded-md"
						alt="profilepic"
					/>
				</Link>
				<div className="w-full p-2 text-center bg-white rounded-b-md ">
					<p className="text-sm items-center font-bold">
						<Link to={`/blog/${_id}`}>{title}</Link>
					</p>

					<div className="line-clamp-4 w-full my-2 text-xs">
						<p>{extractBlogBlurb()}</p>
					</div>
				</div>
			</div>
		</>
	);

};

export default SidebarContent;
