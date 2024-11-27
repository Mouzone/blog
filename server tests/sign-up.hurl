POST http://localhost:3000/api/sign-up
{
    "username": "deez",
    "password": "nuts"
}
HTTP 200
[Asserts]
jsonpath "$.message" == "Username already taken"
