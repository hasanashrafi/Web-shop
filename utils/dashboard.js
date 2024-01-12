import { authHandler } from "./authorization.js"
import { getData } from "./httpReq.js"

const mainContent = document.getElementById("container");
const logOutButton = document.querySelector("button")
const renderUsers = (users) => {
   mainContent.innerHTML = ""
   users.forEach(user => {
      const JSX = `
      <div id="card">
            <h3>${user.id}</h3>
            <div>
               <p><i class="fa fa-user" aria-hidden="true"></i> Name:</p>
               <span>${user.name.firstname} ${user.name.lastname}</span>
            </div>
            <div>
               <p><i class="fa fa-paperclip" aria-hidden="true"></i> Username:</p>
               <span>${user.username}</span>
            </div>
            <div>
               <p><i class="fas fa-envelope"></i> Email:</p>
               <span>${user.email} </span>
            </div>
            <div>
               <p><i class="fa fa-phone" aria-hidden="true"></i> Phone:</p>
               <span>${user.phone}</span>
            </div>
             <div>
               <p><i class="fa fa-address-card" aria-hidden="true"></i> Address:</p>
               <span>${user.address.city}-${user.address.street}-${user.address.zipcode}</span>
            </div>
      </div>
      `
      mainContent.innerHTML += JSX
   });

}

const init = async () => {
   authHandler()
   const users = await getData("users");
   renderUsers(users)

}
const logOutHandler = () => {
   document.cookie = "token=; max-age=0";
   location.assign("index.html")

}

document.addEventListener("DOMContentLoaded", init)
logOutButton.addEventListener("click", logOutHandler)