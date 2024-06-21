import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Cadastro() {
    const navigate = useNavigate()
    const [erros, setErros] = useState({})
    const [usuario, setUsuario] = useState({
        nome: "",
        tipo: ""
    })
    const [darkMode, setDarkMode] = useState(false)

    function handleNome(event) {
        const { value } = event.target
        let nomeInvalido = false

        if (value.length < 3) {
            nomeInvalido = true
        }

        if (!value.trim().includes(" ")) {
            nomeInvalido = true
        }

        if (nomeInvalido) {
            setErros({
                ...erros,
                nome: "Digite o nome completo do usuário"
            })
        } else {
            setErros({
                ...erros,
                nome: undefined
            })
        }

        setUsuario({
            ...usuario,
            nome: value
        })
    }

    function handleLogin(event) {
        const { value } = event.target

        setUsuario({
            ...usuario,
            login: value
        })
    }

    function handleEmail(event) {
        const { value } = event.target
        let nomeInvalido = false

        if (value.length < 3) {
            nomeInvalido = true
        }

        if (!value.includes("@")) {
            nomeInvalido = true
        }

        if (nomeInvalido) {
            setErros({
                ...erros,
                email: "Digite o e-mail completo do usuário"
            })
        } else {
            setErros({
                ...erros,
                email: undefined
            })
        }

        setUsuario({
            ...usuario,
            email: value
        })
    }

    function handleTipo(event) {
        const { value } = event.target

        setUsuario({
            ...usuario,
            tipo: value
        })
    }

    function handleTelefone(event) {
        const { value } = event.target

        let telefoneInvalido = false

        if (value.length > 15 || value.length < 14) {
            telefoneInvalido = true
        }

        if (!value.includes("(") || !value.includes(")") || !value.includes("-") || !value.includes(" ")) {
            telefoneInvalido = true
        }

        if (telefoneInvalido) {
            setErros({
                ...erros,
                telefone: "Insira o telefone no padrão (99) 99999-9999"
            })
        } else {
            setErros({
                ...erros,
                telefone: undefined
            })
        }

        setUsuario({
            ...usuario, telefone: value
        })
    }

    function submitForm(event) {
        event.preventDefault()
        usuario.ativo = 1
        usuario.cargo = usuario.tipo

        // Criar validações aqui
        // Nome => Mais de 03 caracteres e completo
        // Login => Não pode estar vazio
        // Email => Precisa ter @
        // Tipo => Não pode ser vazio
        // Telefone => Precisa estar no formato (99) 99999-9999

        // Executar a requisição apenas se estiver válido
        axios.post('http://localhost:3000/usuarios', usuario)
            .then(res => {
                alert("Salvo com sucesso!")
                navigate("/")
            }).catch(res => {
                alert("Erro ao salvar usuário")
                // Colocar erro no estado e mostrar em tela
            })
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className={`container ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ minHeight: '100vh' }}>
            <div className="row">
                <div className="col">
                    <h1>Página de cadastro de usuários</h1>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="darkModeSwitch" checked={darkMode} onChange={toggleDarkMode} />
                        <label className="form-check-label" htmlFor="darkModeSwitch">Dark Mode</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={submitForm}>
                        <div className="row my-3">
                            <div className="col">
                                <label htmlFor="_nome">Nome</label>
                                <input type="text" id="_nome" value={usuario.nome} className="form-control" onChange={handleNome} />
                                {
                                    erros.nome && <span className="text-danger">{erros.nome}</span>
                                }
                            </div>

                            <div className="col">
                                <label htmlFor="_login">Login</label>
                                <input type="text" id="_login" value={usuario.login} className="form-control" onChange={handleLogin} />
                                {
                                    erros.login && <span className="text-danger">{erros.login}</span>
                                }
                            </div>

                            <div className="col">
                                <label htmlFor="_email">E-mail</label>
                                <input type="text" id="_email" value={usuario.email} className="form-control" onChange={handleEmail} />
                                {
                                    erros.email && <span className="text-danger">{erros.email}</span>
                                }
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col">
                                <label htmlFor="_tipo">Tipo</label>
                                <select className="form-select" id="_tipo" onChange={handleTipo} value={usuario.tipo}>
                                    <option value="" disabled>Selecione</option>
                                    <option value="Aluno">Aluno</option>
                                    <option value="Funcionário">Funcionário</option>
                                    <option value="Professor">Professor</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="_telefone">Telefone</label>
                                <input type="text" id="_telefone" value={usuario.telefone} className="form-control" onChange={handleTelefone} />
                                {
                                    erros.telefone && <span className="text-danger">{erros.telefone}</span>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button type="submit" className="btn btn-secondary">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cadastro
