<h1 align="center">VidaPlus — Sistema de Gestão de Saúde</h1>

<p align="center">
  Aplicação web frontend desenvolvida com <strong>Angular 19</strong>, simulando um sistema de gestão hospitalar com diferentes perfis de acesso e módulos administrativos.
</p>

<p align="center">
  <a href="https://vidaplus-sistema-hospitalar.vercel.app/">
    <strong>🔗 Acessar demonstração</strong>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white" alt="Angular 19">
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/NgRx-19-BA2BD2?logo=ngrx&logoColor=white" alt="NgRx">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Angular_Material-19-757575?logo=materialdesign&logoColor=white" alt="Angular Material">
</p>

> **Projeto de portfólio:** os dados e a autenticação são simulados localmente utilizando `localStorage`. O projeto não possui backend, API ou banco de dados próprio.

## Destaques

* Autenticação e controle de acesso por perfil
* Rotas protegidas com Guards
* Gerenciamento de estado com **NgRx**
* Persistência e reidratação do estado
* Lazy Loading
* Interfaces responsivas com **Angular Material** e **Tailwind CSS**
* Componentes reutilizáveis
* Formulários reativos e validações
* CRUDs para diferentes entidades do sistema

## Arquitetura

O projeto utiliza uma organização baseada em **Core, Features e Shared**, separando responsabilidades e funcionalidades por domínio.

O gerenciamento de estado segue o fluxo:

```text
Component
    ↓
 Action
    ↓
 Effect
    ↓
 Service
    ↓
Reducer
    ↓
Selector
    ↓
Component
```

A camada de serviços foi estruturada de forma que a persistência local possa futuramente ser substituída por uma API.

## Tecnologias

| Tecnologia           | Utilização                             |
| -------------------- | -------------------------------------- |
| **Angular 19**       | Framework principal                    |
| **TypeScript**       | Linguagem                              |
| **NgRx**             | Gerenciamento de estado                |
| **RxJS**             | Programação reativa                    |
| **Angular Material** | Componentes e UI                       |
| **Tailwind CSS**     | Estilização e responsividade           |
| **Angular CDK**      | Recursos de interface e responsividade |
| **Reactive Forms**   | Formulários e validações               |
| **ESLint**           | Análise e padronização de código       |
| **Karma / Jasmine**  | Testes                                 |

## Preview

<p align="center">
  <img
    src="./docs/screenshots/vidaplus-preview.png"
    alt="Preview do VidaPlus"
    width="850"
  >
</p>

<p align="center">
  <img
    src="./docs/screenshots/vidaplus_pacientes.png"
    alt="Gerenciamento de pacientes"
    width="410"
  >
  <img
    src="./docs/screenshots/vidaplus_consultas.png"
    alt="Gerenciamento de consultas"
    width="410"
  >
</p>

## Executando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/gustavodacostap/vidaplus.git
cd vidaplus
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm start
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

## Usuários para demonstração

| Perfil        | E-mail                      | Senha         |
| ------------- | --------------------------- | ------------- |
| Administrador | `admin@vidaplus.com`        | `admin123`    |
| Profissional  | `profissional@vidaplus.com` | `profi123`    |
| Paciente      | `paciente@vidaplus.com`     | `paciente123` |

## Status

**Frontend funcional para demonstração e portfólio.**

O projeto atualmente não possui:

* Backend ou API
* Banco de dados
* Autenticação real
* Testes automatizados abrangentes

Os dados utilizados pela aplicação são simulados localmente.
