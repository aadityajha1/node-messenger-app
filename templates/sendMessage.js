const request = require('request');
module.exports = function sendMessage(recipientId, message){

return new Promise(function(resolve, reject) {
   console.log(process.env.PAGE_ACCESS_TOKEN)
   request({
      url: "https://graph.facebook.com/v15.0/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
              recipient: {id: recipientId},
              message: message,
            }
      }, function(error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error ? response.error : response);
            reject(response.error);
            } else {
               resolve(body);
            }
       });
   })
}