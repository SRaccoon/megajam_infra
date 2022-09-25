import { DynamoDB, GameLift } from "aws-sdk";

const gameLift = new GameLift({ region: process.env.AWS_REGION });

(async (event) => {
  let response;
  const ticketId = event.queryStringParameters.ticketId;

  const ddb = new DynamoDB({ apiVersion: "2012-08-10" });

  const params = {
    TableName: "GameTicket",
    Key: {
      TicketID: { S: ticketId },
    },
  };

  await ddb
    .getItem(params)
    .promise()
    .then((data) => {
      if (data.Item != null) {
        console.log("Found Ticket");
        ip = data.Item["ip"].S;
        port = parseInt(data.Item["port"].S);
        playerSessionId = data.Item["playerSessionId"].S;
        dnsName = data.Item["dnsName"].S;

        const responsedata = {
          IpAddress: ip,
          Port: port,
          PlayerSessionId: playerSessionId,
          DnsName: dnsName,
        };
      } else {
        console.log("Matchmaking not succeeded yet");
        const responsedata = {
          IpAddress: "",
          Port: 0,
          PlayerSessionId: "NotPlacedYet",
        };
      }

      response = {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(responsedata),
        isBase64Encoded: false,
      };
    })
    .catch((err) => {
      console.log("Couldn't access ticket data in DynamoDB: " + err);
    });

  //Return response if we got one
  if (response != null) {
    return response;
  }

  //Send error response if not successful
  response = {
    statusCode: 500,
    headers: {},
    body: JSON.stringify({
      message: "Unable to do matchmaking",
    }),
    isBase64Encoded: false,
  };

  return response;
})();
