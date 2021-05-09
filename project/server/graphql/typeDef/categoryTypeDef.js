import gql from "graphql-tag";

const categoryTypeDef = gql`
  type Category {
    categoryId: ID!
    name: String!
    subCategory: [SubCategory]
  }
  input CategoryData {
    name: String!
    categoryId: Int!
  }
  type CategoryResponse {
    category: Category
    errors: String
  }
  type Mutation {
    addCategory(name: String!): CategoryResponse
    deleteCategory(categoryId: Int!): CategoryResponse
    updateCategory(categoryId: Int!, newName: String!): CategoryResponse
  }
  type Query {
    getCategoryById(categoryId: Int!): CategoryResponse
    getCategoryByName(name: String!): CategoryResponse
    getAllCategories: [Category]
  }
`;
export default categoryTypeDef;
