POST http://localhost:3000/api/log-in
[FormParams]
username: deez
password: nuts
HTTP 200
[Captures]
token: jsonpath "$.accessToken"

POST http://localhost:3000/api/posts/create
Authorization: Bearer {{token}}
{
  "title": "title",
  "description": "description",
  "content": "content"
}
HTTP 200
[Captures]
postId: jsonpath "$.postId"

POST http://localhost:3000/api/comments/create
Authorization: Bearer {{token}}
{
  "id": "{{postId}}",
  "content": "content"
}
HTTP 200

POST http://localhost:3000/api/comments/create
Authorization: Bearer {{token}}
{
  "id": "{{postId}}",
  "content": "content"
}
HTTP 200

POST http://localhost:3000/api/comments/create
Authorization: Bearer {{token}}
{
  "id": "{{postId}}",
  "content": "content"
}
HTTP 200

POST http://localhost:3000/api/posts/create
Authorization: Bearer {{token}}
{
  "title": "title",
  "description": "description",
  "content": "content"
}
HTTP 200
[Captures]
postId: jsonpath "$.postId"

POST http://localhost:3000/api/posts/create
Authorization: Bearer {{token}}
{
  "title": "title",
  "description": "description",
  "content": "content"
}
HTTP 200
[Captures]
postId: jsonpath "$.postId"

POST http://localhost:3000/api/posts/create
Authorization: Bearer {{token}}
{
  "title": "title",
  "description": "description",
  "content": "content"
}
HTTP 200
[Captures]
postId: jsonpath "$.postId"