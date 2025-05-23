import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <section className="flex items-start justify-center min-h-screen pt-24">
                <div className="flex flex-col items-center max-w-96 mx-auto gap-4 w-full">
                    <h1 className="text-3xl font-bold">Faça seu Login</h1>

                    <form className="flex flex-col gap-2 w-full">
                        <input
                            placeholder="Digite seu e-mail"
                            type="email"
                            className="w-full rounded-full border border-gray-300 px-4 py-2"
                        />
                        <input
                            placeholder="Digite sua senha"
                            type="password"
                            className="w-full rounded-full border border-gray-300 px-4 py-2"
                        />
                        <button
                            className="cursor-pointer bg-primary-400 font-bold text-white w-full rounded-full border border-gray-300 px-4 py-2"
                        >
                            Login
                        </button>
                    </form>

                    <p>
                        Ainda não tem uma conta?{" "}
                        <Link className="underline font-semibold" to="/register">
                            Registre-se aqui!
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Login;
