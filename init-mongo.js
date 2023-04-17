/* eslint-disable no-undef */
db.createUser({
  pwd: 'develop_password',
  roles: [
    {
      db: 'appdb',
      role: 'readWrite'
    }
  ],
  user: 'develop_username'
});
