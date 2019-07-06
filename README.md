# Note taking REST Api (Node JS)

You can access api by url : https://radiant-caverns-14919.herokuapp.com/ 

## Users Management

1.Sign Up

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

1.Login

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
1.Logout

>POST /users/logout

1.Logout from all devices

>POST /users/logout/all

1.Get current profile

>GET /users/me

1.Update current user info

>PATCH /users/me

Note: only provide properties that you want to change

1.Delete current user

>DELETE /users/me

##Tasks Management

1.Add task

>POST /tasks
```json
{
    "completed": false,
	"description":"do something"
}
```
Note parameter "completed" is optional.
It is has default value of 'false'.
1.Get all user's tasks

>GET /tasks

1.Get task by id

>GET /tasks/:id
1.Update task by id

>PATCH /tasks/:id
1.Delete task by id

>DELETE /tasks/:id

 