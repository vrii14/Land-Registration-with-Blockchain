# Land Registration System with Blockchain

## Team Members:

	Batch: T1
	111803157  Mrunal Kotkar
	111803168  Vrinda Ahuja
    141903009  Divya Kharode
	

## Project Description:

This is an application of Land Registration System. 
Land registry in India as well as in many parts of the world is a very slow and inconvenient process. Current land registration & verification systems include an increasing number of fraud cases and loss of paperwork and court cases due to thousands of land records to maintain.  
The intuition behind building this was to make the process of land registration resilient and decreases the cases of fraud in the process. Using the system, validation of the lands is also possible as immutable transactions are being stored in the public ledger.  
So the Land Registration system using blockchain is a distributed system that will store all the transactions made during the process of land buying. This will also be helpful for buyers, sellers and government registrars to transfer the land ownership from seller to new buyer as well as it will accelerate the process of registration.  


## Tech Stack Used:

	Frontend:
	* Javascript
    * React Framework
	* CSS
    * Metamask Chrome Extension

	Backend:
	* Ethereum Blockchain (Truffle Suite)
    * Solidity
    * Ganache


## Application features:  

* **Registration Page**: Seller & Buyer can register for an account on the application. 
* **Land Inspector Dashboard**: Land Inspector works as the admin and is already registered. He can then verify the Sellers, Buyers and approve Land Transfer Process.
* **User Profile**: Seller & Buyer can view their profile via their respective Dashboards.
* **Seller Dashboard**: A Brief Description of Added Lands and features to Add a new Land and approve a Land request from a Buyer.
* **Add Land**: Seller can add a land after he/she is verified by the Land Inspector.
* **Approve Land Request**: Approve a Request by Buyer to Buy a Land.
* **Buyer Dashboard**: A Brief Description of all Lands and features to Request a Land to Land Owner of the particular Land. 
* **Owned Lands**: Details of Lands owned by the Buyer after Buying some lands.
* **View Lands**: Complete Information of Lands along with its Images and Required Documents.
* **Land Ownership Transfer**: Transfer of Land Ownership from Seller to Buyer via Land Inspector.  



## Steps to run the application:
1. Clone the github repository and cd to the folder 
2. Open _Ganache_ and keep it running in the Background.
3. Make sure you have Metamask Extension in your browser.
4. In the root directory run _truffle migrate --reset_.
5. cd to the _client_ folder and run _npm install_.
6. Run _npm start_.
