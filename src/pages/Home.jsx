import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Botao from '../components/Botao.jsx'
import Cabecalho from '../components/Cabecalho.jsx'
import Rodape from '../components/Rodape/index.jsx'
import Titulo from '../components/Titulo.jsx'
// devo passar o caminho relativo ao arquivo do componente construído a partir do arquivo que estou trabalhando

function Home() {
  const [usuarios, setUsuarios] = useState([])
  const [erro, setErro] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nome, setNome] = useState("")

  useEffect(() => {
    if (nome != "" && nome.length > 3 && !isLoading) {
      setUsuarios(usuarios.filter(usuario => usuario.nome.toLowerCase().includes(nome.toLowerCase())))
    } else if (isLoading || nome.length == 0) {
      axios.get(`http://localhost:3000/usuarios`)
        .then(res => {
          setUsuarios(res.data)
          setIsLoading(false)
        })
        .catch(res => {
          console.log(res.data)
          setErro("Não foi possível carregar a lista de usuários.")
        })
    }
  }, [isLoading, nome]) //Deixe o array vazio caso queira que o código seja executado apenas uma vez durante o ciclo de vida do componente

  function mascararEmail(email) {
    let emailMascarado = email[0]
    let mostrarCaracter = false

    for (let i = 1; i < email.length; i++) {
      if (email[i] == '@') {
        mostrarCaracter = true
      }

      if (!mostrarCaracter) {
        emailMascarado += '*'
      } else {
        emailMascarado += email[i]
      }
    }


    return emailMascarado
  }

  function inativarUsuario(id) {
    // PATCH
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 0 })
      .then(res => {
        console.log(res.data)
        setIsLoading(true) // Força a atualização da lista de usuários
      })
      .catch(res => {
        console.log(res.data)
        setErro("Não foi possível atualizar os dados do usuário.")
      })
  }

  function ativarUsuario(id) {
    // PATCH
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 1 })
      .then(res => {
        console.log(res.data)
        setIsLoading(true) // Força a atualização da lista de usuários
      })
      .catch(res => {
        console.log(res.data)
        setErro("Não foi possível atualizar os dados do usuário.")
      })
  }

  function removerUsuario(id) {
    axios.delete(`http://localhost:3000/usuarios/${id}`)
    
    setIsLoading(true) // Força a atualização da lista de usuários
    setUsuarios([]) // Força a atualização da lista de usuários
  }

  function atualizaNome(event) {
    setNome(event.target.value)
  }

  if (isLoading) {
    // Mostra a mensagem de carregando enquanto atualiza a página
    return (
      <h1>Carregando</h1>
    )
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-3'>
            <label htmlFor="_nome">Nome</label>
            <input type="text" id="_nome" placeholder="Digite para pesquisar" className='form-control' onChange={atualizaNome} value={nome} />
          </div>
          <div className='col'>
            <div className='d-flex align-items-end justify-content-end'>
              <Link to={"/cadastro"} className="btn btn-primary">Novo registro</Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Titulo>Usuários Cadastrados</Titulo>
            {erro && <div className='alert alert-danger'>{erro}</div>}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>Usuário GH</th>
                  <th>E-mail</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map(usuario => {
                    return (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.cargo}</td>
                        <td>{usuario.login}</td>
                        <td>{mascararEmail(usuario.email)}</td>
                        <td>
                          {
                            usuario.ativo == 1 && <Botao tipo="danger" acao={() => inativarUsuario(usuario.id)}>Desativar</Botao>
                          }
                          {
                            usuario.ativo == 0 && <Botao tipo="success" acao={() => ativarUsuario(usuario.id)}>Ativar</Botao>
                          }
                          {
                            <Botao tipo="danger" acao={() => removerUsuario(usuario.id)}>Excluir</Botao>
                          }
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }


}

export default Home