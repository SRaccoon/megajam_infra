import { connect } from "net";

// 서버 5000번 포트로 접속
var socket = connect({ host: "", port: 5000 });

socket.on("connect", function () {
  console.log("connected to server!");
});

socket.on("data", function (chunk) {
  console.log("recv:" + chunk);
});

socket.on("end", function () {
  console.log("disconnected.");
});

socket.on("error", function (err) {
  console.log(err);
});

socket.on("timeout", function () {
  console.log("connection timeout.");
});
