import gql from "graphql-tag";

const productTypeDef = gql`
  type Product {
    productId: ID!
    name: String!
    price: Int!
    description: String!
    codeProd: String!
    quantity: Int! 
    subCategoryId: Int!
    defaultImage: defaultImage
    images: [images]
    subCategory: SubCategory
    cart: [Cart]
  }
  type defaultImage {
    defaultImageId: ID!
    url: String!
  }
  type images {
    imagesId: ID!
    url: String!
  }
  input ProductData {
    name: String!
    price: Int!
    description: String!
    codeProd: String!
    quantity: Int!
    defaultImage: String!
    images: [String!]
    subCategoryId: Int!
  }
  type ProductResponse {
    product: Product
    errors: String
  }
  type Mutation {
    addProduct(
      name: String!
      price: Int!
      rating: Int!
      description: String!
      codeProd: String!
      quantity: Int!
      subCategoryName: String!
      defaultImage: String!
      images: [String!]
    ): ProductResponse
    deleteProductByID(productId: Int!): ProductResponse
    updateQuantityProduct(productId: Int!, newquantity: Int!): ProductResponse
  }
  type Query {
    getProductById(productId: Int!): ProductResponse
    getProductByCodeprod(codeProd: String!): ProductResponse
    getAllProducts: [Product]
    getRelatedProducts(productId: Int!): [Product]
  }
`;
export default productTypeDef;
