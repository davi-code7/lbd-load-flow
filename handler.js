const SnsSqsSlq = require("sns-sqs-slq-code7");
const fetch = require("node-fetch");

("use strict");

module.exports.loadFlow = async (event) => {
  const body = JSON.parse(event.Records[0].body);
  const message = JSON.parse(body.Message);

  const snsSqsSlq = new SnsSqsSlq.default();

  const response = await fetch(
    "http://api.testes.boteria.com.br/api/v1/bots/601d3599961dc5001371fa56/full",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTg2MjkxYzhhZTM1YTAwMTFiZjQ1MTAiLCJlbWFpbCI6Im1pY2hlbC5wYXN0YUBjb2RlNy5jb20iLCJvcmdhbml6YXRpb25JZCI6IjVlODYyOTFjOGFlMzVhMDAxMWJmNDUxMiIsImNsYWltIjoiQWRtaW4iLCJpYXQiOjE2MTcyMDE5ODcsImV4cCI6MTYxNzI4ODM4N30._gulwaE7hGmZyYxrLxaCmbth-58o-UUyOyqmUGJ56sg",
      },
    }
  );

  const boteria = await response.json();

  await snsSqsSlq.publishToTopic(
    "sns-flow",
    JSON.stringify(message),
    "load",
    "flow",
    "arn:aws:sns:us-east-1:303732912389:sns-flow.fifo"
  );
};
