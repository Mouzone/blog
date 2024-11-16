POST http://localhost:3000/api/log-in
[FormParams]
username: deez
password: nuts
[Options]
output: -
HTTP 200
[Asserts]
jsonpath "$.status" == 200
