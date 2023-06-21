import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { AuthType } from '../@types/auth';
import { BlogInterface } from '../@types/model';

export const getUserBlogs = async (
	auth: null | AuthType,
	setBlog: React.Dispatch<React.SetStateAction<BlogInterface[]>>,
	navigate: NavigateFunction
) => {
	try {
		const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/blog?user=${auth?.username}`)
		setBlog(data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			navigate('/server_down');
			return error.message;
		} else {
			navigate('/server_down');
			return 'An unexpected error occurred';
		}
	}
};

export const searchBlog = async (
	search: string,
	setBlog: React.Dispatch<React.SetStateAction<BlogInterface[]>>,
	navigate: NavigateFunction
) => {
	try {
		const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/blog` + search)
		setBlog(data);

	} catch (error) {
		if (axios.isAxiosError(error)) {
			navigate('/server_down');
			return error.message;
		} else {
			navigate('/server_down');
			return 'An unexpected error occurred';
		}
	}
};

export const getBlog = async (
	setBlog: React.Dispatch<React.SetStateAction<BlogInterface[]>>,
	navigate: NavigateFunction
) => {
	try {
		const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/blog`);
		setBlog(data.slice(3, -1));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			navigate('/server_down');
			return error.message;
		} else {
			navigate('/server_down');
			return 'An unexpected error occurred';
		}
	}
};

export const deleteBlog = async (blog: BlogInterface, navigate: NavigateFunction) => {
	try {
		await axios
			.delete(`${process.env.REACT_APP_SERVER}/blog/${blog._id}`, {
				headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
				data: {},
			})
			.then(() => {
				navigate('/');
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			navigate('/server_down');
			return error.message;
		} else {
			navigate('/server_down');
			return 'An unexpected error occurred';
		}
	}
};

export const getUserBlog = async (
	path: string,
	setBlog: React.Dispatch<React.SetStateAction<BlogInterface>>,
	navigate: NavigateFunction
) => {
	try {
		const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/blog/${path}`);
		Array.isArray(data) ? setBlog(data[0]) : setBlog(data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			navigate('/server_down');
			return error.message;
		} else {
			navigate('/server_down');
			return 'An unexpected error occurred';
		}
	}
};

type NewBlogType = {
	title: string;
	content: string;
	category: string;
	image?: string;
};

export const createBlog = async (
	newBlog: NewBlogType,
	file: File,
	setRedirect: React.Dispatch<React.SetStateAction<boolean>>,
	navigate: NavigateFunction
) => {
	const data = new FormData();
	const filename = Date.now() + file.name;
	data.append('name', filename);
	data.append('file', file);
	newBlog.image = filename;
	try {
		// upload and store image first
		await axios.post(`${process.env.REACT_APP_SERVER}/upload`, data).then(async () => {
			// then create new blog post

			await axios
				.post(`${process.env.REACT_APP_SERVER}/create`, newBlog, {
					headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token'), withCredentials: true },
				})
				.then(() => setRedirect(true));
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			navigate('/server_down');
			return error.message;
		} else {
			navigate('/server_down');
			return 'An unexpected error occurred';

		}
	}
};


export const updateBlog = async (
	file: File,
	newBlog: NewBlogType,
	id: string | undefined,
	setRedirect: React.Dispatch<React.SetStateAction<boolean>>
) => {
	// update cover image if needed
	if (file.name) {
		const formData = new FormData();
		const filename = Date.now() + file.name;
		formData.append('name', filename);
		formData.append('file', file);
		newBlog.image = filename;

		try {
			await axios.post(`${process.env.REACT_APP_SERVER}/upload`, formData);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return error.message;
			} else {
				return 'An unexpected error occurred';
			}
		}
	}
	// update blog posts
	try {
		axios
			.put(`${process.env.REACT_APP_SERVER}/edit/${id}`, newBlog, {
				headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token'), withCredentials: true },
			})
			.then(() => {
				setRedirect(true);
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.message;
		} else {
			return 'An unexpected error occurred';
		}
	}
};

export const getSpecificBlog = async (
	setTitle: React.Dispatch<React.SetStateAction<string>>,
	setContent: React.Dispatch<React.SetStateAction<string>>,
	setCategory: React.Dispatch<React.SetStateAction<string>>,
	id: string
) => {
	try {
		await axios.get(`${process.env.REACT_APP_SERVER}/blog/${id}`).then(({ data }) => {
			setTitle(data.title);
			setContent(data.content);
			setCategory(data.category);
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.message;
		} else {
			return 'An unexpected error occurred';
		}
	}
};
