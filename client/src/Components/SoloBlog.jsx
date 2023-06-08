import gpic from '../images/gpic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
const SoloBlog = () => {
  return (
    <div className="m-10">
      <div>
        <img src={gpic} className="w-full h-96 object-cover rounded-md" alt="profilepic" />
        <h1 className="text-3xl text-center">
          Lorem ipsum dolor sit amet consectetur
          <div className="float-right text-base">
            <FontAwesomeIcon icon={faUserPen} className="cursor-pointer  ml-3" />
            <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer ml-3" />
          </div>
        </h1>
        <div className="mt-5 mb-4 flex justify-between">
          <span>Authored by: Name</span>
          <span>1 day ago</span>
        </div>
        <p className="first-letter:ml-5 first-letter:text-3xl first-letter:text-blue-600 first-letter:pr-0">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem fugit minus repudiandae iure alias animi delectus quam optio recusandae
          excepturi sequi molestiae voluptatem quaerat dolore consequatur, doloremque tempora rerum lorem 100
        </p>
      </div>
    </div>
  );
};

export default SoloBlog;
