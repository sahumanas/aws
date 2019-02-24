//Node js 6.10 
var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'eu-west-1'
});


exports.handler = function(event, context,callback) {
     console.log('Received event:',
                 JSON.stringify(event, null, 3));
  
       //var inputObjmobilenumber = JSON.stringify(event, null, 3);
       //console.log('inputObjmobilenumber:',inputObjmobilenumber['email']);
      // var inputObjemail = JSON.parse(event["email"]);
      // var inputObjmessage = JSON.parse(event["message"]);
      
      //var inputObjmessage = inputObjmobilenumber['email'];
       //Data: JSON.stringify(event, null, 3)
    var eParams = {
        Destination: {
            ToAddresses: ["m.ranjan24@gmail.com"]
        },
        Message: {
            Body: {
                Text: {
                    Data: JSON.stringify(event, null, 3)
                }
            },
            Subject: {
                Data: "[BHUK] :: AWS :: Lamda Triggered "
            }
        },
        Source: "thebhuk@gmail.com"
    };

var res = {'status': 'success'} ;

const response_success = {
      statusCode: 200,
      statusText: "success",
      responseText: "success",
      body: JSON.stringify(res),
};

const response_error = {
    statusCode: 400,
    body: JSON.stringify({
        status: 'error'
    })
};
  
    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) 
        {
            console.log(err);
            //callback(error);
        }
        else {
            console.log("===EMAIL SENT===");
            console.log(data);


            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);
            callback(undefined, response_success)
           // return context.succeed();
           // context.succeed(response_success);
           // callback('success');

        }
        //callback(null, "success");
    });
    //callback(undefined, response_success)



};
