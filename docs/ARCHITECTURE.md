# VidaPlus — Sistema de Gestão de Saúde

Frontend Angular para um sistema de gestão hospitalar, com áreas separadas por perfil (administrador, profissional de saúde e paciente). O projeto implementa o fluxo de autenticação com controle de acesso por perfil, navegação condicionada por rota e um módulo administrativo funcional de gestão de pacientes, profissionais, consultas e leitos.

**Projeto de portfólio** — os dados são mantidos no `localStorage` do navegador, com uma camada de serviços que simula a comunicação com um backend. Não há API, servidor ou banco de dados neste repositório.

## Funcionalidades

### Autenticação e acesso
- Login com Reactive Forms, validação de campos e feedback de erro via snackbar.
- Sessão persistida no navegador, com reidratação automática do estado ao recarregar a página.
- Controle de acesso por perfil (`ADMIN`, `PROFESSIONAL`, `PATIENT`) aplicado nas rotas.
- Menu lateral e rota inicial redirecionados com base no perfil da sessão.
- Logout com limpeza da sessão.

### Módulo administrativo (perfil `ADMIN`)
- **Pacientes**: listagem em tabela com busca, filtro por data de nascimento, paginação e máscara de CPF; edição de cadastro.
- **Profissionais**: listagem, edição e vínculo com especialidades (criar, editar e visualizar).
- **Consultas**: listagem em cards com filtros por profissional, paciente, unidade e data; agendamento de nova consulta; dialogs de cancelamento e reagendamento.
- **Leitos**: listagem com filtros por sala, paciente e unidade, com dialogs de criação, edição, visualização e exclusão.
- **Unidades de saúde**: listagem.

### Interface e componentes reutilizáveis
- Layout com sidenav, topbar, menu de perfil e central de notificações.
- Componente genérico `DataTableComponent<T>` (tabela, paginação, formatadores por coluna e coluna de ações).
- Componentes reutilizáveis de dialog, seção/campo de informação, chip, ícone com texto, label, logo, snackbar e spinner global.
- Pipes de formatação para CPF, celular, datas e horas.
- Configuração declarativa de topbar e espaçamento via `route.data`.

## Tecnologias

**Frontend**
- Angular 19.2 (standalone components, signals, `inject()`)
- TypeScript 5.7
- RxJS 7.8
- Angular Router (lazy loading por componente, route guards)
- Angular CDK (`BreakpointObserver` para responsividade)

**Gerenciamento de estado**
- NgRx 19 — Store, Actions, Reducers, Selectors, Effects
- `ngrx-store-localstorage` — sincronização e reidratação de slices via meta-reducer
- NgRx Store DevTools

**UI e estilização**
- Angular Material 19 (Material 3 com `mat.theme` via Sass API)
- `moment` + `@angular/material-moment-adapter` (datas em pt-BR)
- Tailwind CSS 4 (`@tailwindcss/postcss`)
- `ngx-mask` (máscaras de CPF e celular)
- `crypto-js` (hash de senha)

**Ferramentas**
- Angular CLI 19.2 · ESLint 9 (flat config com `angular-eslint`, `typescript-eslint` e `@ngrx/eslint-plugin`)
- Karma + Jasmine
- TypeScript 5.7

## Arquitetura

Organização baseada em features, com três camadas sob `src/app`:

```
src/app/
├── core/       # infraestrutura transversal
├── features/   # código de negócio, agrupado por domínio e perfil
└── shared/     # componentes, helpers, pipes e utils reutilizáveis
```

**`core`** concentra o que é transversal à aplicação:
- `auth/` — `AuthService`, `SessionService`, modelos (`User`, `Session`) e os guards.
- `storage/` — `StorageService`, a camada que abstrai `get`/`set`/`add`/`update`/`delete` sobre o `localStorage`.
- `store/` — o estado raiz (`AppState`), o registro de reducers e effects, e o meta-reducer de persistência.
- `ui/` — estado global de UI (snackbar, notificações, loading) e o `TopbarService`.

**`features`** agrupa o código por domínio. Cada entidade segue a mesma divisão interna:

```
features/admin/pacientes/
├── pages/      # componentes de rota
├── dialogs/    # fluxos secundários em modal
├── services/   # acesso a dados (retorna Observable)
├── store/      # slice NgRx da feature (actions, reducer, effects, selectors, state)
├── models/     # entidades de leitura
└── dto/        # payloads de escrita
```

As features estão segmentadas por perfil de acesso (`admin`, `profissional`, `paciente`) e pela área de autenticação (`auth/login`).

**`shared`** reúne o que é reutilizável e sem regra de negócio: componentes de layout e UI genérica, pipes, helpers, interfaces e funções utilitárias.

### Relacionamento entre componentes, serviços e estado

O fluxo é sempre o mesmo: o componente **dispensa uma action**, um **effect** chama o **service**, o **reducer** atualiza a **slice**, e o componente lê o resultado por **selectors** — nunca chamando o service diretamente para escrita.

```
Componente → dispatch(action) → Effect → Service → StorageService (localStorage)
                                  ↓
Componente ← selectSignal(selectors) ← Reducer ← action
```

Os services encapsulam toda a leitura e escrita de dados e retornam `Observable`, mantendo os Effects independentes de onde os dados vêm. Isso significa que trocar o `localStorage` por uma API HTTP não exigiria reescrever os componentes nem os reducers — apenas os services e o uso de `defer`/`forkJoin` já existente.

A configuração do estado raiz está centralizada em `core/store/index.store.ts`, que declara a interface `AppState`, o mapa de reducers e a lista de effects, servindo como ponto único de registro.

## Autenticação e controle de acesso

**Autenticação**
- O componente de login valida o formulário (campos obrigatórios, e-mail e senha com mínimo de 8 caracteres) e despacha a action `login`.
- `AuthEffects` chama `AuthService.login()`, que compara as credenciais com os usuários armazenados no navegador. A senha é comparada com hash **SHA-256** (`crypto-js`).
- Em caso de falha, são despachadas `loginFailure` e `showSnackbar`, com o erro técnico registrado no console.
- Em caso de sucesso, é criada a sessão e o usuário é redirecionado para a rota inicial do seu perfil.

**Sessão**
- `SessionService` persiste um objeto `Session` (`userId`, `role`, `name`, `token`) no `localStorage`.
- O `token` é gerado como `btoa(JSON.stringify(...))` com `sub`, `role` e `iat` — é um token simulado para representar o formato de um JWT, **não é um token JWT válido**.
- `logout()` remove a sessão.

**Autorização e perfis**
- O tipo `UserRole` define três perfis: `ADMIN`, `PROFESSIONAL` e `PATIENT`.
- O `RoleGuard` lê as perfis permitidos de `route.data['roles']`. Se o perfil não tiver acesso, o usuário é redirecionado para a rota inicial do próprio perfil (não há tela de "acesso negado").
- O menu lateral (`NAV_ITEMS`) e a rota inicial (`RedirectRoleComponent`) são derivados do mesmo perfil, evitando expor navegação incompatível com o acesso do usuário.

**Route Guards**
- `AuthGuard` — protege o layout e todas as rotas filhas com `canActivate` e `canActivateChild`; redireciona para `/auth/login` quando não há sessão.
- `RoleGuard` — aplica a restrição por perfil em `canActivate` e `canActivateChild`, lendo a configuração estática da rota.

**Persistência e reidratação**
- A sessão é reidratada do `localStorage` no início da aplicação.
- Um meta-reducer (`localStorageSyncReducer`) sincroniza as slices do store com o navegador usando `rehydrate: true`, com as chaves prefixadas por `vidaplus-app-` e execução restrita ao ambiente de navegador (`isPlatformBrowser`).

## Gerenciamento de estado

O NgRx é usado como estado global da aplicação, com **7 slices** registradas no store raiz: `auth`, `ui`, `pacientes`, `profissionais`, `unidades`, `consultas` e `especialidades`.

- **Store** — declarado via `provideStore` em `app.config.ts`, com a interface `AppState` e o mapa de reducers centralizados em `core/store/index.store.ts`.
- **Actions** — criadas com `createAction`/`props`, com prefixo por domínio (`[Pacientes] Load Success`, `[UI] Show Snackbar`, `[Paciente Edit] Update Paciente`). Cada operação assíncrona segue o trio `load` / `loadSuccess` / `loadFailure`.
- **Reducers** — organizados por feature, com estado normalizado em blocos `list`, `selected` e `update`, cada um com um `AsyncStatus` (`loading`/`error`) controlado pelo helper `async-status.helper`.
- **Selectors** — `createFeatureSelector` por slice, com seletores derivados como `selectPacientesForOptions`, que converte a lista em opções de select reutilizadas por outros módulos.
- **Effects** — registered via `provideEffects`. Encaminham as actions aos services, tratam erro e disparam feedback. O `UIEffects` conecta a action `showSnackbar` ao `MatSnackBar` com `dispatch: false`, permitindo que qualquer feature exiba uma notificação sem acoplamento direto com o Material.
- **Meta-reducer de persistência** — sincroniza as slices com o `localStorage` e reidrata o estado no carregamento.
- **Store DevTools** — habilitado com `maxAge: 25` e `trace` em modo de desenvolvimento.

O consumo nos componentes combina `store.selectSignal(...)` para valores reativos e `toSignal(...)` sobre `valueChanges` de `FormControl`, evitando `async` pipe em pontos críticos de template.

## Interface

**Angular Material**
- Tema Material 3 customizado com a API `mat.theme` do Sass (`src/styles.scss` e `src/styles/_theme-colors.scss`), substituindo a folha de tema padrão.
- Componentes usados: `MatTable` (com `MatTableDataSource` e `MatPaginator`), `MatDialog`, `MatFormField`, `MatAutocomplete`, `MatDatepicker`, `MatSelect`, `MatSidenav`, `MatCard`, `MatMenu`, `MatSnackBar`, `MatTooltip`, `MatProgressSpinner` e `MatBadge`.
- Configuração global de locale pt-BR: `MAT_DATE_LOCALE`, `MatPaginatorIntl` (implementação própria) e `MAT_FORM_FIELD_DEFAULT_OPTIONS` com `appearance: 'outline'`.
- Snackbar customizado via `openFromComponent`.

**Tailwind CSS**
- Configurado na versão 4 pelo plugin `@tailwindcss/postcss`, com entrada via `src/tailwind.css` e carregamento junto dos estilos globais em `angular.json`.
- Usado para layout, espaçamento e tipografia, integrando tokens do tema Material através de referências como `text-(--mat-sys-error)` e `bg-(--mat-sys-background)`, mantendo uma fonte única de cor entre os dois sistemas.

**Responsividade**
- Breakpoints do Tailwind aplicados à estrutura: layout de login dividido com `hidden lg:block`, grids de cards com `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`, filtros em coluna única no mobile.
- `BreakpointObserver` do CDK usado no módulo de consultas para alternar a apresentação conforme o viewport.
- Botões de ação fixa no mobile e estáticos no desktop (`fixed right-4 bottom-4 sm:static lg:static`).

**Componentização**
- Componentes `standalone` com `inject()` no lugar de injeção por construtor.
- `DataTableComponent<T>` genérico concentra tabela, paginação, formatação por coluna e ações, reutilizado por pacientes e leitos.
- Componentes de dialog padronizados (`DialogLayoutComponent`, `DialogInfoSectionComponent`, `DialogInfoFieldComponent`) para manter consistência visual e de markup entre os módulos.
- Configuração de topbar e espaçamento declarada em `route.data`, com tipagem garantida pelo helper `route()`.

## Screenshots

<!--
O repositório atualmente não possui imagens de tela.
Recomenda-se adicionar aqui capturas de:

  - Tela de login (desktop e mobile)
  - Layout com menu lateral (perfil administrador)
  - Listagem de consultas com filtros
  - Listagem de pacientes com tabela e paginação
  - Dialog de visualização/edição de registro

Sugestão de caminhos: docs/screenshots/*.png
-->

## Como executar

Pré-requisitos: **Node.js** e **npm**.

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm start
```

A aplicação fica disponível em `http://localhost:4200/`.

Na primeira execução, o projeto popula o `localStorage` com dados de exemplo. As credenciais criadas automaticamente são:

| Perfil        | E-mail                     | Senha         | Rota inicial          |
| ------------- | -------------------------- | ------------- | --------------------- |
| Administrador | `admin@vidaplus.com`       | `admin123`    | `/admin/pacientes`     |
| Profissional  | `profissional@vidaplus.com` | `profi123`    | `/profissional/agenda` |
| Paciente      | `paciente@vidaplus.com`    | `paciente123` | `/paciente/consultas`  |

Para limpar os dados e recriá-los, remova as chaves `vidaplus-app-*` e `session` do `localStorage` e recarregue a página.

### Outros scripts

```bash
npm run build    # build de produção (dist/vidaplus-sghss-angular-19)
npm run watch    # build em modo watch, configuração development
npm run lint     # ESLint (angular-eslint + typescript-eslint + @ngrx/eslint-plugin)
npm test         # testes unitários (Karma + Jasmine)
```

`npm test` exige um navegador Chrome instalado, configurado pelo `karma-chrome-launcher`.

## Aprendizados e destaques técnicos

- **Arquitetura baseada em features** — Features são módulos de domínio independentes, com subdivisão interna consistente em `pages`, `dialogs`, `services`, `store`, `models` e `dto`. Novas entidades podem ser adicionadas seguindo o mesmo padrão sem alterar código existente.
- **Gerenciamento de estado global com NgRx** — Uso de Store, Actions, Effects e Selectors com slices por entidade, estado segmentado por operação (`list`, `selected`, `update`) e um modelo de `AsyncStatus` compartilhado para loading e erro.
- **Autenticação e autorização** — Separação entre autenticação (validação de credenciais, emissão de sessão), autorização (Route Guards com base em perfis) e apresentação (menu e rotas condicionados pelo perfil da sessão).
- **Route Guards** — `AuthGuard` e `RoleGuard` operando com `canActivate` e `canActivateChild`, lendo a configuração estática da rota e retornando `UrlTree` para redirecionamento.
- **Persistência e reidratação de estado** — Meta-reducer de sincronização com o `localStorage`, com `rehydrate` para recuperar o estado entre sessões e guarda de plataforma para não executar no servidor.
- **Lazy loading** — Todas as páginas e o layout são carregados sob demanda por `loadComponent`, com configuração de topbar definida nos dados da rota.
- **Abstração de dados** — Services retornando `Observable` sobre uma camada de storage, com composição via `defer`, `forkJoin` e `map`, o que mantém Effects e reducers independentes da origem dos dados.
- **Componentização e reuso** — Componente de tabela genérico, componentes de dialog padronizados e componentes compartilhados de apresentação usados por múltiplas features.
- **Angular moderno** — Componentes `standalone`, `inject()`, `signal`, `computed`, `selectSignal`, `toSignal` e `takeUntilDestroyed`.
- **UI responsiva e localizada** — Layout responsivo com Tailwind e CDK, tema Material 3 customizado e formatação completa em pt-BR (datas, paginador, máscaras de documento).

## Status do projeto

**Em desenvolvimento.** O projeto está funcional como demonstração de frontend e não é um produto em produção.

**Implementado**
- Autenticação, sessão, guards, controle de acesso por perfil e navegação por `role`.
- Módulos administrativos de pacientes, profissionais, consultas, leitos e unidades.
- Store global com NgRx, persistência e reidratação.
- Layout, componentes compartilhados e tema.

**Limitações conhecidas**
- Não há backend, API ou banco de dados. Os dados são gravados no `localStorage` e as operações de escrita são simuladas pelos effects.
- A autenticação é mockada: o hash da senha é calculado no cliente e o token é um payload codificado em base64, sem validação real de sessão ou expiração.
- Páginas de relatórios, gestão de usuários, perfis, agenda do profissional, consultas, exames e histórico clínico do paciente existem apenas como rotas e exibem "Em desenvolvimento".
- O módulo de leitos usa dados fixos no próprio componente; os arquivos `leitos.reducer.ts`, `leitos.state.ts` e `leitos.selectors.ts` estão vazios e a slice não está registrada no `AppState`.
- A rota `leitos` está declarada duas vezes em `app.routes.ts`.
- A suíte de testes contém apenas o scaffolding padrão do Angular CLI e referencia nomes de classe desatualizados, não refletindo o código atual — não está funcional.
- O lint está configurado (`angular-eslint` + `typescript-eslint` + `@ngrx/eslint-plugin`) e reporta 11 erros pendentes, principalmente uso de `any` e um `alt-text` ausente.
- `provideClientHydration` está configurado, mas o projeto não possui configuração de SSR.
- Não há integração contínua, configuração de deploy nem demonstração publicada neste repositório.
- O arquivo `core/storage/storage.keys.ts` contém constantes legadas que não são utilizadas pela aplicação.
