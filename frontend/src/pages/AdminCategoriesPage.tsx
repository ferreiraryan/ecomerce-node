import { Trash2, Plus, Tag } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../services/api';

interface Category {
  id: string;
  name: string;
  _count?: { products: number };
}

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const res = await api.get('/categories');
    setCategories(res.data);
  }

  async function handleAddCategory(e: FormEvent) {
    e.preventDefault();
    if (!newName) return;
    setLoading(true);
    try {
      await api.post('/categories', { name: newName });
      setNewName('');
      loadCategories();
    } catch (error) {
      alert('Erro ao criar categoria.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza? Isso pode afetar produtos dessa categoria.')) return;
    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (error) {
      alert('Erro ao excluir.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-50 mb-8 flex items-center gap-2">
          <Tag className="text-emerald-400" />
          Gerenciar Categorias
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit">
            <h2 className="text-xl font-bold mb-4">Nova Categoria</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Nome</label>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Ex: Smartphones"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                disabled={loading || !newName}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            {categories.map(cat => (
              <div key={cat.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-emerald-500/50 transition">
                <div>
                  <h3 className="font-bold text-lg text-slate-200">{cat.name}</h3>
                  <p className="text-xs text-slate-500">{cat._count?.products || 0} produtos</p>
                </div>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {categories.length === 0 && (
              <p className="text-slate-500 text-center py-8">Nenhuma categoria cadastrada.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
