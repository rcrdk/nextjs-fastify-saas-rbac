# 🔐 SaaS: Fastify + RBAC
This project was developed for learning case at [Rocketseat](https://www.rocketseat.com.br/). It contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js including authentication and RBAC authorization.

[ROOT Docs](https://github.com/rcrdk/nextjs-fastify-saas-rbac) | <u>API Docs</u> | [WEB Docs](https://github.com/rcrdk/nextjs-fastify-saas-rbac/tree/main/apps/web#readme)

## 🚀 Techs and Tools
- [Node.js](https://nodejs.org/) + [Fastify](https://fastify.dev/) + [Typescript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) + [Docker](https://www.docker.com/) + [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- Authorizations RBAC with [CASL](https://casl.js.org/)

## 🖥️ Project
Checkout details of [this project](https://github.com/rcrdk/nextjs-fastify-saas-rbac).

## 🔗 Routes
By running the project in your machine you can get all endpoints available at:

[![View in Swagger](https://jessemillar.github.io/view-in-swagger-button/button.svg)](http://localhost:3333/docs/)

## 📋 Business Rules and Requirements

**Authentication:**
- [x] It should be able to authenticate using e-mail and password;
- [x] It should be able to authenticate using Github account;
- [x] It should be able to recover password using e-mail;
- [x] It should be able to create an account (e-mail, name and password);
**Organizations**
- [x] It should be able to create a new organization;
- [x] It should be able to get organizations to which the user belongs;
- [x] It should be able to update an organization;
- [x] It should be able to shutdown an organization;
- [x] It should be able to transfer organization ownership;
**Invites**
- [x] It should be able to invite a new member (e-mail, role);
- [x] It should be able to accept an invite;
- [x] It should be able to revoke a pending invite;
**Members**
- [x] It should be able to get organization members;
- [x] It should be able to update a member role;
**Projects**
- [x] It should be able to get projects within a organization;
- [x] It should be able to create a new project (name, url, description);
- [x] It should be able to update a project (name, url, description);
- [x] It should be able to delete a project;
**Billing**
- [x] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role);

## 🧑🏼‍💻 RBAC: Roles and Permissions
Owner/Administrator, Member, Billing (one per organization) and Anonymous.

| Description              | Administrator | Member | Billing | Anonymous |
| ------------------------ | ------------- | ------ | ------- | --------- |
| Update organization      | ✅            | ❌     | ❌       | ❌        |
| Delete organization      | ✅            | ❌     | ❌       | ❌        |
| Invite a member          | ✅            | ❌     | ❌       | ❌        |
| Revoke an invite         | ✅            | ❌     | ❌       | ❌        |
| List members             | ✅            | ✅     | ✅       | ❌        |
| Transfer ownership       | 🟡            | ❌     | ❌       | ❌        |
| Update member role       | ✅            | ❌     | ❌       | ❌        |
| Delete member            | ✅            | 🟡     | ❌       | ❌        |
| List projects            | ✅            | ✅     | ✅       | ❌        |
| Create a new project     | ✅            | ✅     | ❌       | ❌        |
| Update a project         | ✅            | 🟡     | ❌       | ❌        |
| Delete a project         | ✅            | 🟡     | ❌       | ❌        |
| Get billing details      | ✅            | ❌     | ✅       | ❌        |
| Export billing details   | ✅            | ❌     | ✅       | ❌        |

> ✅ allowed | 
> ❌ not allowed | 
> 🟡 allowed with conditions

**Conditions:**
- Only owners may transfer organization ownership;
- Only administrators and project authors may update/delete a project;
- Members can leave their own organizations;