import bcrypt from 'bcryptjs';

export async function passwordHash(password: string): Promise<string> {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
