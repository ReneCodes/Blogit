import 'react-quill/dist/quill.snow.css';
import React, {useState, FormEvent} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {updateBlog} from '../utils/BlogUtils';
import CreateChangeBlog from '../Components/ChangeCreateBlog';

const Edit: React.FC = () => {
	type BlogParams = {
		id: string | undefined;
	};

	const {id} = useParams<BlogParams>();
	const [redirect, setRedirect] = useState(false);
	const [coverImage, setFile] = useState<File>({} as File);

	function changeBlog(e: FormEvent, title: string, content: string, category: string) {
		e.preventDefault();
		const newBlog = {title, content, category};
		updateBlog(coverImage, newBlog, id, setRedirect);
	}

	if (redirect) {
		return <Navigate to={'/blog/' + id} />;
	}

	return (
		<div className="flex flex-col align-middle p-10 ">
			{coverImage.name && (
				<img
					src={URL.createObjectURL(coverImage)}
					className="mx-auto h-64 w-[600px] object-cover rounded-md mb-5"
					alt="Blogpost cover image"
				/>
			)}
			<CreateChangeBlog
				callback={changeBlog}
				id={id}
				setFile={setFile}
			/>
		</div>
	);
};
export default Edit;
