import Blog from './Blog';

const Blogs = () => {
  const blog = [
    {
      id: 1,
      image:
        'https://img.freepik.com/premium-photo/backpack-asian-man-mountain-see-view-panorama-beautiful-nature-landscape-sea-adventure-vacation-travel-leisure-asia-mu-ko-ang-thong-island-national-park-background-thailand_536080-1002.jpg?w=2000',
      title: 'heyther j',
      username: 'jim',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet fuga, velit reiciendis rerum doloribus assumenda minima sequi nulla tempore ipsa sed. Molestias ipsum ex est odit fugiat pariatur voluptatum vero',
      timestamp: '1 day ago',
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpXJgMqYuZePpmPa01yUUsHXqpMs36Zrd12S4PLiW4RxOIK91DgE7sO5ZMMPrljAkZaN8&usqp=CAU',
      title: 'jamessadas',
      username: 'jimfreiend',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet fuga, velit reiciendis rerum doloribus assumenda minima sequi nulla tempore ipsa sed. Molestias ipsum ex est odit fugiat pariatur voluptatum vero',
      timestamp: '2 day ago',
    },
  ];
  return (
    <div style={{ flex: 9 }}>
      <div className="flex flex-wrap m-5">{blog && blog.map((blog) => <Blog key={blog.id} blog={blog} />)}</div>
    </div>
  );
};

export default Blogs;
