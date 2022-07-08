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
    //       `https://api.github.com/users/${args.name}`
    //     )
    //     return {
    //       id: user.data.id,
    //       login: user.data.login,
    //       avatar_url: user.data.avatar_url,
    //     }
    //   } catch (error) {
    //     throw error
    //   }
    // },
  },
}
