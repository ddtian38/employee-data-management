$(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCMgSS7i2CBJE5BdmaIah7gZEk6DmTLglQ",
    authDomain: "employee-data-management-61f3a.firebaseapp.com",
    databaseURL: "https://employee-data-management-61f3a.firebaseio.com",
    projectId: "employee-data-management-61f3a",
    storageBucket: "employee-data-management-61f3a.appspot.com",
    messagingSenderId: "605542098125"
  };
  firebase.initializeApp(config);

  var database = firebase.database();





$(document).on("click", "#add-employee-btn", function(){
  console.log("xxx")
    var name = $("#employee-name-input").val().trim();
    var role = $("#role-input").val().trim();
    var startDate = $("#start-input").val().trim();
    var rate = $("#rate-input").val().trim();

    var date=new Date();
    var date2=new Date(startDate);
    var day=date.getTime()-date2.getTime();
    day=Math.floor(day/1000/60/60/24/30)

    database.ref().push({
      name: name,
      role: role,
      date: startDate,
      monthWork: day,
      monthRate: rate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    console.log("!!!!!")

    })

    database.ref().on("child_added", function(snapshot) {
      var sv = snapshot.val();
      var total=parseInt(sv.monthWork)*parseInt(sv.monthRate);
      var tr=$("<tr>");
      tr.append($("<td>").append(sv.name));
      tr.append($("<td>").append(sv.role));
      tr.append($("<td>").append(sv.date));
      tr.append($("<td>").append(sv.monthWork));
      tr.append($("<td>").append(sv.monthRate));
      tr.append($("<td>").append(total));
      $("tbody").append(tr);
    });

})