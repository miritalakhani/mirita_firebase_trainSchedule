// Initialize Firebase
var config = {

};

firebase.InitializeApp(config);
var dataRef = firebase.database();

//initial values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";


// Capture submit Button Click (id = submit)
$("#submit").on("click", function(event) {
 event.preventDefault();


// Code in the logic for (a)storing and (b)retrieving the most recent user.
// Don't forget to provide initial data to your Firebase database.
trainName = $("#trainName").val().trim();
destination = $("#destination").val().trim();
firstTrainTime = $("#firstTrainTime").val().trim();
frequency = $("#frequency").val().trim();

// Code for the push
dataRef.ref().push({

    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    });


// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency);


// full list of items to the well
$("#full-member-list").append("<div class='well'><span id='trainName'> " + childSnapshot.val().trainName +
  " </span><span id='destination'> " + childSnapshot.val().destination +
  " </span><span id='firstTrainTime'> " + childSnapshot.val().firstTrainTime +
  " </span><span id='frequency'> " + childSnapshot.val().frequency + " </span></div>");

// Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

// Change the HTML to reflect
$("#trainName").html(snapshot.val().trainName);
$("#destination").html(snapshot.val().destination);
$("#firstTrainTime").html(snapshot.val().firstTrainTime);
$("#frequency").html(snapshot.val().frequency);
});




