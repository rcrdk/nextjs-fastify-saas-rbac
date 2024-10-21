# 🔐 SaaS: Next.js and Fastify + RBAC
This project was developed for learning case at [Rocketseat](https://www.rocketseat.com.br/). It contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.

<u>ROOT Docs</u> | [API Docs](https://github.com/rcrdk/nextjs-fastify-saas-rbac/tree/main/apps/api#readme) | [WEB Docs](https://github.com/rcrdk/nextjs-fastify-saas-rbac/tree/main/apps/web#readme)

## 🚀 Techs and Tools
- Monorepo: [TurboRepo](https://turbo.build/)
- Package Manager: [PnPM](https://pnpm.io/)
- API:
  - [Node.js](https://nodejs.org/) + [Fastify](https://fastify.dev/) + [Typescript](https://www.typescriptlang.org/) + 
  - [Prisma ORM](https://www.prisma.io/) + [Docker](https://www.docker.com/) + [PostgreSQL](https://www.postgresql.org/)
  - [Swagger](https://swagger.io/)
  - [Nodemailer](https://nodemailer.com/) + [Gmail](https://nodemailer.com/usage/using-gmail/)
- Web:
  - [React 19 RC](https://react.dev/) + [Next 15 RC](https://nextjs.org/) with App Router + 
  - [Tailwind](https://tailwindcss.com/) with [shadcn-ui](https://ui.shadcn.com/)
  - [KY](https://github.com/sindresorhus/ky) (HTTP client) + [React Query](https://tanstack.com/query/latest)
- Packages:
  - Authorizations RBAC with [CASL](https://casl.js.org/)
  - Typesafe env with [T3-ENV](https://github.com/t3-oss/t3-env)
  - Config: [ESlint](https://eslint.org/), [Prettier](https://prettier.io/), [Typescript](https://www.typescriptlang.org/)

## 🖥️ Project
*Soon*
<!-- Back: API with node  and fastify, nodemailer,  -->
<!-- Front: React 19 RC and Next 15 RC with App Route, server actions, turborepo, ky client -->
<!-- GitHub OAuth2 -->
<!-- Tailwind shadcn-ui, prisma, ky -->
<!-- User roles and permissions with CASL -->
<!-- Pages and navigation of web project -->
<!-- Emails: password recover, create invites, account e-mail validation -->

## ⚙️ Get started

### 1️⃣ Setup enviroment:
<details>
<summary>Display contents</summary>
	
- Setup enviroment variables: `cp .env.example .env`
- Create a [GitHub OAuth](https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) app to make social sign-in.
- Make sure your Google Account have [2FA activeted](https://support.google.com/accounts/answer/185833) and then you must [generate an app password](https://myaccount.google.com/apppasswords) to send e-mails.
- Make sure you are running Docker.
</details>

### 2️⃣ Install dependencies and run services:
<details>
<summary>Display contents</summary>
	
```shell
# root:
pnpm i
docker compose up -d

# apps/api
pnpm run db:migrate # seeds will run along

# root:
pnpm run dev
```

Other available commands:
```shell
# apps/api
pnpm run db:deploy
pnpm run db:reset
pnpm run db:studio
```

> [!NOTE]
> The commands starting with `pnpm run db:*` are used for loading environment variables into them.

</details>

## 🔗 Base routes
- API: http://localhost:3333
- API Docs: http://localhost:3333/docs
- WEB: http://localhost:3000/