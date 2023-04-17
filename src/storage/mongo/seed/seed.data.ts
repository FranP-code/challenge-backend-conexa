import { pickRandomValue } from '@/common/utils';

export default (length: number) => {
  const generatePassword = () =>
    Array.from(Array(10), () => Math.floor(Math.random() * 94) + 33)
      .map((x) => String.fromCharCode(x))
      .join('');
  const firstNames = ['John', 'Jane', 'Bob', 'Fran', 'Linus', 'Bill', 'Jeff'];
  const lastNames = [
    'Doe',
    'Smith',
    'Johnson',
    'Pessano',
    'Torvalds',
    'Gates',
    'Bezos'
  ];
  const emailServers = ['gmail', 'hotmail', 'yahoo'];
  return [...Array(length)].map((value, index) => {
    const firstName = pickRandomValue(firstNames);
    const lastName = pickRandomValue(lastNames);
    return {
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@${pickRandomValue(
        emailServers
      )}.com`,
      name: `${firstName} ${lastName}`,
      password: generatePassword()
    };
  });
};
