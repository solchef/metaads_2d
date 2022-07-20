export const resolvers = {
  Query: {
    getAllMinted: async () => {
      try {
        const res = await fetch('https://quadspace.io/api/graphql')
        const minted = await res.json()
        // console.log(minted)
        return minted.meta.map(({ name, description, image }) => ({
          name,
          description,
          image,
        }))
      } catch (error) {
        throw error
      }
    },

    // getSingleMinted: async (_, args) => {
    //   try {
    //     const user = await axios.get(
    //       `https://quadspace.io/api/graphql`
    //     )
    //     return {
    //      name,
    // description,
    // image,
    //     }
    //   } catch (error) {
    //     throw error
    //   }
    // },
  },
}
