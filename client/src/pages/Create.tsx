import 'react-quill/dist/quill.snow.css';
import {useState, FC, FormEvent} from 'react';
import {Navigate, useNavigate, NavigateFunction} from 'react-router-dom';
import {createBlog} from '../utils/BlogUtils';
import CreateChangeBlog from '../Components/ChangeCreateBlog';

const Create: FC = () => {
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate: NavigateFunction = useNavigate();
	const [coverImage, setCoverImage] = useState<File>({} as File);
  
	const handleSubmit = (e: FormEvent, title: string, content: string, category: string) => {
		e.preventDefault();
		const newBlog = {title, content, category};
		createBlog(newBlog, coverImage, setRedirect, navigate);
	};

	if (redirect) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className="flex flex-col align-middle p-10 ">
			{coverImage.name && (
				<img
					src={URL.createObjectURL(coverImage)}
					className=" mx-auto h-64 w-[600px] object-cover rounded-md mb-5"
					alt="Blogpost cover image"

				/>
			)}
			<CreateChangeBlog
				callback={handleSubmit}
				setFile={setCoverImage}
			/>
		</div>
	);
};

export default Create;
