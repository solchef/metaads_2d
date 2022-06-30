import * as React from 'react'
import { useWeb3Context } from '../context'

export default function AdSpace() {
  const { contracts, address } = useWeb3Context()
  const adscontract = contracts['metaads']

  const getHashes = async () => {
    let totalSupply = await adscontract.totalSupply()
    console.log(totalSupply)

    for (var i = 1; i <= totalSupply; i++) {
      const hash = await contract.methods.hashes(i - 1).call()
      this.setState({
        hashes: [...this.state.hashes, hash],
      })
    }
  }

  const handleMint = async () => {
    // console.log(contracts)
    console.log(adscontract.address)

    let selectedSqures = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    let quantSupplies = [].fill(selectedSqures, '1')

    let nameinput = 'Usernamechoice'
    let spacecoords = 'x,y'
    let identityImage = 'imageurl'

    let mint_spaces = await adscontract.methods.mintBatch(
      address,
      selectedSqures,
      quantSupplies,
      [nameinput, spacecoords, identityImage]
    )

    console.log(mint_spaces)
  }

  React.useEffect(() => {
    getHashes()
  })

  return (
    <div className="App">
      <button className="reset-button" onClick={() => handleMint()}>
        MINT NFT
      </button>
    </div>
  )
}
