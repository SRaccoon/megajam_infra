import { DynamoDB, GameLift } from "aws-sdk";

const region = "ap-northeast-2";

(async () => {
  const gameLift = new GameLift({
    region,
  });

  const playerSession = await gameLift.createPlayerSession().promise();

  const session = await gameLift
    .createGameSession({
      FleetId: "fleet-d20391b5-0cbd-4b71-b8c9-7bc268e2ce19",
      MaximumPlayerSessionCount: 1,
    })
    .promise();

  const dynamo = new DynamoDB({ region });

  await dynamo
    .putItem({
      TableName: "ManualGameSession",
      Item: {
        SessionId: { S: session.GameSession.GameSessionId },
      },
    })
    .promise();

  return session;
})();
