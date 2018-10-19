import moment from "moment";

class User {
  constructor(
    isActive,
    balance,
    picture,
    age,
    first_name,
    last_name,
    company,
    email,
    phone,
    address,
    about
  ) {
    this.isActive = isActive || false;
    this.balance = balance || "$0";
    this.picture = picture || "http://placehold.it/32x32";
    this.age = age || 18;
    this.first_name = first_name || "";
    this.last_name = last_name || "";
    this.company = company || "";
    this.email = email || "";
    this.phone = phone || "";
    this.address = address || "";
    this.about = about || "";
    this.registered = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a");
  }
}

export { User };
