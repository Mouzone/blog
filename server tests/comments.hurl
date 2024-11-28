# CREATING SINGLE COMMENT, RETRIEVING

# Login and get token to pass for each request
POST http://localhost:3000/api/log-in
{
    "username": "deez",
    "password": "nuts"
}
HTTP 200
[Captures]
token: jsonpath "$.accessToken"

# Create a post
POST http://localhost:3000/api/posts/create
Authorization: Bearer {{token}}
{
  "title": "title",
  "description": "description",
  "content": "content"
}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
[Captures]
postId: jsonpath "$.postId"

# Create a comment
POST http://localhost:3000/api/comments/create
Authorization: Bearer {{token}}
[FormParams]
postId: {{postId}}
content: content
HTTP 200
[Asserts]
jsonpath "$.status" == 200

# Get comments
GET http://localhost:3000/api/comments
Authorization: Bearer {{token}}
{
  "id": "{{postId}}"
}
HTTP 200
[Asserts]
jsonpath "$.status" == 503
#jsonpath "$.comments" count == 1

# Delete Post
POST http://localhost:3000/api/posts/delete
Authorizations: Bearer {{token}}
HTTP 200


# Check comments are non-existent as well
GET http://localhost:3000/api/comments
Authorization: Bearer {{token}}
{
  "id": "{{postId}}"
}
HTTP 200
[Asserts]
jsonpath "$.status" == 503
