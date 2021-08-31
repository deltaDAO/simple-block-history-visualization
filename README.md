# Simple Block History Visualization
An easy-to-use script to create a simple JSON file with a block history. This JSON file is then used to display the results in a simple graph.

## Installation

```bash
# install dependencies
npm i

# run history script (this might take a while)
npm run get:history

# visualize results
npm run start
```

## Project Overview

This projects containts two components. A script to retrieve the block history and save it into a file. This file is then used by the web app - the second component.

### Block History

You can use a public Gaia-X node like `https://rpc.gaiaxtestnet.oceanprotocol.com` to retrieve the data. But this might take a while and you might be rate limited if you query the node too quickly. So make sure to call the sleep function in between the calls to avoid this issue.

### Data Structure

```
{
   currentBlockNumber: Number,
   node: String,
   timestamp: Date,
   transactions: Array
}
```

**currentBlockNumber**.  This is the number of the block to find it in the history. A block could also be identified through its hash. Both values (block number and hash) are unique. 

**node.** An Gaia-X account address encoded as HEX. It represents the node that created the block. 

**timestamp**. A Unix timestamp when the block was created. 

**transactions**. An array of all transaction hashes for that specific block. These hashes are unique and can be used to retrieve detailed information about a specific transaction.

### Web App

The web app is a very basic [Gatsby](https://www.gatsbyjs.com/) project utilizing [Chart.js](https://www.chartjs.org/) to visualize the retrieved block history. To modify any displayed data simply jump straight to the `src/ChartData.js` component and play around with the calculations.
