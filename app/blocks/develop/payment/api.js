class Api {
  constructor(options) {
    this.url = options.url;
  }

  get(path) {
    return fetch(`${this.url}/${path}`)
      .then(this.checkStatus)
      .then(this.showError);
  }

  checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  showError(err) {
    return console.log(err);
  }
}
