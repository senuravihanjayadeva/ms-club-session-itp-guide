import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../../../services/user/user-service';

export const createUserHandler = async (request, reply) => {
  try {
    const user = await createUser(request.prisma, request.body);
    request.log.info('User created successfully');
    return reply.status(200).send(user);
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};

export const getUserHandler = async (request, reply) => {
  try {
    const user = await getUser(request.prisma, request.params.id);

    if (!user) {
      request.log.error('User not found');
      return reply.status(404).send({ message: 'User not found' });
    }

    request.log.info('User fetched successfully');
    return reply.status(200).send(user);
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};

export const updateUserHandler = async (request, reply) => {
  try {
    const existingUser = await getUser(request.prisma, request.body.id);

    if (!existingUser) {
      request.log.error('User not found');
      return reply.status(404).send({ message: 'User not found' });
    }

    const user = await updateUser(
      request.prisma,
      request.body.id,
      request.body,
    );

    if (!user) {
      request.log.error('User not found');
      return reply.status(404).send({ message: 'User not found' });
    }

    request.log.info('User updated successfully');
    return reply.status(200).send(user);
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};

export const deleteUserHandler = async (request, reply) => {
  try {
    const existingUser = await getUser(request.prisma, request.params.id);

    if (!existingUser) {
      request.log.error('User not found');
      return reply.status(404).send({ message: 'User not found' });
    }

    await deleteUser(request.prisma, request.params.id);
    request.log.info('User deleted successfully');
    return reply.status(204).send();
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};
