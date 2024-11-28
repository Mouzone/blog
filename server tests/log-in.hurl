POST http://localhost:3000/api/log-in
{
    "username": "deez",
    "password": "nuts"
}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
