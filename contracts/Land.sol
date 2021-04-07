pragma solidity >= 0.5.2;

contract Land {
    struct Landreg {
        uint id;
        uint area;
        string location;
        string owner; //-->this should be the seller 
        bool verificationStatus;
        string landImg;
    }

    struct Buyer{
        address id;
        string name;
        uint age;
        string city;
        string state;
        string aadharNumber;
        string panNumber;
        bool isVerified;
    }

    struct Seller{
        address id;
        string name;
        uint age;
        string aadharNumber;
        string panNumber;
        bool isVerified;
        string landsOwned;
    }

    struct LandInspector {
        uint id;
        string name;
        uint age;
        string designation;
    }

    //key value pairs
    mapping(uint => Landreg) public lands;
    mapping(uint => LandInspector) public InspectorMapping;
    mapping(address => Seller) public SellerMapping;
    mapping(address => Buyer) public BuyerMapping;

    uint public landsCount;
    uint public inspectorsCount;
    uint public sellersCount;
    uint public buyersCount;

    constructor() public{
        addLand(450, "Pune", "Owner 1", "https://images.unsplash.com/photo-1597843736176-23c29f7187f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80");
        addLand(650, "Akola", "Owner 2", "https://images.unsplash.com/photo-1597843736176-23c29f7187f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80");
        addLand(500, "Mumbai", "Owner 3", "https://images.unsplash.com/photo-1597843736176-23c29f7187f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80");
        addLandInspector("Inspector 1", 45, "Tehsil Manager");
    }

    function addLand(uint _area, string memory _location, string memory _owner, string memory _landImg) public {
        landsCount++;
        lands[landsCount] = Landreg(landsCount, _area, _location, _owner, false, _landImg);
    }

    //already present
    function addLandInspector(string memory _name, uint _age, string memory _designation) private {
        inspectorsCount++;
        InspectorMapping[inspectorsCount] = LandInspector(inspectorsCount, _name, _age, _designation);
    }

    //registration of seller
    function registerSeller(string memory _name, uint _age, string memory _aadharNumber, string memory _panNumber, string memory _landsOwned) public {
        sellersCount++;
        SellerMapping[msg.sender] = Seller(msg.sender, _name, _age, _aadharNumber,_panNumber, false, _landsOwned);
    }

    function registerBuyer(string memory _name, uint _age, string memory _city, string memory _state, string memory _aadharNumber, string memory _panNumber) public {
        buyersCount++;
        BuyerMapping[msg.sender] = Buyer(msg.sender, _name, _age, _city, _state, _aadharNumber, _panNumber, false);
    }

    //update
    // function updateLand(uint _id, uint _area, string memory _location, string memory _owner, bool _verificationStatus, string memory _landImg) private{
    //     lands(_id).then(function(instance){land = instance});
    //     land[1] = _area;     
    // }
    //verify ? 
    //delete


}