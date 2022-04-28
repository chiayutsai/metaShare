class GlobalState {
  update = (key, value) => {
    this[key] = value

    this.#setHtmlDataAttr(key, value)
  }

  #setHtmlDataAttr = (key, value = '') => {
    document.querySelector('html').dataset[key] = value
  }
}

export default new GlobalState()
