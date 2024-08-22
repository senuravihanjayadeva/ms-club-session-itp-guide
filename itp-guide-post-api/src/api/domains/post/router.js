import {
  createPostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
  deletePostHandler,
} from './handler';

const postRouter = async (fastify) => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      description: 'Create new post',
      body: {
        type: 'object',
        required: ['title', 'body', 'userId'],
        properties: {
          title: { type: 'string', nullable: false },
          body: { type: 'string', nullable: false },
          userId: { type: 'number', nullable: false },
        },
      },
    },
    handler: createPostHandler,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      description: 'Get post by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number', nullable: false },
        },
      },
    },
    handler: getPostHandler,
  });

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      description: 'Get all posts',
    },
    handler: getPostsHandler,
  });

  fastify.route({
    method: 'PUT',
    url: '/',
    schema: {
      description: 'Update post',
      body: {
        type: 'object',
        required: ['title', 'body', 'id'],
        properties: {
          id: { type: 'number', nullable: false },
          title: { type: 'string', nullable: false },
          body: { type: 'string', nullable: false },
        },
      },
    },
    handler: updatePostHandler,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      description: 'Delete post by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number', nullable: false },
        },
      },
    },
    handler: deletePostHandler,
  });
};

export default postRouter;
