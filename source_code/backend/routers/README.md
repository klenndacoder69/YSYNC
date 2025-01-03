# What are Routers?

Let us first define what routes are.

### Routes

Routes are the `URL paths` we commonly see when we look up at our search bar. The URL we see composes of many different things, and routes are one of them.

Example of a URL: `https://www.facebook.com/`

This can be separated into two parts:
- `Protocol` - https:// 
- `Domain` - www.facebook.com

We do not really need to understand all of these now but let it serve as a guide. What we want to learn about are routes.

### Accessing resources (routes)
Supposing you want to access a particular resource in Facebook. Let us say we want to check our friends. We can check our friends by adding a route `/friends` in our previous url.

New URL: ```https://www.facebook.com/friends```

With this, we are accessing Facebook in a small portion using the specified friends route. But we know that we can access many things in Facebook such as our profile, the marketplace, probably some posts, or pictures, and many more.

(their routes could probably be `/marketplace`, `/YOUR_FACEBOOK_NAME`, etc.)

We can make this modular using routers, so that we can easily track the routes and endpoints our website has.

### Endpoints  
Now that we understand routes, let's discuss endpoints. Think of endpoints as the functions or methods executed when we interact with a specific URL.

When we visit `https://www.facebook.com/friends`, we prompt the server to render the Friends section of Facebook.  
This URL typically uses a **GET method** because we are retrieving data, not modifying it.

However, when we visit `https://www.facebook.com/friends/accept_friendreq?name=klenn.borja`, we are attempting to accept a friend request.  
This URL usually uses a **POST method** since we are sending data (in this case, the friend's name) to the server to trigger an action.

_(CAUTION: This is a simplified example. The actual process for Facebook’s friend request system may be harder and more complex.)_

#### Get and Post Methods  
The key difference between GET and POST methods is how data is handled.  
- **GET** is used to retrieve data from the server without making changes. Parameters are included in the URL.  
- **POST** is used to send data to the server to create or update resources. Data is sent in the body of the request.

### Making the routers

Making the routers are also straightforward. Import the necessary functions from the specified controllers. Create the components necessary to apply the routes, and export the router.

```js
import {
  getFriends,
  acceptFriendRequest
} from ../controllers/userController.js

const userRouter = (app) => {
  app.get("/friends", getFriends);
  app.post("/accept_friendreq", acceptFriendRequest);
}

export default userRouter
```

### Example router (userRouter.js)

Here is an example of how we made our userRouter in our past CS 100 project.

```js
import {
  registerUser,
  loginUser,
  getAllUsers,
  getShoppingCart,
...and many more...
}

const userRouter = (app) => {
  app.get("/getAllUsers", getAllUsers); // get users
  app.post("/deleteUser", deleteUser);
  app.post("/register", registerUser); // register the user
  app.post("/login", loginUser); // check if valid credentials, then proceed the user to homepage
  app.get("/getShoppingCart", getShoppingCart);
  ... and many more...
}
export default userRouter;
```











