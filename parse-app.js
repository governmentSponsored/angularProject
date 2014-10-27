Parse.initialize("WfjtyO2ov01ie5KPiSbOaAvOzBpessMB8iervPEi", "ihjA6JyiHQ7LHLmPfKCwBRyU2vIRegnJ4m3YvWwu");
    //basic parse object
    /* This was the query originally used to see how querying with parse worked. Will use modified version elsewhere.
    var TestObject = Parse.Object.extend("TestObject");
    //new instance of BeerData
    var testObject = new TestObject();

    //query parse
    //function queryAll() {
      var query = new Parse.Query(TestObject);
      var resultItem;
      var successEl = $('.success');
      //query.equalTo("foo", "bar");
      query.find({
        success: function(results) {
          var current, id, foo;
          for(var i=0; i<results.length; i++) {
            current = results[i];
            id = current.id;
            foo = current.get('foo');
            resultItem = $("<p>result #: " + i + " id: " + id + " foo? " + foo + "</p>");
            successEl.append(resultItem)
          }
          $('.success').removeClass('hidden')
                       .find('h3').append(' queried ' + results.length + " results")
        },
        error: function(error) {
          $('.error').find('h3').append(' query did not work because ' + error.message + ' error code: ' + error.code)
        }
      });
    //}
    */


    /* This code was used to see if parse was working the way it was configured. Now time to query, add on command, delete, etc 

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({foo: "bar"}, {
      success: function(object) {
        $(".success").removeClass('hidden');
      },
      error: function(model, error) {
        $(".error").removeClass('hidden');
      }
    });*/