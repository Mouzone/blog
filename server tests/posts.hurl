# CREATING SINGLE POST, RETRIEVING, UPDATING AND DELETING

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

# Get the post created
GET http://localhost:3000/api/posts/{{postId}}
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
jsonpath "$.post.title" == "title"
jsonpath "$.post.content" == "content"
jsonpath "$.post.isShown" == true

# Update post title and content
POST http://localhost:3000/api/posts/{{postId}}/update
Authorization: Bearer {{token}}
{
  "title": "title2",
  "content": "content2"
}
HTTP 200
[Asserts]
jsonpath "$.status" == 200

# Update post shown status
POST http://localhost:3000/api/posts/{{postId}}/toggle-shown
Authorization: Bearer {{token}}
{
  "isShown": false
}
HTTP 200
[Asserts]
jsonpath "$.status" == 200

# Retrieve post and check that the fields are updated
GET http://localhost:3000/api/posts/{{postId}}
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
jsonpath "$.post.title" == "title2"
jsonpath "$.post.content" == "content2"
jsonpath "$.post.isShown" == false

# Check mass retrieval works
GET http://localhost:3000/api/posts?accountId=1&skip=0&take=5
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 200
jsonpath "$.posts" count == 5

# Delete the post that was created before
POST http://localhost:3000/api/posts/{{postId}}/delete
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 200

# Should have an error status in the response due to the post no longer existing
GET http://localhost:3000/api/posts/{{postId}}
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.status" == 403
