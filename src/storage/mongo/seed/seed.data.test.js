const { emailRegex } = require('../../../common/constants');
const { default: seedData } = require('./seed.data');

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
      const [numbers] = nameInEmail.match(/\d+$/);
      const [rest] = nameInEmail.match(/^[^\d]+/);
      expect(rest).toEqual(
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
      );
      expect(parseInt(numbers, 10)).toStrictEqual(expect.any(Number));
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
