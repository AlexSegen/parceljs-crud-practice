import _ from "underscore";
import userServices from "./user.services";

const printText = msg => {
  document.getElementById("app").innerHTML = `<h1>${msg}</h1>`;
};

let users = [];
let user = {};

userServices
  .getAll()
  .then(data => {
    users = data;
    listUsers(
      _.sortBy(users, sort => {
        return sort.id;
      })
    );
  })
  .catch(err => {
    sysAlert(0);
    console.log(`Error trying to fetch data: ${err}`);
  });
const addUser = data => {
  userServices
    .post(data)
    .then(res => {
      data.id = res.id;
      users.push(data);
      listUsers(users);
      sysAlert(1);
      console.log(`User added with Id: ${res.id}`);
    })
    .catch(err => {
      sysAlert(0);
      console.log(`Error trying to add user: ${err}`);
    });
};
const updateUser = (id, data) => {
  data.name = document.getElementById("name").value;
  data.email = document.getElementById("email").value;
  userServices
    .put(id, data)
    .then(response => {
      listUsers(users);
      sysAlert(1);
      console.log(`User with ID ${id} has been updated.`);
    })
    .catch(err => {
      sysAlert(0);
      console.log(`Error trying to update: ${err}`);
    });
};
const deleteUser = (id, index) => {
  userServices
    .delete(id)
    .then(response => {
      users.splice(index, 1);
      listUsers(users);
      sysAlert(1);
      console.log(`User with ID ${id} has been deleted.`);
    })
    .catch(err => {
      sysAlert(0);
      console.log(`Error trying to delete: ${err}`);
    });
};
const listUsers = data => {
  let list = document.querySelector(".--users-list");
  list.innerHTML = "";
  for (let i in data) {
    list.innerHTML += `<li class="--details" ref="${data[i].id}">${
      data[i].name
    } <button class="--delete" ref="${data[i].id}">X</button></li> `;
  }
};

const sysAlert = type => {
  let msg = document.getElementById("--msg");
  switch (type) {
    case 1:
      msg.innerHTML = "Successfull!";
      break;

    case 0:
      msg.innerHTML = "Error. Try again.";
      break;

    default:
      break;
  }

  setTimeout(function() {
    msg.innerHTML = "";
  }, 3000);
};

//Actions
document.getElementById("add").addEventListener("click", () => {
  let user = {
    name: "Alejandro Vivas",
    email: "ale@mail.com"
  };
  addUser(user);
});
document.addEventListener(
  "click",
  function(event) {
    if (event.target.matches(".--delete")) {
      let id = event.target.getAttribute("ref");
      deleteUser(
        id,
        _.findIndex(users, function(user) {
          return user.id == id;
        })
      );
    }
  },
  false
);
document.addEventListener(
  "click",
  function(event) {
    if (event.target.matches(".--cancel")) {
      document.querySelector(".--user-details").innerHTML = "";
    }
  },
  false
);
document.addEventListener(
  "click",
  function(event) {
    let userDetails = document.querySelector(".--user-details");
    if (event.target.matches(".--details")) {
      user = _.find(users, function(user) {
        return user.id == event.target.getAttribute("ref");
      });
      userDetails.innerHTML = `
      <ul>
      <li>ID: ${user.id}</li>
      <li>Name: <input type="text" value="${user.name}" id="name"></li>
      <li>Email: <input type="email" value="${user.email}" id="email"></li>
      <li>
      <button class="--update" ref="${user.id}">Update</button>
      <button class="--cancel">Close</button>
      </li>
      </ul>`;
    }
  },
  false
);

document.addEventListener(
  "click",
  function(event) {
    if (event.target.matches(".--update")) {
      user = _.find(users, function(user) {
        return user.id == event.target.getAttribute("ref");
      });
      updateUser(event.target.getAttribute("ref"), user);
    }
  },
  false
);

listUsers();

printText("Users");