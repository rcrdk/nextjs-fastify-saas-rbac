# 🔐 SaaS: Next.js and Fastify + RBAC
This project was developed for learning case at [Rocketseat](https://www.rocketseat.com.br/). It contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.

<u>ROOT Docs</u> | [API Docs](https://github.com/rcrdk/nextjs-fastify-saas-rbac/tree/main/apps/api#readme) | [WEB Docs](https://github.com/rcrdk/nextjs-fastify-saas-rbac/tree/main/apps/web#readme)

## 🚀 Techs and Tools
- Monorepo: [TurboRepo](https://turbo.build/)
- Package Manager: [PnPM](https://pnpm.io/)
- API:
  - [Node.js](https://nodejs.org/) + [Fastify](https://fastify.dev/) + [Typescript](https://www.typescriptlang.org/) + [Zod](https://zod.dev/)
  - [Prisma ORM](https://www.prisma.io/) + [Docker](https://www.docker.com/) + [PostgreSQL](https://www.postgresql.org/)
  - [Swagger](https://swagger.io/)
  - [Nodemailer](https://nodemailer.com/) + [Gmail](https://nodemailer.com/usage/using-gmail/)
  - [Cloudflare R2](https://www.cloudflare.com/pt-br/) + [AWS SDK](https://github.com/aws/aws-sdk-js-v3)
  - [GitHub OAuth](https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) + [Google OAuth](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- Web:
  - [React 19 RC](https://react.dev/) + [Next 15](https://nextjs.org/) with App Router + [Typescript](https://www.typescriptlang.org/) + [Zod](https://zod.dev/)
  - [Tailwind](https://tailwindcss.com/) with [shadcn-ui](https://ui.shadcn.com/)
  - [KY](https://github.com/sindresorhus/ky) (HTTP client) + [React Query](https://tanstack.com/query/latest)
- Packages:
  - Authorizations RBAC with [CASL](https://casl.js.org/)
  - Typesafe env with [T3-ENV](https://github.com/t3-oss/t3-env)
  - Config: [ESlint](https://eslint.org/), [Prettier](https://prettier.io/), [Typescript](https://www.typescriptlang.org/)

## 🖥️ Project
*Soon*
<!-- Backend: API with node and fastify, prisma with postgresql, nodemailer, AWS SDK + Cloudflare r2  -->
<!-- Front: React 19 RC and Next 15 with App Route, server actions, turborepo, ky client -->
<!-- Tailwind shadcn-ui, ky -->
<!-- GitHub OAuth2, Google OAuth2 -->
<!-- User roles and permissions with CASL -->
<!-- Pages and navigation of web project -->

## ⚙️ Get started

### 1️⃣ Setup enviroment:
<details>
<summary>Display contents</summary>
	
1. Generate your .env file: `cp .env.example .env`
2. Follow the next steps to fill the information.
</details>

### 2️⃣ Setup services:
<details>
<summary>Display contents</summary>

**Configure this services and paste all needed information to your .env file:**

1. Create a [GitHub OAuth](https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) app to be able to make social sign-in.
2. Create a [Google OAuth](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow) app to be able to make social sign-in.
3. Make sure your Google Account have [2FA activeted](https://support.google.com/accounts/answer/185833) and then you must [generate an app password](https://myaccount.google.com/apppasswords) to be able to send transactional and validation e-mails.
4. Create a [Cloudflare R2](https://www.cloudflare.com/) bucket to upload the app avatars.
</details>


### 3️⃣ Generate JWT keys:
<details>
<summary>Display contents</summary>
	
```shell
# Generate RSA256 secret and public keys: (Requires OpenSSL installed)
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Convert keys to Base64: (MacOS/Linux)
base64 -i private_key.pem -o private_key.txt
base64 -i public_key.pem -o public_key.txt
```

> [!TIP]
> **Use ChatGPT:**<br />
> 1) Private and public keys: "How to generate RS256 private and public keys on [YOUR OS]"<br />
> 2) Convert generated keys to base64: "How to convert file contents to base64 on [YOUR OS]"

</details>

### 4️⃣ Install dependencies and run services:
<details>
<summary>Display contents</summary>
	
```shell
# root:
pnpm i
docker compose up -d # make sure you are running docker

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