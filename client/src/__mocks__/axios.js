const mockData = [
  {
    _id: "649067f9d89a4897a9c9d81b",
    title: "Test",
    content: "<p>123</p>",
    image: "1687185401491multiworld.jpg",
    category: "music",
    author: {
      _id: "649067f0d89a4897a9c9d80f",
      username: "Test",
      email: "123@gmail.com",
      createdAt: "2023-06-19T14:36:32.747Z",
      updatedAt: "2023-06-19T14:36:32.747Z",
      __v: 0
    },
    createdAt: "2023-06-19T14:36:41.523Z",
    updatedAt: "2023-06-19T14:36:41.523Z",
    __v: 0
  }
];

export default {
  get: (path) => ({
    data: mockData
  }),

  post: (info) =>{
    console.log(info);
  },

};