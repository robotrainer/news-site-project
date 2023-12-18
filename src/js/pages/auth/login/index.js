export const Login = () => {
  const elem = document.createElement("div");
  elem.classList.add("log-in");

  const loginTPL = `
    <form>
      <input id="username" type="text" placeholder="Введите имя"/>
      <input id="password" type="password" placeholder="Введите пароль"/>

      <a href="/">Log In</a>
    </form>
  `;

  elem.insertAdjacentHTML("afterbegin", loginTPL);

  return elem;
}