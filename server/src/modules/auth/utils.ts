import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPass: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(rawPass, salt);

  return hashedPassword;
}

export async function checkPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
