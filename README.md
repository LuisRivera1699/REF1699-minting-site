# REF1699 Minting Site Demo

Demo for the implementation of the REF1699 Referrer Standard for NFTs Collections.
- Demo installation. 
- Generate your referrer link.
- Integrate with the minting contract.

## Overview
**Installation**

Clone this repository in your desktop

    git clone https://github.com/LuisRivera1699/REF1699-minting-site.git

Since this is a ReactJS project you have to first install the npm packages and then run the application.

    npm install
    npm start

You are done, happy coding! 

**How to generate referrer link**

There are a lot of ways to generate referrer link. Since REF1699 uses the wallet address received to send the rewards, your method just has to identify the public address of your referrers.

We propose getting it through the wallet provider integration and adding it as a query parameter to the minting site url. This is an example: `http://localhost:3000?referrer=0x4ee598db59e460774a3bf715867514441dce1144`

![Get referrer link](https://raw.githubusercontent.com/LuisRivera1699/REF1699-minting-site/main/public/refer.png)

Check out our implementation in [`src/pages/Refer/index.jsx`](https://github.com/LuisRivera1699/REF1699-minting-site/blob/main/src/pages/Refer/index.jsx).

You can make your UI communicate your users whether they are entering and minting with a referrer wallet or not.
![Referrer minting](https://raw.githubusercontent.com/LuisRivera1699/REF1699-minting-site/main/public/mint.png)

**How to integrate with Smart Contract**

Actually there is no rule for integrating REF1699 to your Smart Contract since you can decide the rewarding conditions to your referrer. In our [DemoNFT](https://github.com/LuisRivera1699/REF1699-standard) Smart Contract example we decide to reward referrers per each minted token so we just need to validate that the referrer wallet is not the `0x0` address.

    pragma solidity ^0.8.x;
    
    import "./REF1699.sol";
    
    contract MyCollection is REF1699 {
	    ...
	    function mint(uint quantity_, address referrer) external payable {
		    ... // RESTRICTIONS AND OTHER LOGIC
		    
		    // If referrer isn't 0x0 address send the referrer royalty
		    if (referrer != address(0)) {
			    _sendReferrerRoyalty(referrer);
			}
			_safeMint(msg.sender, _quantity);
			
		    ... // OTHER LOGIC
	    }
	    ...
    }
Check out our integration with this rewarding logic in [`src/pages/Refer/index.jsx:90`](https://github.com/LuisRivera1699/REF1699-minting-site/blob/42826113a0f7be600394ed9061ce0374750d46bb/src/pages/Mint/index.jsx#L90).

**Demo URL**

If you want to see our proposed flow, take a look at our example Demo is hosted in: [`REF1699 Minting Site Example`](https://ref-1699-minting-site.vercel.app/).

## Buy me a coffee ??????
**ETH & Polygon Address** : 
0x8306865FAb8dEC66a1d9927d9ffC4298500cF7Ed

**Binance BNB Wallet** : 
0x35b2f646c86d4454c9fb9bc359bbe564c9c81150
## Contact me
**Email**: luisriveradiaz1699@gmail.com
