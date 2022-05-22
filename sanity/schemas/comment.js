export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'post',
      title: 'Post',
      description: 'Reference the post the tweet is associated to',
      type: 'reference',
      to: {
        type: 'post',
      },
    },
  ],
}
