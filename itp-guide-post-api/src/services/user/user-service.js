export const createUser = async (prisma, data) => {
  return await prisma.user.create({
    data,
  });
};

export const getUser = async (prisma, id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateUser = async (prisma, id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (prisma, id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
