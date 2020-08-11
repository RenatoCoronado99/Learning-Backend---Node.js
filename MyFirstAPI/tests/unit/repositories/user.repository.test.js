//Se crean los test para el UserRepository
const { UserRepository } = require("../../../src/repositories");
const mockingoose = require("mockingoose").default;
const { User } = require("../../../src/models");
let {
  UserModelMock: { user, users },
} = require("../../mocks");
//Crear un suit de tests
describe("User Repository Tests", () => {
  beforeEach(() => 
  {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });


  it("Should return a user by id", async () => 
  {
      const _user = { ...user };
      delete _user.password;
      mockingoose(User).toReturn(user, "findOne");
      const _userRepository = new UserRepository({ User });
      const expected = await _userRepository.get(_user._id);
      //Tenemos que comrpbar que lo que estmos esperndo corresponde
      expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should return an user by username", async ()=>
  {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOne");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getUserByUsername(user.username);
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should return all users", async ()=>
  {
    users = users.map(user =>
      {
        delete user.password;
        return user;
      });
    mockingoose(User).toReturn(users, "find");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getAll();
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
  });

  it("should update and return a specific user by id", async ()=>
  {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOneAndUpdate");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.update(_user._id, {name: "Heisenberg"});
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should delete a user and return true", async ()=>
  {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOneAndDelete");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.delete(_user._id);
    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
});


