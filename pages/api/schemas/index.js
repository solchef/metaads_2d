import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Minted {
    name: String
    description: String
    image: String
  }

  type Query {
    getAllMinted: [Minted]
  }
`
// getUser(name: String!): User!
