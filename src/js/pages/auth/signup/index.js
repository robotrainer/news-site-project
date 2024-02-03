import router from "../../../submodules/spa-router/index.js";

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

      <div class="error"></div>

      <a class="sign-up-btn" href="">Зарегистрироваться</a>
    </form>
  `;

  elem.insertAdjacentHTML("afterbegin", signupTPL);

  const signupBtn = elem.querySelector(".sign-up-btn");

  signupBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const form = elem.querySelector(".sign-up-form");

    const formData = new FormData(form);

    const userName = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (userName && password && confirmPassword) {
      const nowMS = Math.ceil(Date.now() / 1000);

      const createToken = () => {
        return Math.random().toString(36).substring(2);
      };

      const sendUser = {
        id: nowMS,
        wp: nowMS,
        name: userName,
        password: password,
        token: createToken(),
        photo: {
          original: "https://media.tproger.ru/user-uploads/78336/avatar.png",
          alt: `Аватарка пользователя ${userName}`,
        },
      };

      try {
        await checkUniqUser(sendUser.name);
      } catch (error) {
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.color = "red";
        return;
      }

      try {
        await signup(sendUser);

        router.navigate("/log-in");
      } catch (error) {
        console.log(error.message);
      }
    }
  });

  return elem;
};

async function checkUniqUser(name) {
  try {
    const response = await fetch(`http://localhost:3001/users?name=${name}`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const users = await response.json();
    if (users.length) {
      throw new Error("Пользователь с таким именем уже существует");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function signup(sendUser) {
  try {
    const response = await fetch(`http://localhost:3001/user`, {
      method: "POST",
      body: JSON.stringify(sendUser),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
