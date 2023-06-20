import 'react-quill/dist/quill.snow.css';
import {useState, FC, FormEvent} from 'react';
import {Navigate, useNavigate, NavigateFunction} from 'react-router-dom';
import {createBlog} from '../utils/BlogUtils';
import CreateChangeBlog from '../Components/ChangeCreateBlog';

const Create: FC = () => {
	const [redirect, setRedirect] = useState<boolean>(false);
	const navigate: NavigateFunction = useNavigate();
	const [file, setFile] = useState<File>();

	const handleSubmit = (e: FormEvent, title: string, content: string, category: string) => {
		e.preventDefault();
		const newBlog = {title, content, category};
		createBlog(newBlog, file, setRedirect, navigate);
	};

	if (redirect) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className="p-12 pr-16">
			{file && (
				<img
					src={URL.createObjectURL(file)}
					className="ml-36 h-64 w-[70vw] object-cover rounded-md mb-5"
					alt="profilepic"
				/>
			)}
			<CreateChangeBlog
				callback={handleSubmit}
				setFile={setFile}
			/>
		</div>
	);
};

export default Create;
