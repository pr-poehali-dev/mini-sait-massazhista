import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/ac8bdc5e-f7ca-4434-866b-0c2f64b4b59d/files/6970e980-998f-4f0a-ae27-895b52721e33.jpg';
const ABOUT_IMG = 'https://cdn.poehali.dev/projects/ac8bdc5e-f7ca-4434-866b-0c2f64b4b59d/files/41af24e2-3236-41a6-a998-a40f6d7a98cd.jpg';

const nav = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'Обо мне' },
  { id: 'services', label: 'Услуги' },
  { id: 'prices', label: 'Прайс' },
  { id: 'contacts', label: 'Контакты' },
];

const services = [
  { icon: 'Flower2', title: 'Расслабляющий массаж', text: 'Мягкие плавные движения для глубокого отдыха и спокойствия ума.' },
  { icon: 'Sparkles', title: 'Антицеллюлитный', text: 'Интенсивная проработка для тонуса кожи и стройности силуэта.' },
  { icon: 'Wind', title: 'Спортивный массаж', text: 'Восстановление мышц после нагрузок и профилактика травм.' },
  { icon: 'Droplets', title: 'Лимфодренажный', text: 'Выводит лишнюю жидкость, снимает отёчность и усталость.' },
  { icon: 'Hand', title: 'Массаж лица', text: 'Естественное омоложение, сияние кожи и расслабление мимики.' },
];

const prices = [
  { name: 'Расслабляющий массаж', time: '30 мин', price: '25 руб.' },
  { name: 'Расслабляющий массаж', time: '60 мин', price: '50 руб.' },
  { name: 'Расслабляющий массаж', time: '90 мин', price: '70 руб.' },
  { name: 'Антицеллюлитный', time: '60 мин', price: '60 руб.' },
  { name: 'Антицеллюлитный с обёртыванием', time: '60 мин', price: '110 руб.' },
  { name: 'Спортивный массаж', time: '60 мин', price: '3 000 BYN' },
  { name: 'Лимфодренажный', time: '75 мин', price: '3 000 BYN' },
  { name: 'Массаж лица', time: '45 мин', price: '2 000 BYN' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="font-display text-2xl font-semibold tracking-wide text-primary">
            Alexandr_by_massage
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <button className="md:hidden text-primary" onClick={() => setMenuOpen((v) => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full text-left px-6 py-3 text-muted-foreground hover:bg-muted">
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-16 min-h-screen flex items-center">
        <div className="container grid md:grid-cols-2 gap-12 items-center py-16">
          <div className="animate-fade-up">
            <p className="uppercase tracking-[0.3em] text-xs text-primary/70 mb-6">Студия здоровья и спокойствия</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-primary mb-6">
              Прикосновение,<br />которое лечит
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-10">
              Профессиональный массаж в атмосфере тишины и заботы. Верните телу гармонию, а мыслям — лёгкость.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('contacts')} className="rounded-full px-8">
                Записаться
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('services')} className="rounded-full px-8 border-primary/30">
                Услуги
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-accent/40 rounded-[2rem] rotate-3" />
            <img src={HERO_IMG} alt="Массажный кабинет" className="relative rounded-[2rem] shadow-xl object-cover w-full h-[420px] md:h-[520px]" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-secondary/40">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] -rotate-3" />
            <img src={ABOUT_IMG} alt="Руки массажиста" className="relative rounded-[2rem] shadow-lg object-cover w-full h-[420px]" />
          </div>
          <div className="order-1 md:order-2">
            <p className="uppercase tracking-[0.3em] text-xs text-primary/70 mb-4">Обо мне</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary mb-6">Александр Неволин</h2>
            <p className="text-muted-foreground text-lg mb-5 text-justify">
              Дипломированный массажист с опытом более 20 лет. Убеждён — настоящее здоровье начинается с расслабления и внимания к телу.
            </p>
            <p className="text-muted-foreground text-lg mb-8 text-justify">
              В работе использую натуральные масла и индивидуальный подход к каждому клиенту.<br />Моя цель — чтобы после сеанса вы чувствовали себя обновлённым.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { n: '20+', t: 'лет опыта' },
                { n: '★★★★★', t: 'отзывы клиентов' },
                { n: '♻', t: 'постоянные клиенты' },
              ].map((s) => (
                <div key={s.t}>
                  <div className="font-display text-4xl text-primary">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-primary/70 mb-4">Услуги</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary">Что я предлагаю</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-accent/40 flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl text-primary mb-3">{s.title}</h3>
                <p className="text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-secondary/40">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-primary/70 mb-4">Прайс</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary">Стоимость сеансов</h2>
          </div>
          <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
            {prices.map((p) => (
              <div key={p.name} className="flex items-center justify-between px-6 py-5 hover:bg-muted/50 transition-colors">
                <div>
                  <div className="font-medium text-foreground">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.time}</div>
                </div>
                <div className="font-display text-2xl text-primary">{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24">
        <div className="container max-w-3xl text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-primary/70 mb-4">Контакты</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-6">Запишитесь на сеанс</h2>
          <p className="text-muted-foreground text-lg mb-10">
            Свяжитесь со мной удобным способом — помогу подобрать подходящую программу.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: 'Phone', label: '+375 (25) 626-39-18', sub: 'Звонок и WhatsApp', href: 'tel:+375256263918' },
              { icon: 'MapPin', label: 'г. Речица, ул. Советская, д. 106', sub: 'Уютный кабинет', href: undefined },
              { icon: 'Clock', label: 'Пн–Вс · 9:00–21:00', sub: 'По записи', href: undefined },
            ].map((c) => {
              const Wrapper = c.href ? 'a' : 'div';
              return (
                <Wrapper
                  key={c.label}
                  {...(c.href ? { href: c.href } : {})}
                  className={`bg-card border border-border rounded-2xl p-6 block ${c.href ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}`}
                >
                  <div className="w-11 h-11 rounded-full bg-accent/40 flex items-center justify-center mx-auto mb-4">
                    <Icon name={c.icon} size={20} className="text-primary" />
                  </div>
                  <div className="font-medium text-foreground">{c.label}</div>
                  <div className="text-sm text-muted-foreground">{c.sub}</div>
                </Wrapper>
              );
            })}
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild className="rounded-full px-8">
              <a href="https://t.me/Athyu2" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={18} className="mr-2" /> Написать в Telegram
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-primary/30">
              <a href="tel:+375256263918">
                <Icon name="Phone" size={18} className="mr-2" /> Позвонить
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-border bg-secondary/40">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display text-lg text-primary">Alexandr_by_massage</span>
          <span>© 2026 · Студия здоровья и спокойствия</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;