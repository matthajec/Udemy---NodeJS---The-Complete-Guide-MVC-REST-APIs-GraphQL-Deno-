const posts = [];

exports.getPosts = (req, res, next) => {
  res.status(200).json(posts);
};

exports.postPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const post = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };

  posts.push(post);

  res.status(201).json({
    message: 'Post created successfully!',
    post
  });
};