# What are Controllers?

Controllers handle the logic of our code in the backend.

## What is an Example of a Component Inside a Controller?

Let’s take a look at an example from my past CS 100 project:

```js
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User successfully deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user", success: false });
  }
};
```

This component handles the deletion of a user in the database. Let me break down what’s happening here:

### Function Initialization

```js
const deleteUser = async (req, res) => ...
```

This initializes an asynchronous function called `deleteUser` with parameters `req` (request) and `res` (response).

(Assuming that you have already read into asynchronous in your CS 22 courses, you must already know what this means)


### Requests and Responses

In a server, we have what’s called communication, just like a chat between two people—there’s a sender and a receiver. In CS terms, it’s between a user and a server, and they communicate through requests and responses. Each of these consists of data, usually in a JSON format.

### JSON Format

JSON (JavaScript Object Notation) is a way to store data in a JavaScript-like structure. Here’s an example of a JSON object:

```js
const person = {
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "skills": ["JavaScript", "HTML", "CSS"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
};
```

You can access the information using dot notation:

```js
console.log(person.name); // Outputs "John Doe"
console.log(person.skills); // Outputs ["JavaScript", "HTML", "CSS"]
console.log(person.address.street); // Outputs "123 Main St"
```

Keep in mind that there are different ways of storing JSON data, such as a `JSON string`, `JSON object`, and a `JSON file`. There are different ways of parsing them. 
#### Try-Catch Block

The try-catch block ensures that your program continues to run even if an error occurs.

```js
try {
    // Code that might throw an error
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    // Code to handle the error
    console.error("An error occurred:", error.message);
}
```

If an error occurs in `riskyOperation`, the catch block handles it by logging the error.

### Main Code Block

```js
try {
  const { userId } = req.body;
  await User.findByIdAndDelete(userId);
  return res.status(200).json({ message: "User successfully deleted", success: true });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Error deleting user", success: false });
}
```

This code handles the deletion of a user in a MongoDB database.

#### Extracting the User ID

```js
const { userId } = req.body;
```

The `req.body` may look something like this:

```js
req.body = {
  userId: 123,
  name: "John Doe",
  email: "john@example.com",
  // Other properties
};
```

By doing the line of code above, we can directly get `userId`.

#### Deleting the User

```js
await User.findByIdAndDelete(userId);
```

This line of code tackles the functionalities of the `User model` in a database. I will be further explaining this to you in the preceding discussions, but think of it as a function that automatically deletes that specific user using its userId as a parameter.

#### Sending the Response

```js
return res.status(200).json({ message: "User successfully deleted", success: true });
```

- `res` - This indicates that we’re returning a response.
- `.status(200)` - Status code 200 means the operation was successful.
- `.json({ message: "User successfully deleted", success: true })` - Sends a JSON object indicating success.

#### Handling Errors

If an error occurs, the catch block handles it:

```js
catch (error) {
  console.error(error); // Logs the error
  res.status(500).json({ error: "Error deleting user", success: false }); // Sends an error response
}
```

If something goes wrong in the try block, it jumps to the catch block to handle the error.

#### Making the controller

So what is usually the layout of a controller?

It is typically straight to the point. Put all your necessary functions that will handle the logic from the frontend, and you are done!

```js
// Put necessary imports here, probably user-made libraries.

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User successfully deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user", success: false });
  }
};

// ...other necessary functions here...


// Export the functions
export {
    deleteUser
};
```

### Example controller (userController.js)

Here is an example of how we made our userController in our past CS 100 project.

```js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import 'dotenv/config'

const SECRET_KEY = process.env.SECRETKEY;

// FIXME: Update your status codes, especially the use of 401's and 403's
// Register the users (post)
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, middleName, userType, email, password } =
      req.body;

    const doesEmailExist = await User.findOne({ email });
    if (doesEmailExist) {
      // If email already exists, then, we immediately return the response
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      middleName,
      userType,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up", success: false });
  }
};

const deleteUser = async (req, res) => {
  try{
    const {userId} = req.body;
    console.log(req.body);
    await User.findByIdAndDelete(userId);
    return res.status(200).json({message: "User successfully deleted", success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error deleting user", success: false});
  }
}
// Get registered users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
};
  //... and many more...


export {
  registerUser,
  deleteUser,
  loginUser,
  getAllUsers
  //... and many more...
};
```
