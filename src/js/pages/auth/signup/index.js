export const Signup = () => {
  const elem = document.createElement("div");
  elem.classList.add("sign-up");

  const signupTPL = `
    <form class="sign-up-form">
      <div class="form-field">
        <label for="username">Имя пользователя</label>
        <input type="text" name="username" id="username" autocomplete="off">
      </div>

      <div class="form-field">
        <label for="password">Пароль</label>
        <input type="password" name="password" id="password" autocomplete="off">
      </div>

      <div class="form-field">
        <label for="confirm-password">Подверждение пароля</label>
        <input type="password" name="confirm-password" id="confirm-password" autocomplete="off">
      </div>

      <a class="sign-up-btn" href="/log-in">Зарегистрироваться</a>
    </form>
  `;

  elem.insertAdjacentHTML("afterbegin", signupTPL);

  const signupBtn = elem.querySelector(".sign-up-btn");

  signupBtn.addEventListener("click", (event) => {
    const form = elem.querySelector(".sign-up-form");

    const formData = new FormData(form);

    const userName = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (userName && password && confirmPassword) {
      const usersJSON = localStorage.getItem("users");

      if (usersJSON) {
        const users = JSON.parse(usersJSON);

        users.push({
          id: Date.now(),
          userName,
          password,
        });

        localStorage.setItem("users", JSON.stringify(users));
      }
    } else {
      event.preventDefault();
    }
  });

  return elem;
};
