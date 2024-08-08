import bcrypt from 'bcrypt';

/** hash password */
export const hash = (text: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(text, salt);
};

/** compare hash and raw password */
export const compare = (text: string, hash: string): Promise<boolean> =>
  bcrypt.compare(text, hash);
