# Note taking REST Api (Node JS)

### Users Management

####Sign Up
>POST /users

Request Body Example:

```
{
	"name":"John Doe",
	"age":20,
	"password":"doe12345doe",
	"email":"example@mail.com"
}
```

####Login
>POST /users/login

Request Body example:

```$xslt
{
	"email":"your@mail.com",
	"password":"yourpassword"
}
```
The token and user detail will be returned
in the result.
####Logout
>POST /users/logout

####Logout from all devices
>POST /users/logout/all

####Get current profile
>GET /users/me

####Update current user info
>PATCH /users/me

Note: only provide properties that you want to change

####Delete crrent user
>DELETE /users/me
 