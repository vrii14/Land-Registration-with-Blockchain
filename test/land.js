var Land = artifacts.require("./Land.sol");

contract("Land", function(accounts){

    var landReginstance;
    var landInspector = accounts[0];
    var seller = accounts[1];
    var buyer = accounts[2];

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
            return landReginstance.registerSeller("Vrinda", 20, "abc", "xyz", "many", "QmYdztkcPJLmGmwLmM4nyBfVatoBMRDuUjmgBupjmTodAP", {from: seller});
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
            return landReginstance.registerBuyer("Vrinda", 20, "akola", "aadhar123456", "pan1234567", "QmYdztkcPJLmGmwLmM4nyBfVatoBMRDuUjmgBupjmTodAP", "vvahuja2000@gmail.com", {from: buyer});
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "Registration", "the event type is correct");
          return landReginstance.buyersCount();
        }).then(function(count) {
          assert.equal(count, 1, "first buyer registered");
        })
    });


    it("allows to verify a seller by Land Inspector", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.verifySeller(seller, {from: landInspector});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered"); 
            assert.equal(receipt.logs[0].event, "Verified", "the event type is correct");
        })
    });

    it("allows to verify a Buyer by Land Inspector", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.verifyBuyer(buyer, {from: landInspector});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered"); 
            assert.equal(receipt.logs[0].event, "Verified", "the event type is correct");
        })
    });
    
    it("allows to add a Land by a verified Seller", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.addLand(500,"Akola","Maharashtra", 20000, 567,1890, "QmYdztkcPJLmGmwLmM4nyBfVatoBMRDuUjmgBupjmTodAP","QmYdztkcPJLmGmwLmM4nyBfVatoBMRDuUjmgBupjmTodAP", {from: seller});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 0, "Receipt"); 
            return landReginstance.landsCount();
        }).then(function(count) {
            assert.equal(count, 1, "first land added.");
          })
    });

    it("allows to request Land by a Verified Buyer", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.requestLand(seller,1, {from: buyer});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "Receipt"); 
            assert.equal(receipt.logs[0].event, "Landrequested", "the event type is correct");
            return landReginstance.requestsCount();
        }).then(function(count) {
            assert.equal(count, 1, "Successful Request for land made.");
          })
    });

    it("allows Seller to approve the Land Request by Buyer", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.approveRequest(1, {from: seller});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 0, "Receipt"); 
            return landReginstance.RequestStatus(1);
        }).then(function(reqStatus) {
            assert.equal(reqStatus, true, "Approved the land request!");
          })
    });

    it("allows buyer to make payment for the Land after approved request ", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.getPrice(1);
        }).then(function(price) {
            price = price*0.0000057;
            return landReginstance.payment(seller, 1, {from: buyer, value: web3.utils.toWei(price.toString(), "ether")});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 0, "Receipt"); 
            return landReginstance.isPaid(1);
        }).then(function(paymentStatus) {
            assert.equal(paymentStatus, true, "Payment done successfully!");
        })
    });

    it("Land Ownership transfer from Seller to Buyer", function(){
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.LandOwnershipTransfer(1, buyer, {from: landInspector})
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 0, "Receipt");
            return landReginstance.LandOwner(1)
        }).then(function(newOwner) {
            assert.equal(newOwner, buyer, "Land Ownership successfully transfered.")
        })
    });

    it("allows a registered and verified seller to edit his/her profile", function() {
        return Land.deployed().then(function(instance) {
            landReginstance = instance;
            return landReginstance.updateSeller("Vrinda Ahuja", 21, "aadhar123456", "pannumber", "ten", {from: seller});
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 0, "Receipt");
          return landReginstance.sellersCount();
        }).then(function(count) {
          assert.equal(count, 1, "seller edited");
        })
      });

});