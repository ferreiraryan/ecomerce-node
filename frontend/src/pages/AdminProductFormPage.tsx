import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { api } from '../services/api';

export function AdminProductForm() {
  const { id } = useParams(); // Se tiver ID, é edição
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  async function loadProduct() {
    try {
      const response = await api.get(`/products/${id}`);
      const p = response.data;
      setFormData({
        name: p.name,
        description: p.description,
        price: p.price.toString(),
        stock: p.stock.toString(),
        imageUrl: p.imageUrl || ''
      });
    } catch (error) {
      alert('Erro ao carregar produto.');
      navigate('/admin');
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    try {
      if (isEditing) {
        await api.put(`/products/${id}`, payload);
        alert('Produto atualizado!');
      } else {
        await api.post('/products', payload);
        alert('Produto criado!');
      }
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar produto.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-600 transition-all";
  const labelClass = "block text-sm font-medium text-slate-300 mb-2";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-3xl mx-auto">

        <Link to="/admin" className="inline-flex items-center text-slate-400 hover:text-emerald-400 mb-6 transition-colors gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Painel
        </Link>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
          <h1 className="text-2xl font-bold text-slate-50 mb-8 flex items-center gap-2">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className={labelClass}>Nome do Produto</label>
              <input
                required
                className={inputClass}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass}>Descrição</label>
              <textarea
                required
                rows={4}
                className={inputClass}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className={inputClass}
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>Quantidade em Estoque</label>
                <input
                  type="number"
                  required
                  className={inputClass}
                  value={formData.stock}
                  onChange={e => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>URL da Imagem</label>
              <input
                type="url"
                placeholder="https://..."
                className={inputClass}
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              <p className="text-xs text-slate-500 mt-2">
                Dica: Use URLs do Unsplash ou placehold.co para teste.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
