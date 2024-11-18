# CREATING SINGLE COMMENT, RETRIEVING

# Login and get token to pass for each request
POST http://localhost:3000/api/log-in
[FormParams]
username: deez
password: nuts
HTTP 200
[Captures]
token: jsonpath "$.accessToken"

# Create a post
POST http://localhost:3000/api/posts/create
Authorization: Bearer {{token}}
{
  "title": "title",
  "content": "content"
}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
[Captures]
postId: jsonpath "$.postId"

POST http://localhost:3000/api/posts/delete
Authorizations: Bearer {{token}}
HTTP 403
[Asserts]
jsonpath "$.status" == 200


