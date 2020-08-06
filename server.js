const express = require("express");
const db = require("./database");
const cors = require("cors");
// const shortid = require("shortid");
const { updateUser } = require("./database");

const server = express();
server.use(express.json());
server.use(cors())

// HOME
server.get("/", (req, res) => {
  res.json({ message: "WELCOME" });
});

// GET USERS /api/users  *Returns an array users
server.get("/api/users", (req, res) => {
    const users = db.getUsers();
    res.json(users); // send it back
//       .status(500)
//       .json({ message: "The users information could not be retrieved." });
//   }
});



// GET USERS BY ID /api/users/:id   *Returns the user object with the specified id
server.get("/api/users/:id", (req, res) => {

    try{
    // the param variable matches up to the name of our URL param abouve
    const id = req.params.id;
    // get a specific user by their ID from the "fake" database
    const user = db.getUserById(id);
  
    if (user) {
      res.json(user);
      // make sure the system doesn't break if someone calls the endpoint with
      // a user ID that doesn't exist in the database
      res.status(204).end();
    } else {
      res.status(404).json({ errorMessage: "The user with the specified ID does not exist."  });
    } 

    }
    catch {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."});
    }
  });

// POST USERS /api/users  *Creates a user using the information sent inside the request body
server.post("/api/users", (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      return res.status(400).json({
        errorMessage: "Please provide name and bio for the user.",
      });
    } else {
      const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.name,
      });

      //status code 201 when we create successfully
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500)({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

// PUT USERS /api/users/:id  * Updates the user with the specified id using data from the request body. Returns the modified user
server.put("/api/users/:id", (req, res) => {
  try {
    const user = db.getUserById(req.params.id);
    if (user) {
      if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
          errorMessage: "Please provide name and bio for the user.",
        });
      } else {
        const userUpdate = db.updateUser({
          name: req.body.name,
          bio: req.body.name,
        });
        res.status(200).json(updateUser);
      }
    } else {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist.",
      });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "The user information could not be modified.",
    });
  }
});

// DELETE USERS /api/users/:id * Removes the user with the specified id and returns the deleted user
server.delete("/api/users/:id", (req, res) => {
  try {
    const user = db.getUserById(req.params.id);

    if (user) {
      db.deleteUser(req.params.id);
      // since we have nothing to return back to the client, send a 204 with an empty response
      // 204 just means "success but we have nothing to return"
      res.status(204).end();
    } else {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist.",
      });
    }
  } catch {
    res.status(500).json({
      errorMessage: "The user could not be removed.",
    });
  }
});

server.listen(5050, () => {
    console.log("Server started on port 5050");
  });
  
