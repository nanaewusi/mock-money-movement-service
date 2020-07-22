export interface User {
  id: string;
  firstName: string;
  lastName: string;
  tag: string;
  avatar: string;
}

const SAMPLE_USERS = {
  '123': {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    tag: 'johndoe_1',
    avatar: 'http://en.gravatar.com/matt#photo-1'
  },
  '456': {
    id: '456',
    firstName: 'Chipper',
    lastName: 'Base',
    tag: 'chipper_base',
    avatar: 'http://en.gravatar.com/chipper#latest'
  }
}

// Implementation doesn't matter
export default {
  async getUser(id: string): Promise<User> {
    // assume this function makes calls to the database and returns an object
    return new Promise((resolve, reject) => {
      // here we use the timer to simulate a network call
      // to fetch the user from the database
      setTimeout(() => {
        return resolve(SAMPLE_USERS[id]) 
      }, 2000)
    })
  }
}