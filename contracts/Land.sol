pragma solidity >= 0.5.2;

contract Land {
    struct Landreg {
        uint id;
        uint area;
        string city;
        string state;
        bool verificationStatus;
        uint landPrice;
        uint propertyPID;
        uint physicalSurveyNumber;
        string ipfsHash;
        string document;
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
        uint reqId;
        address sellerId;
        address buyerId;
        uint landId;
        // bool requestStatus;
        // bool requested;
    }

    //key value pairs
    mapping(uint => Landreg) public lands;
    mapping(uint => LandInspector) public InspectorMapping;
    mapping(address => Seller) public SellerMapping;
    mapping(address => Buyer) public BuyerMapping;
    mapping(uint => LandRequest) public RequestsMapping;

    mapping(address => bool) public RegisteredAddressMapping;
    mapping(address => bool) public RegisteredSellerMapping;
    mapping(address => bool) public RegisteredBuyerMapping;
    mapping(address => bool) public SellerVerification;
    mapping(address => bool) public BuyerVerification;
    mapping(uint => bool) public LandVerification;
    mapping(uint => address) public LandOwner;
    mapping(uint => bool) public RequestStatus;
    mapping(uint => bool) public RequestedLands;


    address[] public sellers;
    address[] public buyers;

    uint public landsCount;
    uint public inspectorsCount;
    uint public sellersCount;
    uint public buyersCount;
    uint public requestsCount;

    event Registration(address _registrationId);
    event AddingLand(uint indexed _landId);
    event Landrequested(address _sellerId);
    event requestApproved(address _buyerId);
    event Verified(address _id);

    constructor() public{
        addLandInspector("Inspector 1", 45, "Tehsil Manager");
    }

    function addLandInspector(string memory _name, uint _age, string memory _designation) private {
        inspectorsCount++;
        InspectorMapping[inspectorsCount] = LandInspector(inspectorsCount, _name, _age, _designation);
    }

    function getLandsCount() public view returns (uint) {
        return landsCount;
    }

    function getBuyersCount() public view returns (uint) {
        return buyersCount;
    }

    function getSellersCount() public view returns (uint) {
        return sellersCount;
    }

    function getRequestsCount() public view returns (uint) {
        return requestsCount;
    }
    // function getRequestStatus(uint id) public payable returns (bool) {
    //     return 
    // }

    function getArea(uint i) public view returns (uint) {
        return lands[i].area;
    }
    function getCity(uint i) public view returns (string memory) {
        return lands[i].city;
    }
     function getState(uint i) public view returns (string memory) {
        return lands[i].state;
    }
    function getStatus(uint i) public view returns (bool) {
        return lands[i].verificationStatus;
    }
    function getPrice(uint i) public view returns (uint) {
        return lands[i].landPrice;
    }
    function getPID(uint i) public view returns (uint) {
        return lands[i].propertyPID;
    }
    function getSurveyNumber(uint i) public view returns (uint) {
        return lands[i].physicalSurveyNumber;
    }
    function getImage(uint i) public view returns (string memory) {
        return lands[i].ipfsHash;
    }
    function getDocument(uint i) public view returns (string memory) {
        return lands[i].document;
    }
    
    function getLandOwner(uint id) public view returns (address) {
        return LandOwner[id];
    }

    function verifySeller(address _sellerId) public{
        require(isLandInspector(msg.sender));

        SellerVerification[_sellerId] = true;
        emit Verified(_sellerId);
    }

    function verifyBuyer(address _buyerId) public{
        require(isLandInspector(msg.sender));

        BuyerVerification[_buyerId] = true;
        emit Verified(_buyerId);
    }
    
    function verifyLand(uint _landId) public{
        require(isLandInspector(msg.sender));

        LandVerification[_landId] = true;
    }

    function isLandVerified(uint _id) public view returns (bool) {
        if(LandVerification[_id]){
            return true;
        }
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

    function isLandInspector(address _id) public view returns (bool) {
        if(0x80f90b5D6E6E956d0Ffc2DC6973c01DcaaE5C03C == _id){
            return true;
        }else{
            return false;
        }
    }

    function isBuyer(address _id) public view returns (bool) {
        if(RegisteredBuyerMapping[_id]){
            return true;
        }
    }
    function isRegistered(address _id) public view returns (bool) {
        if(RegisteredAddressMapping[_id]){
            return true;
        }
    }

    function addLand(uint _area, string memory _city,string memory _state, uint landPrice, uint _propertyPID,uint _surveyNum,string memory _ipfsHash, string memory _document) public {
        require((isSeller(msg.sender)) && (isVerified(msg.sender)));
        landsCount++;
        lands[landsCount] = Landreg(landsCount, _area, _city, _state, false, landPrice,_propertyPID, _surveyNum, _ipfsHash, _document);
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
        sellers.push(msg.sender);
        emit Registration(msg.sender);
    }

    function getSeller() public view returns( address [] memory ){
        return(sellers);
    }

    function getSellerDetails(address i) public view returns (string memory, uint, string memory, string memory, string memory) {
        return (SellerMapping[i].name, SellerMapping[i].age, SellerMapping[i].aadharNumber, SellerMapping[i].panNumber, SellerMapping[i].landsOwned);
    }

    function registerBuyer(string memory _name, uint _age, string memory _city, string memory _state, string memory _aadharNumber, string memory _panNumber) public {
        //require that Buyer is not already registered
        require(!RegisteredAddressMapping[msg.sender]);

        RegisteredAddressMapping[msg.sender] = true;
        RegisteredBuyerMapping[msg.sender] = true ;
        buyersCount++;
        BuyerMapping[msg.sender] = Buyer(msg.sender, _name, _age, _city, _state, _aadharNumber, _panNumber);
        buyers.push(msg.sender);

        emit Registration(msg.sender);
    }

    function getBuyer() public view returns( address [] memory ){
        return(buyers);
    }

    function getBuyerDetails(address i) public view returns (string memory, uint, string memory, string memory, string memory, string memory) {
        return (BuyerMapping[i].name, BuyerMapping[i].age,BuyerMapping[i].city,BuyerMapping[i].state,  BuyerMapping[i].aadharNumber, BuyerMapping[i].panNumber);
    }

    // function getAllRequests() public view returns (LandRequest[] memory){
    //     return RequestsMapping;
    // }

    function requestLand(address _sellerId, uint _landId) public{
        require(isBuyer(msg.sender) && isVerified(msg.sender));
        
        requestsCount++;
        RequestsMapping[requestsCount] = LandRequest(requestsCount, _sellerId, msg.sender, _landId);
        RequestStatus[requestsCount] = false;
        RequestedLands[requestsCount] = true;

        emit Landrequested(_sellerId);
        // RequestsMapping[msg.sender] = LandRequest(_sellerId, _landId, false);
    }

    function getRequestDetails (uint i) public view returns (address, address, uint, bool) {
        return(RequestsMapping[i].sellerId, RequestsMapping[i].buyerId, RequestsMapping[i].landId, RequestStatus[i]);
    }

    function isRequested(uint _id) public view returns (bool) {
        if(RequestedLands[_id]){
            return true;
        }
    }

    function isApproved(uint _id) public view returns (bool) {
        if(RequestStatus[_id]){
            return true;
        }
    }

    function approveRequest(uint _reqId) public {
        require((isSeller(msg.sender)) && (isVerified(msg.sender)));
       
        RequestStatus[_reqId] = true;

    }

    function LandOwnershipTransfer(uint _landId, address _newOwner) public{
        require(isLandInspector(msg.sender));

        LandOwner[_landId] = _newOwner;
    }

}
