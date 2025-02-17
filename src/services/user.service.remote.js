// import { httpService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
  getEmptyUser,
  getDefaultFilter
}

window.userService = userService

async function getUsers(filterBy) {
  try {

    const users = await httpService.get(STORAGE_KEY, filterBy)
    return users
  } catch {
    console.log("failed getting users")
  }

}


async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return httpService.remove(STORAGE_KEY, userId)
}

async function update(user) {
  console.log('updated user service ', user);
  const savedUser = await httpService.put(`user/${user._id}`, user)

  // When admin updates other user's details, do not update loggedinUser
  if (getLoggedinUser()._id === user._id) saveLoggedinUser(user)
  return savedUser
}

async function login(userCred) {
  console.log('userCred Service',userCred)
  const user = await httpService.post('auth/login', userCred)
  if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
  if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  const user = await httpService.post('auth/signup', userCred)
  return saveLoggedinUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function saveLoggedinUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
  return {
    username: '',
    fullname: '',
    password: '',
    imgUrl: '',
  }
}

const mockUsers = [
  {
    fullname: "newTest",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938643/cld-sample.jpg",
    password: "fhgj",
    username: "newTest",
    _id: "mwut3",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"],
    user_messages: [
      {
        senderId: "123",
        messages: [
          {
          msgId: "234",
          msg: "test",
          dateTime: new Date().toISOString()
          }

        ]
      }
    ]
    //todo: savedFeedItems: [feedItemsIds]
  },
  {
    fullname: "DemoUser",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/8-Fun-Facts-About-Your-Dog-s-Ears_i3fnw8.png",
    password: "hv",
    username: "DemoUser",
    _id: "OWyfg",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "testUser1",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938643/samples/woman-on-a-football-field.jpg",
    password: "password1",
    username: "testuser1",
    _id: "uid001",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "testUser2",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938643/samples/upscale-face-1.jpg",
    password: "password2",
    username: "testuser2",
    _id: "uid002",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "mockUser3",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938642/samples/smile.jpg",
    password: "mock123",
    username: "mockuser3",
    _id: "uid005",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "mockUser4",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938642/samples/man-portrait.jpg",
    password: "mock456",
    username: "mockuser4",
    _id: "uid006",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "randomUser5",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938642/samples/man-on-a-street.jpg",
    password: "randompass5",
    username: "randomuser5",
    _id: "uid007",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "randomUser6",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938642/samples/man-on-a-escalator.jpg",
    password: "randompass6",
    username: "randomuser6",
    _id: "uid008",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "user7",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938642/samples/outdoor-woman.jpg",
    password: "pass7",
    username: "user7",
    _id: "uid009",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },

  {
    fullname: "user8",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938642/samples/look-up.jpg",
    password: "pass8",
    username: "user8",
    _id: "uid010",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "testUser9",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938639/samples/two-ladies.jpg",
    password: "pass9",
    username: "testuser9",
    _id: "uid011",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "user10",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938635/samples/people/bicycle.jpg",
    password: "pass10",
    username: "user10",
    _id: "uid012",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "randomUser11",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938635/samples/landscapes/beach-boat.jpg",
    password: "random11",
    username: "randomuser11",
    _id: "uid013",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "randomUser12",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938635/samples/people/boy-snow-hoodie.jpg",
    password: "random12",
    username: "randomuser12",
    _id: "uid014",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "mockUser13",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938635/samples/people/jazz.jpg",
    password: "mockpass13",
    username: "mockuser13",
    _id: "uid015",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "testUser14",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938635/samples/bike.jpg",
    password: "pass14",
    username: "testuser14",
    _id: "uid016",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "user15",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938634/samples/people/smiling-man.jpg",
    password: "pass15",
    username: "user15",
    _id: "uid017",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "mockUser16",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938634/samples/landscapes/girl-urban-view.jpg",
    password: "pass16",
    username: "mockuser16",
    _id: "uid018",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
  {
    fullname: "mockUser18",
    imgUrl: "https://res.cloudinary.com/dz9gxtvp9/image/upload/v1726938636/samples/landscapes/nature-mountains.jpg",
    password: "pass18",
    username: "mockuser18",
    _id: "uid020",
    following: ["OWyfg", "uid001", "uid002"],
    followers: ["OWyfg", "uid001", "uid002"]
  },
];

async function _createMockUsers() {
  const results = []
  for (const user of mockUsers) {
    try {
      const newUser = await userService.signup(user);
      results.push(newUser)
      continue;
    } catch (error) {
      console.error('Error creating user:', error);
      return Promise.reject(error)
    }
  }

  return Promise.resolve(results)
}


function getDefaultFilter() {
  return {
    fullname: '',
    username: ''

  }
}

