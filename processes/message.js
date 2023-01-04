const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const sendGenericTemplate = require('../templates/sendGenericMessage');
module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
      const message = event.message;
      const senderID = event.sender.id;
      console.log("Received message from senderId: " + senderID);
      console.log("Message is: " + JSON.stringify(message));
      request({
        url: "https://graph.facebook.com/v15.0/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
                recipient: {id: '6205499229484437'},
                message: {text: 'Hello There!'},
              }
        },(err, res, body) => {
          if(err) {
            console.log('ERR' , err)

          }
          console.log(res)
          console.log(body)
        })
    if (message.text) {
        console.log('Message text')
    // now we will take the text received and send it to an food tracking API.
      let text = message.text;
      let request = require("request");
      let options = {
          method: 'POST',
          url: 'https://mefit-preprod.herokuapp.com/api/getnutritionvalue',
          headers:{ 'cache-control': 'no-cache',
                    'content-type': 'application/json'
                  },
          body:{ userID: process.env.USERID,
                 searchTerm: text
               },
          json: true
      };
request(options, function (error, response, body) {
      if (error) throw new Error('Errrrrr: ', error);
      senderAction(senderID);
      // after the response is recieved we will send the details in a Generic template
  
       sendGenericTemplate(senderID,body);
      });
    }
  }
}