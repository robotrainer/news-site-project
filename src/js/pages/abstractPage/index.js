class AbstractPage {
  constructor() {}

  setTitle(title) {
    document.title = title;
  }

  createPage() {
    this.setTitle("Abstract page");

    const elem = document.createElement("div");
    elem.classList.add("abstract-page");

    return elem;
  }
}

export default AbstractPage;
