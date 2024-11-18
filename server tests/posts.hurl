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

# Get all the post(s) created
GET http://localhost:3000/api/posts
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
jsonpath "$.posts" count == 1

# Delete the psot that was created before
POST http://localhost:3000/api/posts/{{postId}}/delete
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 200

# Check that there are no posts at all 
GET http://localhost:3000/api/posts
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
jsonpath "$.posts" count == 0
