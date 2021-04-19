var Land = artifacts.require("./Land.sol");

contract("Land", function(accounts){

    var landReginstance;
    // let accounts = await web3.eth.getAccounts();

    // it("Initialize with 3 lands", function(){
    //     return Land.deployed().then(function(instance){
    //         return instance.landsCount();
    //     }).then(function(count){
    //         assert.equal(count, 3);
    //     });
    // });

    it("Initialize with 1 Land Inspector", function(){
        return Land.deployed().then(function(instance){
            return instance.inspectorsCount();
        }).then(function(count){
            assert.equal(count, 1);
        });
    });

    it("it initializes the Land Inspector with the correct values", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.InspectorMapping(1);
        }).then(function(inspector) {
            assert.equal(inspector[0],1 , "contains the correct id");
            assert.equal(inspector[1], "Inspector 1" , "contains the correct name");
            assert.equal(inspector[2], 45, "contains the correct agee");
            assert.equal(inspector[3],"Tehsil Manager", "contains the correct designation");
        })
    });

    it("allows a seller to register", function() {
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.registerSeller("Vrinda", 20, "abc", "xyz", "many", {from: accounts[5]});
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "Registration", "the event type is correct");
          return landReginstance.sellersCount();
        }).then(function(count) {
          assert.equal(count, 1, "first seller registered");
        })
      });
    
    it("allows a buyer to register", function() {
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.registerBuyer("Vrinda", 20, "akola", "maharashtra", "aadhar", "pan", {from: accounts[2]});
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "Registration", "the event type is correct");
          return landReginstance.buyersCount();
        }).then(function(count) {
          assert.equal(count, 1, "first buyer registered");
        })
    });


    it("allows to verify a seller/buyer by Land Inspector", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.verifySeller(accounts[5], {from: accounts[9]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered"); 
            assert.equal(receipt.logs[0].event, "Verified", "the event type is correct");
        })
    });
    
    it("allows to add a Land by a verified Seller", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.addLand(500,"Akola", 20000, {from: accounts[5]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 0, "Receipt"); 
            return landReginstance.landsCount();
        }).then(function(count) {
            assert.equal(count, 1, "first land added.");
          })
    });

    it("Land Ownership transfer from Seller to Buyer", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.LandOwnershipTransfer(1, accounts[2], {from: accounts[9]})
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 0, "Receipt");
            return landReginstance.LandOwner(1)
        }).then(function(newOwner) {
            assert.equal(newOwner, accounts[2], "Land Ownership successfully transfered.")
        })
    });

    // it("Cannot register from one address twice", function() {
    //     return Land.deployed().then(function(instance) {
    //         landReginstance = instance;
    //         return landReginstance.registerSeller("Vrinda", 20, "abc", "xyz", "many", {from: accounts[8]});
    //     }).then(function(receipt) {
    //         assert(receipt.receipt.status, "true", "Success");
    //         return landReginstance.sellersCount();
    //     }).then(function(count) {
    //         assert.equal(count, 2, "first seller registered");
    //         return landReginstance.registerSeller("Babita", 40, "abc", "xyz", "many", {from: accounts[8]});
    //     }).then(function(receipt) {
    //       assert(receipt.receipt.status, "0x00", "failed tx");
    //       return landReginstance.sellersCount();
    //     }).then(function(count) {
    //         assert.equal(count, 2, "second seller not registered");
    //     });
    //   });

});
