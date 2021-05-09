import gql from "graphql-tag";

const cartTypeDef = gql`
  enum Validate {
    VALID
    NOTVALID
  }
  type Cart {
    cartId: ID!
    quantity: Int!
    validate: Validate!
    productId: Int!
    userId: Int!
    product: Product
  }
  input CartData {
    quantity: Int!
    isValid: Validate!
    productId: Int!
    userId: Int!
  }
  type CartResponse {
    cart: Cart
    errors: String
  }

  type Mutation {
    addToCart(userId: Int!, productId: Int!, quantity: Int!): CartResponse
    removeProductFromCart(userId: Int!, productId: Int!): CartResponse
    updateProductQuantityfromCart(
      userId: Int!
      productId: Int!
      quantity: Int!
    ): CartResponse
    removeCart(userId: Int!): [Cart]
  }
  type Query {
    findUserCart(userId: Int!): [Cart]
  }
`;
export default cartTypeDef;
