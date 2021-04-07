App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Land.json", function(land) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Land = TruffleContract(land);
      // Connect provider to interact with contract
      App.contracts.Land.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var landInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    
    // Load account data
    
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    

    // Load contract data
    App.contracts.Land.deployed().then(function(instance) {
      landInstance = instance;
      return landInstance.landsCount();
    }).then(function(landsCount) {
      var landsData = $("#landsData");
      landsData.empty();

      for (var i = 1; i <= landsCount; i++) {
        landInstance.lands(i).then(function(land) {
          var id = land[0];
          var area = land[1];
          var location = land[2];
          var owner = land[3];
          var status = land[4];
          var image = land[5];

          // Render candidate Result
          var landTemplate = "<tr><th>" + id + "</th><td>" + area + "</td><td>" + location + "</td><td>" + owner + "</td><td>" + status + "</td></tr>" 
          //var image = $("img");
          //image.src = img;
          //document.getElementsByTagName('img'). = img;
        //  $("img").attr("src","./images/land-1.jpeg");          
         // var imagedom = document.querySelector("img");
          //imagedom.src = image;
          //$("img").attr("height", 200);
          //$("img").attr("width", 300);
          //landTemplate.find('img').attr('src', img);
          landsData.append(landTemplate);
        
        });
      }
      
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});



// App = {
//   web3Provider: null,
//   contracts: {},

//   init: async function() {
//     // Load pets.
//     $.getJSON('../pets.json', function(data) {
//       var petsRow = $('#petsRow');
//       var petTemplate = $('#petTemplate');

//       for (i = 0; i < data.length; i ++) {
//         petTemplate.find('.panel-title').text(data[i].name);
//         petTemplate.find('img').attr('src', data[i].picture);
//         petTemplate.find('.pet-breed').text(data[i].breed);
//         petTemplate.find('.pet-age').text(data[i].age);
//         petTemplate.find('.pet-location').text(data[i].location);
//         petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

//         petsRow.append(petTemplate.html());
//       }
//     });

//     return await App.initWeb3();
//   },

//   initWeb3: async function() {
//     /*
//      * Replace me...
//      */

//     return App.initContract();
//   },

//   initContract: function() {
//     /*
//      * Replace me...
//      */

//     return App.bindEvents();
//   },

//   bindEvents: function() {
//     $(document).on('click', '.btn-adopt', App.handleAdopt);
//   },

//   markAdopted: function() {
//     /*
//      * Replace me...
//      */
//   },

//   handleAdopt: function(event) {
//     event.preventDefault();

//     var petId = parseInt($(event.target).data('id'));

//     /*
//      * Replace me...
//      */
//   }

// };

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });
