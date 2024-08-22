import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from '../../../services/post/post-service';
import { getUser } from '../../../services/user/user-service';

export const createPostHandler = async (request, reply) => {
  try {
    const user = await getUser(request.prisma, request.body.userId);

    if (!user) {
      request.log.error('User not found');
      return reply.status(404).send({ message: 'User not found' });
    }

    const post = await createPost(request.prisma, request.body);

    request.log.info('Post created successfully');
    return reply.status(201).send(post);
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};

export const getPostHandler = async (request, reply) => {
  try {
    const post = await getPost(request.prisma, request.params.id);

    if (!post) {
      request.log.error('Post not found');
      return reply.status(404).send({ message: 'Post not found' });
    }

    request.log.info('Post fetched successfully');
    return reply.status(200).send(post);
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};

export const getPostsHandler = async (request, reply) => {
  try {
    const posts = await getPosts(request.prisma);

    request.log.info('Posts fetched successfully');
    return reply.status(200).send(posts);
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};

export const updatePostHandler = async (request, reply) => {
  try {
    const existingPost = await getPost(request.prisma, request.body.id);

    if (!existingPost) {
      request.log.error('Post not found');
      return reply.status(404).send({ message: 'Post not found' });
    }

    const post = await updatePost(
      request.prisma,
      request.body.id,
      request.body,
    );

    if (!post) {
      request.log.error('Post not found');
      return reply.status(404).send({ message: 'Post not found' });
    }

    request.log.info('Post updated successfully');
    return reply.status(200).send(post);
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};

export const deletePostHandler = async (request, reply) => {
  try {
    const existingPost = await getPost(request.prisma, request.params.id);

    if (!existingPost) {
      request.log.error('Post not found');
      return reply.status(404).send({ message: 'Post not found' });
    }

    await deletePost(request.prisma, request.params.id);

    request.log.info('Post deleted successfully');
    return reply.status(204).send();
  } catch (error) {
    request.log.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
};
