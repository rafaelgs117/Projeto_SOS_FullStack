# Projeto SOS Emergência — Front-end para VS Code

Este projeto foi montado a partir da análise do APK `app-debug(1).apk` e dos requisitos da AV1 de Programação III.

## O que foi identificado no APK
- Aplicativo `com.emergency.app`.
- Tela principal de emergência com ação SOS.
- Cadastro de usuário.
- Cadastro de contatos de emergência (até 5).
- Configurações/tema, incluindo modo escuro e daltonismo.
- Widget SOS.
- Ações relacionadas a localização e reconhecimento de voz.
- Mensagens de confirmação antes de enviar o SOS.

O projeto web não tenta reproduzir a implementação Android. Ele recria a ideia e o fluxo como um front-end funcional.

## Requisitos da AV1 contemplados
- React + Vite
- 3+ componentes reutilizáveis
- useState
- map() com key
- React Router com 4 rotas e Link
- SCSS com variáveis, nesting e mixin
- Flexbox e Box Model
- mobile-first + 2 media queries
- JavaScript com arrays, objetos, funções, condicionais e eventos
- Axios + useEffect + API pública
- página institucional em Next.js + Tailwind
- testes com Vitest/React Testing Library

O PDF informa que a etapa é 100% front-end e que os dados devem vir de APIs públicas; back-end próprio fica para o Módulo 2. fileciteturn0file0L15-L18

## Como executar

### React
```bash
cd react-app
npm install
npm run dev
```

### Next.js
Em outro terminal:
```bash
cd next-app
npm install
npm run dev
```

### Testes
```bash
cd react-app
npm test
```

> Observação: o botão SOS é uma simulação de front-end. Ele não envia mensagens reais nem acessa localização real.


## Aula 05 — conferência dos requisitos

- **Axios + GET + useState + useEffect + map:** `react-app/src/pages/Home.jsx`
- **Next.js + Tailwind:** `next-app/app/page.jsx`
- **Responsividade `sm/md/lg`:** `next-app/app/page.jsx`
- **Teste 1:** `react-app/src/test/Card.test.jsx`
- **Teste 2:** `react-app/src/test/SosButton.test.jsx`
- **Configuração de testes:** `react-app/src/test/setup.js` usa `@testing-library/jest-dom/vitest`
- **Deploy React/Vite:** `react-app/vercel.json` + instruções em `react-app/README.md`
- **Deploy Next.js:** instruções em `next-app/README.md`

### Deploy

São dois projetos independentes na Vercel: um apontando para `react-app` e outro para `next-app`. Os links públicos são gerados pela Vercel depois que cada projeto for publicado.
