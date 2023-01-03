import { useState } from "react";
import "./index.css";
import { login } from './utils';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - ✅ O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - ✅ Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos. 
// todo - ✅ Desabilite o botão de Login equanto você está executando o login.
// todo - ✅ Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - ✅ Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function resetForm() {
    setData({
      email: "",
      password: "",
    });
  }

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await login({ email: data.email, password: data.password});
      alert("Login efetuado com sucesso!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      resetForm()
    }
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && 
        <div className="errorMessage">
        {<p>{error}</p>}
      </div>
        }
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            autoComplete="off"
            value={data.email}
            onChange={(event) => {
              setData({ ...data, email: event.target.value });
            }}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            value={data.password}
            onChange={(event) => {
              setData({ ...data, password: event.target.value });
            }}
          />
        </div>

        <div className="button">
          <button
            onClick={() => handleSubmit(data)}
            // type="submit"
            disabled={!data.email || data.password.length < 6 || !data.password || loading}
          >

            Loginn
          </button>
        </div>
      </div>
    </div>
  );
}
