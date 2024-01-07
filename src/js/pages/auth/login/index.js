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

  loginBtn.addEventListener("click", (event) => {
    const form = elem.querySelector(".log-in-form");

    const formData = new FormData(form);

    const userName = formData.get("username");
    const password = formData.get("password");

    if (userName && password) {
      const usersJSON = localStorage.getItem("users");

      if (usersJSON) {
        const users = JSON.parse(usersJSON);

        const foundUser = users.find(
          (user) => user.userName == userName && user.password == password
        );
        if (foundUser) {
          sessionStorage.setItem("auth", "true");
        } else {
          sessionStorage.clear();
        }
      }
    } else {
      event.preventDefault();
    }
  });

  return elem;
};
