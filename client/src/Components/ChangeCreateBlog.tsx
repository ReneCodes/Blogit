
import React, {useEffect, useState, FormEvent, FC, ChangeEvent} from 'react';

import ReactQuill from 'react-quill';
import {getSpecificBlog} from '../utils/BlogUtils';

interface Props {
	callback: (e: FormEvent, title: string, content: string, category: string) => void;
	id?: string;
	setFile: React.Dispatch<React.SetStateAction<File>>;

}

const CreateChangeBlog: FC<Props> = ({callback, id, setFile}) => {
	const [category, setCategory] = useState<string>('music');
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');

	const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCategory(e.target.value);
	};

	useEffect(() => {
		if (id) {
			getSpecificBlog(setTitle, setContent, setCategory, id);
		}
	}, []);


	const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		const getFiles = e.target.files;
		if (getFiles?.length) {
			setFile(getFiles[0]);
		}
	};

	const CategoryOptions = () => {
		const options = ['Art', 'Science', 'Technology', 'Music', 'Sports', 'Travel', 'Food'];

		return (
			<div className="flex flex-wrap w-full gap-2 my-2">
				{options.map((item) => {
					return (
						<div
							key={item}
							className="flex align-middle justify-center rounded-lg border my-1 px-1">
							<input
								required
								id={item}
								className="accent-sky-600 peer"
								type="radio"
								name="category"
								value={item}
								checked={category === item}
								onChange={onOptionChange}
							/>
							<label
								htmlFor={item}
								className="px-1  peer-checked:text-sky-600">
								{item}
							</label>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<form
			className="relative flex flex-col w-[600px] h-fit m-auto justify-center align-middle"
			onSubmit={(e) => callback(e, title, content, category)}>
			<div className="flex flex-col my-5">
				<div className="flex justify-between">
					<label
						className="w-1/2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
						htmlFor="file_input">
						Upload Image
						<input
							className="inline my-2 w-full text-sm text-slate-500
						  file:mr-4 file:py-2 file:px-4
						  file:rounded-lg file:border-0
					  	file:text-sm file:font-semibold
					  	file:bg-sky-50 file:text-sky-600
					  	hover:file:bg-sky-100"
							id="file_input"
							type="file"
							onChange={(e) => handleFileInput(e)}
						/>
					</label>
					<button
						className="w-20 h-10 bg-lime-600 rounded-lg  text-white text-sm border-none hover:bg-lime-700 hover:scale-[1.01] duration-500 active:hover:bg-lime-800 active:scale-[0.98]"
						type="submit">
						publish
					</button>
				</div>
				<label className="my-2 font-medium flex flex-col">
					Title
					<input
						required
						type="title"
						placeholder={'Title'}
						autoFocus={true}
						className="py-5 px-2.5 my-2 h-5 border-b-2 border-b-gray-200 outline-none focus:border-b-gray-500"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</label>
				<div className="w-full flex flex-wrap flex-col">
					<div className="my-2 font-medium w-full">
						Category
						<CategoryOptions />
					</div>
				</div>
				<ReactQuill
					placeholder="Create your blog.."
					className=" w-full h-60 outline-none focus-within:text-sky-600"
					value={content}
					onChange={(newValue) => setContent(newValue)}
				/>
			</div>
		</form>
	);
};

export default CreateChangeBlog;
