import config from '@/config';

/* eslint-disable sort-keys-fix/sort-keys-fix */
export default {
  openapi: '3.0.0',
  info: {
    title: 'Challenge Back-End Conexa',
    description: 'API Challenge.',
    version: '1.0.0'
  },
  tags: [
    {
      name: 'user',
      description: "User's operations"
    }
  ],
  servers: [
    {
      url: `http://localhost:${config.api.port}/`
    }
  ],
  paths: {
    '/get-users': {
      get: {
        tags: ['user'],
        summary: 'Get users data.',
        description: 'Retrieve users based on the specified criteria.',
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            description: 'Bearer token containing a JWT of a created user',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'email',
            in: 'query',
            description: "User's email address.",
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Maximum number of users to return per page.',
            required: false,
            schema: {
              type: 'number'
            }
          },
          {
            name: 'page',
            in: 'query',
            description: 'Page number of results to return.',
            required: false,
            schema: {
              type: 'number'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    lastPage: {
                      type: 'boolean',
                      description:
                        'Whether or not this is the last page of results.'
                    },
                    users: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            description: 'Unique ID of the user.'
                          },
                          email: {
                            type: 'string',
                            description: "User's email address."
                          },
                          name: {
                            type: 'string',
                            description: "User's name."
                          }
                        },
                        required: ['_id', 'email', 'name']
                      }
                    },
                    error: {
                      type: 'boolean',
                      description: 'Indicates whether or not an error occurred.'
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.'
                    }
                  },
                  required: ['lastPage', 'users', 'error', 'status']
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    body: {
                      type: 'object',
                      properties: {
                        error: {
                          type: 'string',
                          description: 'Error message.'
                        }
                      }
                    },
                    error: {
                      type: 'boolean'
                    },
                    status: {
                      type: 'number'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/login': {
      post: {
        tags: ['user'],
        summary: 'Logs in a user',
        requestBody: {
          description: 'User credentials for login',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string'
                  },
                  password: {
                    type: 'string'
                  },
                  name: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string'
                    },
                    name: {
                      type: 'string'
                    },
                    token: {
                      type: 'string'
                    },
                    error: {
                      type: 'boolean'
                    },
                    status: {
                      type: 'number'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    body: {
                      type: 'object',
                      properties: {
                        error: {
                          type: 'string',
                          description: 'Error message.'
                        }
                      }
                    },
                    error: {
                      type: 'boolean'
                    },
                    status: {
                      type: 'number'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/register': {
      post: {
        tags: ['user'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email'
                  },
                  name: {
                    type: 'string'
                  },
                  password: {
                    type: 'string'
                  }
                },
                required: ['email', 'name', 'password']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successfully registered a new user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string'
                    },
                    email: {
                      type: 'string'
                    },
                    name: {
                      type: 'string'
                    },
                    error: {
                      type: 'boolean'
                    },
                    status: {
                      type: 'number'
                    }
                  },
                  required: ['_id', 'email', 'name', 'error', 'status']
                }
              }
            }
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    body: {
                      type: 'object',
                      properties: {
                        error: {
                          type: 'string'
                        }
                      },
                      required: ['error']
                    },
                    error: {
                      type: 'boolean'
                    },
                    status: {
                      type: 'integer',
                      example: 400
                    }
                  },
                  required: ['body', 'error', 'status']
                }
              }
            }
          }
        }
      }
    }
  }
};
