const api = "http://localhost:3001/users";
//const api = "https://jsonplaceholder.typicode.com/users";
export default {
  async getAll() {
    const response = await fetch(api);
    try {
      return await response.json();
    } catch (err) {
      return console.log(`Error trying to get data: ${err}`);
    }
  },
  async post(data) {
    let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };
    const response = await fetch(api, options);
    try {
      return await response.json();
    } catch (err) {
      return console.log(`Error trying to post: ${err}`);
    }
  },
  async delete(id) {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };
    const response = await fetch(api + "/" + id, options);
    try {
      return await response.json();
    } catch (err) {
      return console.log(`Error trying to delete: ${err}`);
    }
  },
  async put(id, data) {
    let options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };
    const response = await fetch(api + "/" + id, options);
    try {
      return await response.json();
    } catch (err) {
      return console.log(`Error trying to update: ${err}`);
    }
  }
};
