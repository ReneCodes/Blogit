
import {FC} from 'react';
import Blogs from '../Components/Blogs';
import Main from '../Components/Main';
import Sidebar from '../Components/Sidebar';

const Home: FC = () => {
	return (
		<div>
			<Main />
			<div className="flex justify-center mx-auto max-w-4xl">
				<Sidebar />
				<Blogs />
			</div>
		</div>
	);
};

export default Home;
