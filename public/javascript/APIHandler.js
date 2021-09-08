class APIHandler {

  constructor(baseUrl) {
    this.BASE_URL = baseUrl;

    this.app = axios.create({
      baseURL: this.BASE_URL
    })

  }

  getFullList() {
    return this.app.get('/characters')
  }

  getOneRegister(id) {
    return this.app.get(`/characters/${id}`)
  }

  createOneRegister(minion) {
    return this.app.post('/characters', minion)
  }

  updateOneRegister(id) {
    return this.app.get(`/characters/${id}`)
  }

  deleteOneRegister(id) {
    return this.app.delete(`/characters/${id}`)
  }
}
