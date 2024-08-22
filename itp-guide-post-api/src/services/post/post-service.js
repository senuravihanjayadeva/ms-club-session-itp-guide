export const createPost = async (prisma, data) => {
  return await prisma.post.create({
    data,
  });
};

export const getPost = async (prisma, id) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};

export const getPosts = async (prisma) => {
  return await prisma.post.findMany({
    include: {
      user: true,
    },
  });
};

export const updatePost = async (prisma, id, data) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data,
  });
};

export const deletePost = async (prisma, id) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
};
