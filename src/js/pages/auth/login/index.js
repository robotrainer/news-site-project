import router from "../../../submodules/spa-router/index.js";

export const Login = () => {
  const elem = document.createElement("div");
  elem.classList.add("log-in");

  const loginTPL = `
    <form class="log-in-form">
      <div class="form-field">
        <label for="username">Имя пользователя</label>
        <input type="text" name="username" id="username" autocomplete="off">
      </div>

      <div class="form-field">
        <label for="password">Пароль</label>
        <input type="password" name="password" id="password" autocomplete="off">
      </div>

      <a class="log-in-btn" href="/">Войти</a>
      <a class="sign-up-btn" href="/sign-up">Зарегистрироваться</a>
    </form>
  `;

  elem.insertAdjacentHTML("afterbegin", loginTPL);

  const loginBtn = elem.querySelector(".log-in-btn");

  loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const form = elem.querySelector(".log-in-form");

    const formData = new FormData(form);

    const userName = formData.get("username");
    const password = formData.get("password");

    if (userName && password) {
      const user = await login(userName, password);

      if (user) {
        localStorage.setItem("token", user.token);
        router.navigate("/");
      } else {
        localStorage.clear();
      }
    }
  });

  return elem;
};

async function login(name, password) {
  const response = await fetch(
    `http://localhost:3001/users?name=${name}&password=${password}`
  );
  const user = await response.json();
  return user ? user[0] : undefined;
}
