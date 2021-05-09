import gql from "graphql-tag";

const userTypeDef = gql`
  enum Role {
    ADMIN
    INTERNAUTE
    CLIENT
  }
  enum Status {
    notActive
    active
    blocked
  }
  type User {
    userId: ID!
    name: String!
    email: String!
    username: String!
    password: String!
    code: Int!
    status: Status!
    roleId: Int!
    role: privilagies
    cart: [Cart]
  }
  input userData {
    name: String!
    username: String!
    email: String!
    password: String!
    roleId: Int!
    role: Role!
  }

  type privilagies {
    roleId: Int
    role: Role
  }

  type UserResponse {
    user: User
    errors: String
  }

  type Query {
    me: UserResponse
    logout: UserResponse
    getUserByEmail(email: String!): UserResponse
    getAllUsers: [User]
    getUserByID(id: Int!): UserResponse
    login(email: String!, password: String!): UserResponse
  }
  type Mutation {
    register(
      username: String!
      name: String!
      email: String!
      password: String!
      role: Role!
    ): UserResponse
    verifyMailForRegister(userId: Int!, code: Int!): UserResponse
    verifyMailForRestPassword(
      userId: Int!
      code: Int!
      password: String!
    ): UserResponse
    resetPassword(email: String!): UserResponse
    deleteUserById(userId: Int!): UserResponse
    updateUser(email: String!, newMail: String!): UserResponse
  }
`;
export default userTypeDef;
