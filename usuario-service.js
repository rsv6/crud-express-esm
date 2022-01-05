
class UsuarioService {
  constructor() {
    this.usuarios = []

  }

  adicionar(usuario) {
    this.usuarios.push(usuario)
  }

  excluir(email) {
    // localizar no array por indice:
    // let idx = this.usuarios.findIndex(u => u.email == email)
    // this.usuarios.splice(idx, 1)

    // splice: 
    this.usuarios.splice(this.usuarios.findIndex(u => u.email == email), 1)
  }

  alterar(usuario) {
    this.usuarios.forEach(u => {
      if (u.email == usuario.email) {
        u.senha = usuario.senha ? usuario.senha : u.senha
        u.nome = usuario.nome ? usuario.nome : u.nome
        // return
      }
    })
  }

  buscar(usuario) {

  }

  buscarTodos() {
    return this.usuarios
  }
}

module.exports = UsuarioService