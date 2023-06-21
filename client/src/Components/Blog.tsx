
import {FC} from 'react';
import {BlogInterface} from '../@types/model';
import {Link} from 'react-router-dom';


import moment from 'moment';

interface Props {
	blog: BlogInterface;
}

const Blog: FC<Props> = ({blog}) => {
	const folder = process.env.REACT_APP_IMAGE_URL;
	const {title, _id, content, image, createdAt, author, category} = blog;

	const capitalize = (name: string) => {
		return name?.toUpperCase();
	};

	return (
		<article className="w-full m-5 mt-0">
			<div>
				<img
					src={folder + '/' + image}
					className="w-full h-64 object-cover rounded-md"
					alt=""
				/>
			</div>
			<div className="p-4">
				<div className="flex flex-col items-center">
					<ul>
						<li className="mr-2.5 text-xs cursor-pointer">
							<Link to={`/?cat=${category}`}>{category}</Link>
						</li>
					</ul>
					<h4 className="blogTitle">
						<Link to={`/blog/${_id}`}>{title}</Link>
					</h4>
				</div>
				<div className="flex justify-between">
					<span className="blogDate flex">
						Author:
						<p className="ml-1">
							<Link to={`/?user=${author?.username}`}>{capitalize(author?.username)}</Link>
						</p>
					</span>
					<span className="blogDate">{moment(createdAt).fromNow()}</span>
				</div>
				<div
					className="blogDesc mb-2"
					dangerouslySetInnerHTML={{__html: content.slice(0, 200)}}
				/>
				<span className="text-xs text-sky-800 mt-3">
					<Link to={`/?user=${author?.username}`}>Read more from same author</Link>
				</span>
			</div>
		</article>
	);

};

export default Blog;
