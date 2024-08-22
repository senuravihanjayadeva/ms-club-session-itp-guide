import {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from './handler';

const userRouter = async (fastify) => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      description: 'Create new user',
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', nullable: false },
          email: { type: 'string', nullable: false },
        },
      },
    },
    handler: createUserHandler,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      description: 'Get user by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number', nullable: false },
        },
      },
    },
    handler: getUserHandler,
  });

  fastify.route({
    method: 'PUT',
    url: '/',
    schema: {
      description: 'Update user',
      body: {
        type: 'object',
        required: ['name', 'email', 'id'],
        properties: {
          id: { type: 'number', nullable: false },
          name: { type: 'string', nullable: false },
          email: { type: 'string', nullable: false },
        },
      },
    },
    handler: updateUserHandler,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      description: 'Get user by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number', nullable: false },
        },
      },
    },
    handler: deleteUserHandler,
  });
};

export default userRouter;
