import { User } from './user.models';

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

export const generateUserId = async (): Promise<string> => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0'); // 00000
  // console.log(currentId)

  // logger.info( currentId)
  // increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};
