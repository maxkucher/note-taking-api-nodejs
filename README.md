# Note taking REST Api (Node JS)

You can access api by url : https://radiant-caverns-14919.herokuapp.com/ 

## Users Managemen

###Sign Up
>POST /users

Request Body Example:

```json
{
	"name":"John Doe",
	"age":20,
	"password":"doe12345doe",
	"email":"example@mail.com"
}
```

###Login
>POST /users/login

Request Body example:

```json
{
	"email":"your@mail.com",
	"password":"yourpassword"
}
```
Note: password length should be grater than 5, and password should not include word 'password'
The token and user detail will be returned
in the result.
###Logout
>POST /users/logout

###Logout from all devices
>POST /users/logout/all

###Get current profile
>GET /users/me

###Update current user info
>PATCH /users/me

Note: only provide properties that you want to change

###Delete crrent user
>DELETE /users/me

##Tasks Management

###Add task
>POST /tasks
```json
{
    "completed": false,
	"description":"do something"
}
```
Note parameter "completed" is optional.
It is has default value of 'false'.
###Get all user's tasks
>GET /tasks

###Get task by id
>GET /tasks/:id
###Update task by id
>PATCH /tasks/:id
###Delete task by id
>DELETE /tasks/:id

 