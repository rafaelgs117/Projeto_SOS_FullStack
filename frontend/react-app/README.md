# SOS Emergência — React/Vite

## Executar localmente

```bash
npm install
npm run dev
```

## Testes

```bash
npm test
```

Os testes utilizam **Vitest + React Testing Library + jest-dom/vitest**.

Arquivos de teste:
- `src/test/Card.test.jsx`
- `src/test/SosButton.test.jsx`

## Build

```bash
npm run build
```

## Deploy na Vercel

Este projeto está preparado para Vercel. O arquivo `vercel.json` mantém o React Router funcionando quando uma rota é acessada diretamente.

Na Vercel, importe o repositório e use:
- Framework Preset: **Vite**
- Root Directory: `react-app`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
