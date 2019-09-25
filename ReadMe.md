# Tabless API

*Version: 1.0.0*

A simple backend for the Tabless  project. Featuring a sign up and log in system using industry standard encrypting and hashing as well as JSON Web Tokens for authentication. 

## List of Routes

* **GET** - Retrive All Users 

  > https://tabless-backend.herokuapp.com/users
  >
  > Provides a list of the Users (email and ID).
  >
  > Requires no authetication. This route is temporary and for development only.

* **POST** - Sign Up New User

  >https://tabless-backend.herokuapp.com/users/signup
  >Signs up new user with email,  password and name. 
  >
  >The format of the body of the request must look like:
  >
  >```json
  >{
  >"email": "test@test.com",
  >"password": "test1234",
  >"name": "Mr. Test"
  >}
  >```
  >
  >All fields are required. Email must be formatted correctly, password must contain over 8 characters.

* **POST** - Log In Existing User 

  > https://tabless-backend.herokuapp.com/users/login
  > Logs in existing user using email and password. 
  > The format of the body of the request must look like:
  >
  > ```json
  > {
  > "email": "test@test.com",
  > "password": "test1234"
  > }
  > ```
  >
  > Server is validate credentials if all fields are present and password matches. On a successful login in, the server will return the following data:
  >
  > ```json
  > {
  > "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJUZXN0IiwiaWF0IjoxNTY5NDA4NDg0LCJleHAiOjE1Njk0OTQ4ODR9.c6GFy9J-FgB2XW69Z9ftHCO6GyEL5KoM5NERtL8MdE4",
  >   
  > "name": "Test",
  >   
  > "id": 24
  > }
  > ```
  >
  > A JSON Web Token used for future authentication, the user's given name at point of sign up and the user's ID. This can all be stored in local storage or elsewhere for future authentication. 
  >
  > The token is valid for 24 hours from point of log in.

  ​	

**DELETE** - Delete User Account by ID

>https://tabless-backend.herokuapp.com/users/:id
>Deletes user where  `:id` is the user ID wanted for deletion.
>The token **must** be set as an *authorization* header on the request. 
>The server will then verify the ID contained in the token of the logged in user matches that of the requested deletion, ensuring that only the user themselves can delete the account. 

--------

**GET**  - Retrieve All Saved Tabs 

> https://tabless-backend.herokuapp.com/tabs/all
>
> Provides a list of all saved Tabs across all users. 
>
> Requires no authetication. This route is temporary and for development only.

**GET** - Retrieve Specific User Tabs 

>https://tabless-backend.herokuapp.com/tabs/tab
>
>This is a protected route.
>
>For the request to be a success, there must be a valid token present in the *authorization* header. The server will decode the token and use the included ID to send back the correct set of tabs corresponding to the User ID. 
>
>The tabs will come back in array:
>
>```json
>[
>    {
>        "id": 1,
>        "url": "https://www.google.com",
>        "title": "Google Homepage",
>        "notes": "The evil homepage that everybody cannot help but use",
>        "user_id": 1
>    },
>    {
>        "id": 2,
>        "url": "https://www.reddit.com",
>        "title": "Reddit",
>        "notes": "Reddit - Frontpage of the internet",
>        "user_id": 1
>    },
>    {
>        "id": 3,
>        "url": "https://www.youtube.com/watch?v=hiiEeMN7vbQ&t=274s",
>        "title": "Developing a Growth Mindset with Carol Dweck",
>        "notes": "Video recommended by Isaac",
>        "user_id": 1
>    }
>]
>```
>
>If there are currentlly no tabs saved to that user's account, the response will return:
>
>```json
>{
>    "message": "No saved Tabs yet"
>}
>```

**POST** - Post New Tab to User Account

> https://tabless-backend.herokuapp.com/tabs/tab
>
> This is a protected route.
>
> There are two hard requirements:
>
> 1. A valid token must be set as an *authorization* header. 
>
> 2. The body must contain a URL and Title field. There is an optional extra Notes field.
>    The body response will look like:
>
>    ```json
>    {
>    	"url": "https://www.lambdaschool.com",
>    	"title": "Lambda School",
>    	"notes": "Where we study!"
>    }
>    ```
>
>    If the post is successful, the response will be the created item as well as a success message. 

**DELETE** - Delete Tab by ID

>https://tabless-backend.herokuapp.com/tabs/tab/:id
>
>This is a protected route.
>
>The parameter `:id` refers to the ID of the tab to be deleted.
>A valid token must be set as an *authorization* header. If there is no token present or it does not match the associated User ID of the Tab itself, deletion will be denied. 
>If the currently logged in User's ID matches that of the associated user ID of the tab, the deletion will be successful.

**PUT** - Edit Tab by ID

>https://tabless-backend.herokuapp.com/tabs/tab/:id
>
>This is a protected route.
>
>The parameter `:id` refers to the ID of the tab to be edited.
>
>Similarly to the deletion route, the authorization of the edit is based of the user ID of the tab matching the User ID contained within the token provided to the authorization header. 
>If the match, an edit can taken place.
>
>Furthermore, the request body will have to contain the full updated item, much like a post request: 
>
>```json
>{
>	"url": "https://www.lambdaschool.com - Edited!",
>	"title": "Lambda School - Edited!",
>	"notes": "Where we study - Edited!"
>}
>```



