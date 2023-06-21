
import {Link} from 'react-router-dom';
import {FC} from 'react';
import moment from 'moment';
import {BlogInterface} from '../@types/model';

interface Props {
	key: string;
	blog: BlogInterface;
}

const Usersolo: FC<Props> = (props) => {
	const folder = process.env.REACT_APP_IMAGE_URL;
	const {title, _id, content, image, createdAt, author, category} = props.blog;

	const capitalize = (name: string) => {
		return name?.toUpperCase();
	};

	return (
		<article className="w-96 mb-10 mx-6">
			<div>
				<img
					src={folder + '/' + image}
					className="w-full h-64 object-cover rounded-md"
					alt="profilepic"
				/>
			</div>
			<div className="p-4">
				<div className="flex flex-col items-center">
					<ul>
						<li className="mr-2.5 text-xs cursor-pointer">
							<Link to={`/?cat=${category}`}>{category}</Link>
						</li>
					</ul>
					<span className="blogTitle">
						<Link to={`/blog/${_id}`}>{title}</Link>
					</span>
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
					className="blogDesc"
					dangerouslySetInnerHTML={{__html: content}}
				/>
			</div>
		</article>
	);
};

export default Usersolo;
