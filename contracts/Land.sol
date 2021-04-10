pragma solidity >= 0.5.2;
pragma experimental ABIEncoderV2;

contract Land {
    struct Landreg {
        uint id;
        uint area;
        string location;
        // address owner; //-->this should be the seller 
        bool verificationStatus;
        // string landImg;
    }

    struct Buyer{
        address id;
        string name;
        uint age;
        string city;
        string state;
        string aadharNumber;
        string panNumber;
    }

    struct Seller{
        address id;
        string name;
        uint age;
        string aadharNumber;
        string panNumber;
        string landsOwned;
    }

    struct LandInspector {
        uint id;
        string name;
        uint age;
        string designation;
    }

    struct LandRequest{
        address sellerId;
        address buyerId;
        uint landId;
        bool requestStatus;
    }

    //key value pairs
    mapping(uint => Landreg) public lands;
    mapping(uint => LandInspector) public InspectorMapping;
    mapping(address => Seller) public SellerMapping;
    mapping(address => Buyer) public BuyerMapping;
    // mapping(address => LandRequest) public RequestsMapping;

    mapping(address => bool) public RegisteredAddressMapping;
    mapping(address => bool) public RegisteredSellerMapping;
    mapping(address => bool) public RegisteredBuyerMapping;
    mapping(address => bool) public SellerVerification;
    mapping(address => bool) public BuyerVerification;
    mapping(uint => address) public LandOwner;

    LandRequest[] public RequestsMapping;

    uint public landsCount;
    uint public inspectorsCount;
    uint public sellersCount;
    uint public buyersCount;

    event Registration(address _registrationId);
    event AddingLand(uint indexed _landId);
    event Landrequested(address _sellerId);
    event requestApproved(address _buyerId);
    event Verified(address _id);

    constructor() public{
        // addLand(450, "Pune");
        // addLand(650, "Akola");
        // addLand(500, "Mumbai");
        addLandInspector("Inspector 1", 45, "Tehsil Manager");
    }


    //already present
    function addLandInspector(string memory _name, uint _age, string memory _designation) private {
        inspectorsCount++;
        InspectorMapping[inspectorsCount] = LandInspector(inspectorsCount, _name, _age, _designation);
    }

    // function isLadIspector() private{
    //     if(msg.sender == "")
    //         return true;
    // }

    function verifySeller(address _sellerId) public{
        require(0x6F888D6aeaF7300A207adE052fC51C5bf73a6cF5 == msg.sender);

        SellerVerification[_sellerId] = true;
        emit Verified(_sellerId);
    }

    function verifyBuyer(address _buyerId) public{
        require(0x6F888D6aeaF7300A207adE052fC51C5bf73a6cF5 == msg.sender);

        BuyerVerification[_buyerId] = true;
        emit Verified(_buyerId);
    }

    function isVerified(address _id) public view returns (bool) {
        if(SellerVerification[_id] || BuyerVerification[_id]){
            return true;
        }
    }

    function isSeller(address _id) public view returns (bool) {
        if(RegisteredSellerMapping[_id]){
            return true;
        }
    }

    function isBuyer(address _id) public view returns (bool) {
        if(RegisteredBuyerMapping[_id]){
            return true;
        }
    }

    function addLand(uint _area, string memory _location) public {
        // let landImg = "https://images.unsplash.com/photo-1597843736176-23c29f7187f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80";
        require((isSeller(msg.sender)) && (isVerified(msg.sender)));
        landsCount++;
        lands[landsCount] = Landreg(landsCount, _area, _location, false);
        LandOwner[landsCount] = msg.sender;
        // emit AddingLand(landsCount);
    }

    //registration of seller
    function registerSeller(string memory _name, uint _age, string memory _aadharNumber, string memory _panNumber, string memory _landsOwned) public {
        //require that Buyer is not already registered
        require(!RegisteredAddressMapping[msg.sender]);

        RegisteredAddressMapping[msg.sender] = true;
        RegisteredSellerMapping[msg.sender] = true ;
        sellersCount++;
        SellerMapping[msg.sender] = Seller(msg.sender, _name, _age, _aadharNumber,_panNumber, _landsOwned);

        emit Registration(msg.sender);
    }

    function registerBuyer(string memory _name, uint _age, string memory _city, string memory _state, string memory _aadharNumber, string memory _panNumber) public {
        //require that Buyer is not already registered
        require(!RegisteredAddressMapping[msg.sender]);

        RegisteredAddressMapping[msg.sender] = true;
        RegisteredBuyerMapping[msg.sender] = true ;
        buyersCount++;
        BuyerMapping[msg.sender] = Buyer(msg.sender, _name, _age, _city, _state, _aadharNumber, _panNumber);
    
        emit Registration(msg.sender);
    }

    function requestLand(address _sellerId, uint _landId) public{
        require(isBuyer(msg.sender) && isVerified(msg.sender));
        
        LandRequest memory newReq =  LandRequest({
            sellerId: _sellerId,
            buyerId: msg.sender,
            landId: _landId,
            requestStatus: false});
    
        RequestsMapping.push(newReq);

        emit Landrequested(_sellerId);
        // RequestsMapping[msg.sender] = LandRequest(_sellerId, _landId, false);
    }

    function approveRequest(LandRequest memory req) public {
        require((isSeller(msg.sender)) && (isVerified(msg.sender)));

        req.requestStatus = true;

        emit requestApproved(req.buyerId);
    }

    function LandOwnershipTransfer(uint _landId, address _newOwner) public{
        require(0x6F888D6aeaF7300A207adE052fC51C5bf73a6cF5 == msg.sender);

        LandOwner[_landId] = _newOwner;
    }

}