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

      <div class="error"></div>

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
      try {
        const user = await login(userName, password);
        localStorage.setItem("token", user.token);
        router.navigate("/");
      } catch (error) {
        localStorage.clear();

        if (error instanceof ReadError) {
          document.querySelector(".error").textContent = error.message;
          document.querySelector(".error").style.color = "red";
        }
      }
    }
  });

  return elem;
};

async function login(name, password) {
  try {
    const response = await fetch(
      `http://localhost:3001/users?name=${name}&password=${password}`
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const user = await response.json();
    if (!user.length) {
      throw new ReadError("Неверное имя пользователя или пароль");
    }

    return user[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

class ReadError extends Error {
  constructor(message) {
    super(message);
    this.name = "ReadError";
  }
}
