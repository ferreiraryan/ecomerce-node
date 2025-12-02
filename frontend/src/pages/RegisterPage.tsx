import React, { useState } from "react";
import { Link } from "react-router-dom"; // <--- Importante para navegação SPA

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors(null);
    setSuccess(null);
  }

  function validate() {
    if (!formData.name.trim()) return "Nome é obrigatório.";
    if (!formData.email.trim()) return "E-mail é obrigatório.";
    if (!formData.email.includes("@")) return "E-mail inválido.";
    if (formData.password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    if (formData.password !== formData.confirmPassword) return "As senhas não coincidem.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.message || data?.error || "Erro ao registrar. Tente novamente.";
        setErrors(message);
        return;
      }

      setSuccess("Conta criada com sucesso! Você já pode fazer login.");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setErrors("Erro de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-700 rounded-2xl shadow-lg p-8">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-50 mb-2">Criar conta</h1>
          <p className="text-sm text-slate-400">Cadastre-se para começar a comprar na loja.</p>
        </div>

        {errors && (
          <div className="mb-4 rounded-md bg-red-900/40 border border-red-500 px-3 py-2 text-sm text-red-200 text-center">
            {errors}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-emerald-900/40 border border-emerald-500 px-3 py-2 text-sm text-emerald-200 text-center">
            {success}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-1">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-1">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-1">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-1">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
              placeholder="Repita a senha"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-500/20"
          >
            {isSubmitting ? "Criando conta..." : "Registrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
