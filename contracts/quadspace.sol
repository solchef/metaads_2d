// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721Pausable.sol";

contract ROSECLUBNFT is ERC721Enumerable, Ownable, ERC721Burnable, ERC721Pausable {

    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;

    bool public SALE_OPEN = true;

    uint256 private constant PRICE = 1 * 10**15; // 0.001ETH Per quad
    uint256 private constant PRICE_PRESALE = 1 * 10**16; // 0.01ETH Per quad
    uint256 private constant PRICE_PREMINT = 1 * 10**16; // Free Per quad

    uint256 private constant MAX_ROSE_NFTS = 20000; // 20000 quads for Entire ROSECLUBNFT.
    uint256 private constant MAX_ROSE_NFTS_PRESALE = 20000; //  ROSECLUBNFT for Pre Sale.
    uint256 private constant MAX_ROSE_NFTS_PREMINT = 20000; //  ROSECLUBNFT for GiveAway.

    uint256 private constant MAX_MINT = 20000; // Upper Limit per Mint is 20
    uint256 private constant MAX_MINT_PRESALE = 20000; // Upper Limit per Mint 
    uint256 private constant MAX_MINT_PREMINT = 20000; // Upper Limit per Mint 

    uint256 private _price;
    uint256 private _maxROSECLUBNFTs;
    uint256 private _maxMint;

    mapping(uint256 => bool) private _isOccupiedId;
    uint256[] private _occupiedList;

    mapping(address => bool) public _whitelist;
    bool private _isPresale;

    string private baseTokenURI;

    event ROSECLUBNFT(address to, uint256 indexed id);

    modifier saleIsOpen {
        if (_msgSender() != owner()) {
            require(SALE_OPEN == true, "SALES: Please wait a big longer before buying ROSECLUBNFT ;)");
        }
        require(_totalSupply() <= MAX_ROSE_NFTS, "SALES: Sale end");

        if (_msgSender() != owner()) {
            require(!paused(), "PAUSABLE: Paused");
        }
        _;
    }

    constructor (string memory baseURI) ERC721("ROSECLUBNFT", "ROSECLUBNFT") {
        setBaseURI(baseURI);
        _price = PRICE_PREMINT;
        _maxROSECLUBNFTs = MAX_ROSE_NFTS_PREMINT;
        _maxMint = MAX_MINT_PREMINT;
    }

    function mint(address payable _to, uint256[] memory _ids) public payable saleIsOpen {
        uint256 total = _totalSupply();

   

        require(total + _ids.length <= _maxROSECLUBNFTs, "MINT: Current count exceeds maximum element count.");
        require(total <= _maxROSECLUBNFTs, "MINT: Please go to the Opensea to buy a quad.");
        require(_ids.length <= _maxMint, "MINT: Current count exceeds maximum mint count.");
                            
        if (_to != owner()) {
            require(msg.value >= price(_ids.length), "MINT: Current value is below the sales price of a quad");
        }

        for (uint256 i = 0; i < _ids.length; i++) {
            require(_isOccupiedId[_ids[i]] == false, "MINT: Those ids already have been used for other customers");
        }

        for (uint256 i = 0; i < _ids.length; i++) {
            _mintAnElement(_to, _ids[i]);
        }

        _widthdraw(owner(), address(this).balance);
    }

    function _mintAnElement(address payable _to, uint256 _id) private {
        _tokenIdTracker.increment();
        _safeMint(_to, _id);
        _isOccupiedId[_id] = true;
        _occupiedList.push(_id);

        emit ROSECLUBNFT(_to, _id);
    }

    function startPreSale() public onlyOwner {
        _isPresale = true;

        SALE_OPEN = true;

        _price = PRICE_PRESALE;
        _maxROSECLUBNFTs = MAX_ROSE_NFTS_PRESALE + MAX_ROSE_NFTS_PREMINT;
        _maxMint = MAX_MINT_PRESALE;
    }

    function startPublicSale() public onlyOwner {
        _isPresale = false;

        SALE_OPEN = true;

        _price = PRICE;
        _maxROSECLUBNFTs = MAX_ROSE_NFTS;
        _maxMint = MAX_MINT;
    }

    function flipSaleState() public onlyOwner {
        SALE_OPEN = !SALE_OPEN;
    }

    function addToWhitelist(address attender) public onlyOwner {
        _whitelist[attender] = true;
    }

    function removeFromWhitelist(address attender) public onlyOwner {
        _whitelist[attender] = false;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        baseTokenURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function price(uint256 _count) public view returns (uint256) {
        return _price.mul(_count);
    }

    function _totalSupply() internal view returns (uint) {
        return _tokenIdTracker.current();
    }

    function occupiedList() public view returns (uint256[] memory) {
        return _occupiedList;
    }

    function maxMint() public view returns (uint256) {
        return _maxMint;
    }

    function maxSales() public view returns (uint256) {
        return _maxROSECLUBNFTs;
    }

    function maxSupply() public pure returns (uint256) {
        return MAX_ROSE_NFTS;
    }

    function raised() public view returns (uint256) {
        return address(this).balance;
    }

    function getTokenIdsOfWallet(address _owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function withdrawAll() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "WITHDRAW: No balance in contract");

        _widthdraw(owner(), address(this).balance);
    }

    function _widthdraw(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        require(success, "WITHDRAW: Transfer failed.");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}