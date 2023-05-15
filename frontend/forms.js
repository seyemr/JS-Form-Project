//sabit değişkenler
const _username = "emrehrmn";
const _password = "onecvlandingapi";

//html tarafından ihtiyaç duyulan elementlerin alınması
const notLogin = document.getElementById("notLogin");
const isLogin = document.getElementById("isLogin");
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

//eventlerin yazılması

loginForm.addEventListener("submit", (event) => {
  //bir fonksiyon return satırına denk gelirse daha fazla ilerlemez
  //ve fonksiyon görevini bitirir
  event.preventDefault();
  if (username.value !== _username || password.value !== _password) {
    alert("Kullanıcı adı ya da şifre yanlış");
    return;
  }
  //alert("giriş başarılı")
  fetch("http://localhost:3004/get-forms", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      pass: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      notLogin.style.display = "none";
      isLogin.style.display = "flex";
      for (let i = 0; i < data.forms.length; i++) {
        const card = document.createElement("div");
        card.classList.add("cardWrapper")
        card.innerHTML = `
                <div class="cardRowWrapper">
                    <span class="cardTitle">Name :</span>
                    <span>${data.forms[i].name}</span>
                </div>
                <div class="cardRowWrapper">
                    <span class="cardTitle">Surname :</span>
                    <span>${data.forms[i].surname}</span>
                </div>
                <div class="cardRowWrapper">
                    <span class="cardTitle">Email</span>
                    <span>${data.forms[i].email}</span>
                </div>
                <div class="cardRowWrapper">
                    <span class="cardTitle">Message</span>
                    <span>${data.forms[i].message}</span>
                </div>
            `;
        isLogin.appendChild(card)
      }
    });
});