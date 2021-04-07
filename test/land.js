var Land = artifacts.require("./Land.sol");

contract("Land", function(accounts){

    var landInstance;
    
    it("Initialize with 3 lands", function(){
        return Land.deployed().then(function(instance){
            return instance.landsCount();
        }).then(function(count){
            assert.equal(count, 3);
        });
    });

    it("it initializes the lands with the correct values", function(){
        return Land.deployed().then(function(instance) {
            landInstance = instance;
            return landInstance.lands(1);
        }).then(function(land) {
            assert.equal(land[0], 1, "contains the correct id");
            assert.equal(land[1], 450, "contains the correct area");
            assert.equal(land[2], "Pune", "contains the correct location");
            assert.equal(land[3], "Owner 1", "contains the correct owner");
            assert.equal(land[4], false, "contains the correct status");
            assert.equal(land[5], "https://images.unsplash.com/photo-1597843736176-23c29f7187f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80", "contains the correct image");
            return landInstance.lands(2);
        }).then(function(land) {
            assert.equal(land[0], 2, "contains the correct id");
            assert.equal(land[1], 650, "contains the correct area");
            assert.equal(land[2], "Akola", "contains the correct location");
            assert.equal(land[3], "Owner 2", "contains the correct owner");
            assert.equal(land[4], false, "contains the correct status");
            assert.equal(land[5], "https://images.unsplash.com/photo-1597843736176-23c29f7187f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80", "contains the correct image");
            
        })
    })

});
