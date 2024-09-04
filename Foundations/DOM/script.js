const container = document.getElementById("container");
const red = document.createElement("p");
red.style.color = "red";
red.textContent = "Hey I'm red!";

const blue = document.createElement("h3");
blue.style.color = "blue";
blue.textContent = "I'm a blue h3!";

container.appendChild(red);
container.appendChild(blue);

const button = document.getElementById("myButton");
button.addEventListener("click", function (e) {
  console.log(e);
  e.target.style.backgroundColor = "black";
});
