import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const API = 'https://functions.poehali.dev/8bf22f20-15fa-4336-b6e9-cb34adf8cc18';

interface PriceRow {
  id?: number;
  group_name: string;
  time_label: string;
  price: string;
  sort_order: number;
}

const Admin = () => {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [items, setItems] = useState<PriceRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [storedPassword, setStoredPassword] = useState('');

  const login = async () => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
      body: JSON.stringify({ items: [] }),
    });
    if (res.status === 401) {
      setAuthError('Неверный пароль');
      return;
    }
    setStoredPassword(password);
    setAuthed(true);
    loadPrices();
  };

  const loadPrices = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    if (authed) loadPrices();
  }, [authed]);

  const update = (index: number, field: keyof PriceRow, value: string) => {
    setItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const addRow = () => {
    setItems((prev) => [...prev, { group_name: '', time_label: '', price: '', sort_order: prev.length }]);
  };

  const removeRow = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const save = async () => {
    setSaving(true);
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': storedPassword },
      body: JSON.stringify({ items }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h1 className="font-display text-2xl text-primary mb-2">Админ-панель</h1>
          <p className="text-muted-foreground text-sm mb-6">Введите пароль для входа</p>
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="mb-3"
          />
          {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}
          <Button className="w-full rounded-full" onClick={login}>Войти</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-primary">Управление ценами</h1>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" size={16} className="mr-1" /> На сайт
          </Button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-0">
            <div className="px-4 py-3 text-xs font-medium text-muted-foreground bg-muted/60 border-b border-border">Услуга</div>
            <div className="px-4 py-3 text-xs font-medium text-muted-foreground bg-muted/60 border-b border-border">Время</div>
            <div className="px-4 py-3 text-xs font-medium text-muted-foreground bg-muted/60 border-b border-border">Цена</div>
            <div className="px-4 py-3 bg-muted/60 border-b border-border" />
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-0 border-b border-border last:border-0">
              <div className="p-2 border-r border-border">
                <Input value={item.group_name} onChange={(e) => update(i, 'group_name', e.target.value)} className="border-0 shadow-none focus-visible:ring-0 text-sm" placeholder="Название" />
              </div>
              <div className="p-2 border-r border-border">
                <Input value={item.time_label} onChange={(e) => update(i, 'time_label', e.target.value)} className="border-0 shadow-none focus-visible:ring-0 text-sm" placeholder="60 мин" />
              </div>
              <div className="p-2 border-r border-border">
                <Input value={item.price} onChange={(e) => update(i, 'price', e.target.value)} className="border-0 shadow-none focus-visible:ring-0 text-sm" placeholder="50 руб." />
              </div>
              <div className="p-2 flex items-center justify-center">
                <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-red-500 transition-colors">
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full" onClick={addRow}>
            <Icon name="Plus" size={16} className="mr-1" /> Добавить строку
          </Button>
          <Button className="rounded-full px-8" onClick={save} disabled={saving}>
            {saving ? 'Сохранение...' : saved ? '✓ Сохранено' : 'Сохранить'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
