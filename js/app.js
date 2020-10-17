var firebaseConfig = {
    apiKey: "AIzaSyAHhoX9lCu61pT8Ithq5YhI8g5gjI9E1n4",
    authDomain: "sofalio.firebaseapp.com",
    databaseURL: "https://sofalio.firebaseio.com",
    projectId: "sofalio",
    storageBucket: "sofalio.appspot.com",
    messagingSenderId: "731095595011",
    appId: "1:731095595011:web:f47144df128cad7e38f636",
    measurementId: "G-3T0SCJL28T"
  };
  firebase.initializeApp(firebaseConfig);

  function getSofa(){
      const dbref = firebase.database().ref();
      var sofasHTML = "";
        dbref.on("child_added", snapshot =>{
            let sofa = snapshot.val()
            if(sofa.id != localStorage.getItem("visited")){
                sofasHTML += `
                <div class="card">
                    <a href="./sofa.html?id=${sofa.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${sofa.image}" />
                    </div>
                    </a>
                    <div class="card-content">
                    <span class="card-title truncate">${sofa.product_name}</span>
                    <p>Price Rp.${sofa.price}</p>
                    </div>
                </div>
                `;
                document.getElementById("sofa").innerHTML = sofasHTML;
            }
    });
  }

  function getSelectedSofa(){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    localStorage.setItem("visited", idParam);
    
    const dbRef = firebase.database().ref().child(idParam);
    dbRef.once("value").then(function(snapshot){
        var sofa = snapshot.val()
          var sofasHTML = `
          <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${sofa.image}" />
          </div>
          <div class="card-content">
            <span class="card-title">${sofa.product_name}</span>
            <span class="card-title">Price Rp. ${sofa.price}</span>
            <span class="card-title">Material: ${sofa.material}</span>
            <span class="card-title">Dimension: ${sofa.dimension}</span>
            <span class="card-title">Colors: ${sofa.colors}</span>
          </div>
        </div>
      `;
          document.getElementById("body-content").innerHTML = sofasHTML;
          getSimilarSofa(sofa.id, sofa.colors);
    });
  }

  function getSimilarSofa(id, colors){
    const dbref = firebase.database().ref();
    var sofasHTML = "";
    dbref.on("child_added", snapshot =>{
        let sofa = snapshot.val()
        if(sofa.id != id && sofa.colors == colors){
        sofasHTML += `
          <div class="card">
            <a href="./sofa.html?id=${sofa.id}">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${sofa.image}" />
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${sofa.product_name}</span>
              <p>Price Rp. ${sofa.price}</p>
            </div>
          </div>
        `;
        }
        document.getElementById("similar_sofa").innerHTML = sofasHTML;
    });
    }