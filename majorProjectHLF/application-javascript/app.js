/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'ledger';
const mspOrg1 = 'Org1MSP';

const walletPath = path.join(__dirname, 'wallet');
const userId = 'appUser';

let ccp;
let caClient;
let wallet;
let gateway;
let network;
let contract;

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main() {

	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, userId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: userId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			contract = network.getContract(chaincodeName);
			
			
			let result;
			switch(process.argv[2]) {
				case "allAssets":
					console.log('\n--> Evaluate Transaction: getAllAssets');
					result = await contract.evaluateTransaction('GetAssetsByRange', '', '');
					console.log(`*** Result: ${prettyJSONString(result.toString())}`);
					break;
					
				case "create":
					console.log(`\n--> Submit Transaction: CreateAsset, creates new asset with ID(${process.argv[3]}), color(${process.argv[4]}), size(${process.argv[5]}), owner(${process.argv[6]}), and appraisedValue(${process.argv[7]}) arguments`);
					await contract.submitTransaction('CreateAsset', process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7]);
					console.log('*** Result: committed');
					break;	
				case "read":
					console.log(`\n--> Evaluate Transaction: ReadAsset, function returns information about an asset with ID(${process.argv[3]})`);
					result = await contract.evaluateTransaction('ReadAsset', process.argv[3]);
					console.log(`*** Result: ${prettyJSONString(result.toString())}`);
					break;	
				case "delete":
					console.log(`\n--> Submit Transaction: DeleteAsset with ID(${process.argv[3]})`);
					await contract.submitTransaction('DeleteAsset', process.argv[3]);
					console.log('*** Result: committed');
					break;
				case "transfer":
					console.log(`\n--> Submit Transaction: TransferAsset, transfer asset(${process.argv[3]}) to new owner(${process.argv[4]}})`);
					await contract.submitTransaction('TransferAsset', process.argv[3], process.argv[4]);
					console.log('*** Result: committed');
					break;
				case "assetsOf":
					console.log(`\n--> Evaluate Transaction: QueryAssetsByOwner, find all assets with owner(${process.argv[3]}})`);
					result = await contract.evaluateTransaction('QueryAssetsByOwner', process.argv[3]);
					console.log(`*** Result: ${prettyJSONString(result.toString())}`);
					break;
				case "history":
					console.log(`\n--> Evaluate Transaction: GetAssetHistory, get the history of an asset(${process.argv[3]})`);
					result = await contract.evaluateTransaction('GetAssetHistory', process.argv[3]);
					console.log(`*** Result: ${prettyJSONString(result.toString())}`);
					break;
			}
			
		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

}

main();