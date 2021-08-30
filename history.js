const fs = require('fs');
const Web3 = require('web3');

const providerURL = `https://rpc.gaiaxtestnet.oceanprotocol.com` // or use your local node 'http://localhost:7545'
const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

const firstHackathonBlock = 1623079; // corresponds to 30/09/21, 12:00 AM UTC

/**
 * Uses a setTimeout and Promise to simulate a sleep (inaccurate).
 * @param {number} milliseconds Time to sleep.
 * @returns {Promise} A promise that is resolved by a timeout.
 */
function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}


/**
 * Returns the block that corresponds to the given hash or block number.
 * @param {(string|number)} blockHashOrBlockNumber An identifier for the block.
 * @returns {object|string} The found block or an empty string. 
 */
async function getBlockByBlockHashOrBlockNumber(blockHashOrBlockNumber) {
	const block = await web3.eth.getBlock(blockHashOrBlockNumber);

	return block;
}

/**
 * Retrieves the DLT history block by block from the starting block until the latest block
 * that was retrieved when the function was called.
 * @returns {} 
 */
async function getBlockHistory() {
	const data = {
		blocks: []
	};

	const {number: latestBlockNumber} = await getBlockByBlockHashOrBlockNumber('latest');
	console.log(`📥 Downloading ${latestBlockNumber - firstHackathonBlock} blocks (${firstHackathonBlock}/${latestBlockNumber})`);

	for (let currentBlockNumber = firstHackathonBlock; currentBlockNumber < latestBlockNumber; currentBlockNumber++) {
		await sleep(100); // can be removed if you are using your own node locally 
		const {miner, timestamp, transactions } = await getBlockByBlockHashOrBlockNumber(currentBlockNumber);
		data.blocks.push({ currentBlockNumber, miner, timestamp, transactions })
		console.log(`${currentBlockNumber}/${latestBlockNumber}: `, miner, timestamp, transactions)
	}

	fs.writeFile("./src/content/blockHistory.json", JSON.stringify(data), (err, result) => console.log);
} 

getBlockHistory();
