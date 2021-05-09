import gql from "graphql-tag";

const subCategoryTypeDef = gql`
  type SubCategory {
    subCategoryId: ID!
    name: String!
    categoryId: Int!
    category: Category
    products: [Product!]
  }
  input SubCategoryData {
    name: String!
    categoryId: Int!
  }
  type SubCategoryResponse {
    subCategory: SubCategory
    errors: String
  }
  type Mutation {
    addSubCategory(name: String!, nameCategory: String!): SubCategoryResponse
    deleteSubCategory(subCategoryId: Int!): SubCategoryResponse
    updateSubCategory(
      subCategoryId: Int!
      newName: String!
    ): SubCategoryResponse
  }
  type Query {
    getSubCategoryById(subCategoryId: Int!): SubCategoryResponse
    getSubCategoryByName(name: String!): SubCategoryResponse
    getAllSubCategories: [SubCategory]
  }
`;
export default subCategoryTypeDef;
