import { GameLift } from "aws-sdk";

const gameLift = new GameLift({
  region: "ap-northeast-2",
});

gameLift
  .createGameSession({
    FleetId: "fleet-d20391b5-0cbd-4b71-b8c9-7bc268e2ce19",
    MaximumPlayerSessionCount: 1,
  })
  .promise();
