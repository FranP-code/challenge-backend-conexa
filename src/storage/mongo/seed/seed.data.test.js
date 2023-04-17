import { emailRegex } from '../common/constants';
import seedData from './seed.data';

describe('expected workflow for seed.data', () => {
  test('data generated properties checking', () => {
    const generatedData = seedData(100);
    generatedData.forEach((data) => {
      expect(data).toEqual(
        expect.objectContaining({
          email: expect.any(String),
          name: expect.any(String),
          password: expect.any(String)
        })
      );
    });
  });
  test("email generated format it's correct", () => {
    const generatedData = seedData(100);
    generatedData.forEach((obj) => {
      expect(obj.email).toMatch(emailRegex);
      const atSignIndex = obj.email.indexOf('@');
      const nameInEmail = obj.email.substring(0, atSignIndex);
      const serverInEmail = obj.email.substring(atSignIndex);
      const [firstName, lastName] = obj.name.split(' ');
      expect(nameInEmail).toEqual(
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
      );
      expect(serverInEmail.length).toBeGreaterThan(4);
      expect(serverInEmail).toEqual(expect.stringMatching(/^.+\.com$/));
    });
  });
  test("data generated length it's correct", () => {
    const length = 100;
    const generatedData = seedData(length);
    expect(generatedData).toHaveLength(length);
  });
});
