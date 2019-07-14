Page({
  data: {
    message: 'Hello world!',
    name: '吴钦飞',
    flag: true,
    items: [
      { id: 1, name: '哇哈哈' },
      { id: 2, name: '酸酸奶' },
      { id: 3, name: '优酸乳' },
    ],
    condition: Math.floor(Math.random() * 3 + 1),
    fontSize: '20px',
  },
});
