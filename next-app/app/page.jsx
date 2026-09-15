export default function Page() {
  const cards = [
    {
      title: 'Acionamento SOS',
      text: 'Interface para simular um pedido de emergência.',
      button: 'Conhecer Vercel',
      link: 'https://vercel.com/'
    },
    {
      title: 'Contatos',
      text: 'Cadastro e gerenciamento de até cinco contatos.',
      button: 'Ver exemplo de dados',
      link: 'https://jsonplaceholder.typicode.com/users'
    },
    {
      title: 'Acessibilidade',
      text: 'Tema escuro e recursos visuais de acessibilidade.',
      button: 'Acessibilidade na web',
      link: 'https://www.w3.org/WAI/'
    },
    {
      title: 'Tecnologias',
      text: 'React, Vite, SCSS, Axios e React Router.',
      button: 'Documentação React',
      link: 'https://react.dev/'
    },
    {
      title: 'API pública',
      text: 'Exemplo de consumo de dados externos com Axios.',
      button: 'Abrir API',
      link: 'https://jsonplaceholder.typicode.com/users?_limit=3'
    },
    {
      title: 'Evolução',
      text: 'Estrutura pronta para integração com back-end no próximo módulo.',
      button: 'Documentação Next.js',
      link: 'https://nextjs.org/docs'
    }
  ];

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 md:px-12 lg:px-20">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="bg-red-700 px-6 py-12 text-white sm:px-10 md:px-16">
          <p className="text-xs font-bold tracking-[.2em] opacity-80">PROJETO ACADÊMICO</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">SOS Emergência</h1>
          <p className="mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Uma interface web inspirada em um aplicativo de emergência, desenvolvida para demonstrar os conceitos de Front-end Full Stack.
          </p>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2 md:p-10 lg:grid-cols-3">
          {cards.map(({ title, text, button, link }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-lg font-extrabold">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{text}</p>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-red-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                {button} →
              </a>
            </article>
          ))}
        </div>

        <footer className="border-t border-slate-200 px-6 py-6 text-center text-sm text-slate-500">
          Front-end acadêmico • 2026
        </footer>
      </section>
    </main>
  );
}
