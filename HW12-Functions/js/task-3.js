const listOfPosts = ([
  {
    id: 1,
    post: 'some post1',
    title: 'title 1',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
    ],
  },
  {
    id: 2,
    post: 'some post2',
    title: 'title 2',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
      {
        id: 1.3,
        comment: 'some comment3',
        title: 'title 3',
        author: 'Rimus',
      },
    ],
  },
  {
    id: 3,
    post: 'some post3',
    title: 'title 3',
    author: 'Rimus',
  },
  {
    id: 4,
    post: 'some post4',
    title: 'title 4',
    author: 'Uncle',
  },
]);

function getQuntityPostsByAuthor(listOfPosts, authorName) {
  let postQuantity = 0;
  let commentQuantity = 0;

  function makeCount() {
    let counter = 0;
    return function () {
      (listOfPosts[counter].author === authorName) ? ++postQuantity : postQuantity;

      if (listOfPosts[counter].comments) {
        for (let j = 0; j < listOfPosts[counter].comments.length; j++) {
          ((listOfPosts[counter].comments[j].author === authorName)) ? ++commentQuantity : commentQuantity;
        }
      }
      return counter++;
    };
  }

  const postCounter = makeCount();

  for (let i = 0; i < listOfPosts.length; i++) {
    postCounter();
  }

  return `post: ${postQuantity}; comment: ${commentQuantity}`;
}

getQuntityPostsByAuthor(listOfPosts, 'Rimus');
getQuntityPostsByAuthor(listOfPosts, 'Ivanov');
getQuntityPostsByAuthor(listOfPosts, 'Uncle');
