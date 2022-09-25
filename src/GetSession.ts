import { GameLift } from "aws-sdk";

(async () => {
  const gameLift = new GameLift({
    region: "ap-northeast-2",
  });
  const session = await gameLift
    .createGameSession({
      FleetId: "fleet-d20391b5-0cbd-4b71-b8c9-7bc268e2ce19",
      MaximumPlayerSessionCount: 1,
    })
    .promise();

  return session;
})();
