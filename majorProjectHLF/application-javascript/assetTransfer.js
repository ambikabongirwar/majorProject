'use strict';

const path = require('path');

const channelName = 'mychannel';
const chaincodeName = 'ledger';
const mspOrg1 = 'Org1MSP';

const walletPath = path.join(__dirname, 'wallet');
const userId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}


console.log(process.argv[2]);

if(process.argv[2] == "allAssets") {
	getAllAssets();
}

async function getAllAssets() {
	let result;
	try {
		console.log('\n--> Evaluate Transaction: getAllAssets');
			result = await contract.evaluateTransaction('GetAssetsByRange', '', '');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);
	} catch(error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

/*
async function main() {
	try {
		

		try {

			let result;

			// Let's try a query operation (function).
			// This will be sent to just one peer and the results will be shown.
			

			console.log('\n--> Evaluate Transaction: GetAssetsByRange, function use an open start and open end range to return assest1 to asset6');
			result = await contract.evaluateTransaction('GetAssetsByRange', '', '');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Evaluate Transaction: GetAssetsByRange, function use an fixed start (asset3) and open end range to return assest3 to asset6');
			result = await contract.evaluateTransaction('GetAssetsByRange', 'asset3', '');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Evaluate Transaction: GetAssetsByRange, function use an open start and fixed end (asset3) range to return assest1 to asset2');
			result = await contract.evaluateTransaction('GetAssetsByRange', '', 'asset3');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Now let's try to submit a transaction.
			// This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
			// to the orderer to be committed by each of the peer's to the channel ledger.
			console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID(asset7), color(yellow), size(5), owner(Tom), and appraisedValue(1300) arguments');
			await contract.submitTransaction('CreateAsset', 'asset7', 'yellow', '5', 'Tom', '1300');
			console.log('*** Result: committed');

			console.log('\n--> Evaluate Transaction: ReadAsset, function returns information about an asset with ID(asset7)');
			result = await contract.evaluateTransaction('ReadAsset', 'asset7');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with ID(asset7) exist');
			result = await contract.evaluateTransaction('AssetExists', 'asset7');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Now let's try to submit a transaction that deletes an asset
			// This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
			// to the orderer to be committed by each of the peer's to the channel ledger.
			console.log('\n--> Submit Transaction: DeleteAsset with ID(asset7)');
			await contract.submitTransaction('DeleteAsset', 'asset7');
			console.log('*** Result: committed');

			console.log('\n--> Evaluate Transaction: AssetExists, function returns "false" if an asset with ID(asset7) does not exist');
			result = await contract.evaluateTransaction('AssetExists', 'asset7');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Submit Transaction: TransferAsset, transfer asset(asset2) to new owner(Max)');
			await contract.submitTransaction('TransferAsset', 'asset2', 'Max');
			console.log('*** Result: committed');

			console.log('\n--> Evaluate Transaction: ReadAsset, function returns information about an asset with ID(asset2)');
			result = await contract.evaluateTransaction('ReadAsset', 'asset2');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Rich Query with Pagination (Only supported if CouchDB is used as state database)
			console.log('\n--> Evaluate Transaction: QueryAssetsWithPagination, function returns "Max" assets');
			result = await contract.evaluateTransaction('QueryAssetsWithPagination', '{"selector":{"docType":"asset","owner":"Max"}, "use_index":["_design/indexOwnerDoc", "indexOwner"]}', '1', '');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Recover the bookmark from previous query. Normally it will be inside a variable.
			const resultJson = JSON.parse(result.toString());

			console.log('\n--> Evaluate Transaction: QueryAssetsWithPagination, function returns "Max" assets next page');
			result = await contract.evaluateTransaction('QueryAssetsWithPagination', '{"selector":{"docType":"asset","owner":"Max"}, "use_index":["_design/indexOwnerDoc", "indexOwner"]}', '1', resultJson.bookmark);
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Submit Transaction: TransferAssetByColor, transfer all yellow assets to new owner(Michel)');
			await contract.submitTransaction('TransferAssetByColor', 'yellow', 'Michel');
			console.log('*** Result: committed');

			// Rich Query (Only supported if CouchDB is used as state database):
			console.log('\n--> Evaluate Transaction: QueryAssetsByOwner, find all assets with owner(Michel)');
			result = await contract.evaluateTransaction('QueryAssetsByOwner', 'Michel');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('\n--> Evaluate Transaction: GetAssetHistory, get the history of an asset(asset7)');
			result = await contract.evaluateTransaction('GetAssetHistory', 'asset7');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Rich Query (Only supported if CouchDB is used as state database):
			console.log('\n--> Evaluate Transaction: QueryAssets, assets of size 15');
			result = await contract.evaluateTransaction('QueryAssets', '{"selector":{"size":15}}');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Rich Query with index design doc and index name specified (Only supported if CouchDB is used as state database):
			console.log('\n--> Evaluate Transaction: QueryAssets, Jin Soo\'s assets');
			result = await contract.evaluateTransaction('QueryAssets', '{"selector":{"docType":"asset","owner":"Jin Soo"}, "use_index":["_design/indexOwnerDoc", "indexOwner"]}');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Range Query with Pagination
			console.log('\n--> Evaluate Transaction: GetAssetsByRangeWithPagination - get page 1 of assets from asset2 to asset6 (asset2, asset3)');
			result = await contract.evaluateTransaction('GetAssetsByRangeWithPagination', 'asset2', 'asset6', '2', '');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Range Query with Pagination
			console.log('\n--> Evaluate Transaction: GetAssetsByRangeWithPagination - get page 2 of assets from asset2 to asset6 (asset4, asset5)');
			result = await contract.evaluateTransaction('GetAssetsByRangeWithPagination', 'asset2', 'asset6', '2', 'asset4');
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			console.log('*** all tests completed');
		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

	console.log('*** application ending');

}

main();*/
