import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/info',
  cache: new InMemoryCache(),
})

export default client
