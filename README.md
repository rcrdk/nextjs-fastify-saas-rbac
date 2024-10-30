# 🔐 SaaS: Next.js and Fastify + RBAC
This project was developed for learning case at [Rocketseat](https://www.rocketseat.com.br/). It's a monorepo managed with TurboRepo that contains all the necessary boilerplate to setup a multi-tenant SaaS with Next.js and Fastify including authentication and RBAC authorization.

<img src="https://github.com/rcrdk/nextjs-fastify-saas-rbac/blob/main/apps/web/public/acme-inc.png?raw=true" />

## 🚀 Techs and Tools

<table style="width:100%">
	<tr>
    	<th>Tools</th>
    	<td>
			<img alt="Turborepo" src="https://img.shields.io/badge/-Turborepo-05122A?style=flat&logo=turborepo" />&nbsp;
			<img alt="PNPM" src="https://img.shields.io/badge/-PNPM-05122A?style=flat&logo=pnpm" />&nbsp;
			<img alt="Docker" src="https://img.shields.io/badge/-Docker-05122A?style=flat&logo=docker" />&nbsp;
			<img alt="Warp Terminal" src="https://img.shields.io/badge/-Warp%20Terminal-05122A?style=flat&logo=warp" />&nbsp;
		</td>
	</tr>
	<tr>
    	<th>API</th>
    	<td>
			<img alt="Node.js" src="https://img.shields.io/badge/-Node.js-05122A?style=flat&logo=node.js" />&nbsp;
			<img alt="Fastify" src="https://img.shields.io/badge/-Fastify-05122A?style=flat&logo=fastify" />&nbsp;
			<img alt="Typescript" src="https://img.shields.io/badge/-Typescript-05122A?style=flat&logo=typescript" />&nbsp;
			<img alt="Zod" src="https://img.shields.io/badge/-Zod-05122A?style=flat&logo=zod" />&nbsp;
			<img alt="Prisma Client" src="https://img.shields.io/badge/-Prisma%20Client-05122A?style=flat&logo=prisma" />&nbsp;
			<img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-05122A?style=flat&logo=postgresql" />&nbsp;
			<img alt="Swagger" src="https://img.shields.io/badge/-Swagger-05122A?style=flat&logo=swagger" />&nbsp;
			<img alt="Nodemailer + Gmail" src="https://img.shields.io/badge/-Nodemailer%20+%20Gmail-05122A?style=flat&logo=gmail" />&nbsp;
			<img alt="AWS SDK" src="https://img.shields.io/badge/-AWS%20SDK-05122A?style=flat&logo=amazonwebservices" />&nbsp;
      		<img alt="Cloudflare R2" src="https://img.shields.io/badge/-Cloudflare%20R2-05122A?style=flat&logo=cloudflare" />&nbsp;
			<img alt="GitHub OAuth" src="https://img.shields.io/badge/-GitHub%20OAuth-05122A?style=flat&logo=github" />&nbsp;
			<img alt="Google OAuth" src="https://img.shields.io/badge/-Google%20OAuth-05122A?style=flat&logo=google" />&nbsp;
		</td>
  	</tr>
 	<tr>
    	<th>Front-end</th>
    	<td>
			<img alt="React 19 RC" src="https://img.shields.io/badge/-React%2019%20RC-05122A?style=flat&logo=react" />&nbsp;
			<img alt="Next.js" src="https://img.shields.io/badge/-Next.js%2015%20with%20App%20Router-05122A?style=flat&logo=next.js" />&nbsp;
			<img alt="React Query" src="https://img.shields.io/badge/-React%20Query-05122A?style=flat&logo=react-query" />&nbsp;
			<img alt="KY HTTP Requests" src="https://img.shields.io/badge/-KY%20HTTP%20Requests-05122A?style=flat&logo=axios" />&nbsp;
			<img alt="Typescript" src="https://img.shields.io/badge/-Typescript-05122A?style=flat&logo=typescript" />&nbsp;
			<img alt="Zod" src="https://img.shields.io/badge/-Zod-05122A?style=flat&logo=zod" />&nbsp;
			<img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-05122A?style=flat&logo=tailwind-css" />&nbsp;
      		<img alt="Radix UI" src="https://img.shields.io/badge/-Radix%20UI-05122A?style=flat&logo=radix-ui" />&nbsp;
			<img alt="shadcn/ui" src="https://img.shields.io/badge/-shadcn%2Fui-05122A?style=flat&logo=shadcnui" />&nbsp;
   			<img alt="Tabler Icons" src="https://img.shields.io/badge/-Tabler%20Icons-05122A?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACHFBMVEUAAAAiZswfbcUhacMgasQgasQga8Mfa8MfasQfasMeasQfasMga8Qga8Mfa8Mha8IccMYfasMfasMgasQfa8QgbMMeasMfasQfa8QmZr8gasQga8MeasIfa8Mga8Ufa8Mga8Qfa8QebMMfacIiaMUga8Qea8Eaa8kfa8Ufa8QgasMkbcgeasQga8MgasMfa8Qga8Qga8MeasMfasQgasIga8Qga8MgasMfasQfa8MgasQga8QgasQfasMga8QfasMgasQgasMgasQga8Qfa8QfasMhacInYsQga8IgacMfb78eacMgasMia8Yga8Mha8MhbMMgasMgacQfacMfa8QeacUfacMfa8MgasMfacQga8QibMR5ptzU4/T7/P709/y1zutHhc4hbMSwy+r////5+/2Frt92pNvH2vA6fMvP3/Lr8vpOitDw9fv1+fxjmNbg6vf8/f51o9qavORnmtcxdsjk7fj4+v1XkNPL3PHy9vxBgc0jbcWQteL9/v/Y5fUncMZbktPq8fmdvuU9fsz+/v9bktQ+f8zm7vjD1+8/f8zn7/k4e8ru8/o0eMnb5/a40Ozc6Pb7/f5NidBMiNDl7viLsuDF2fDI2vDo8Pk3esoxd8lIhs9+qt3W5PT3+v2fv+ZYkNObveVlmdbx9vvv9ftVjtLX5PREg82Yu+R+qd260e0yd8nV4/T2+f18qNx7p9zS4fOpxuhAgM3r67+jAAAAWnRSTlMADzFNZX+Wq7vL2eju9cpMEmCjx+svqvupFKX+SOlH+vxoY2oWpjITYcjGDkpmfJiVvLja1ufk7ery7/f0+ebj1ZeUfntiLg1fXhARpy2kRURnRqiiS8nY9rq1qCUcAAAC00lEQVRYw6WXZ1sTURCFDz3AUtKBgMFYQLFgiWIBFaQoRVSaA1gXFLui2LA3FFQs2AEbFlRsf9APhOzcbGA3u+fbmWfnfe6du7cMEKqo6JjYuPgES2JSsiSlEKVIUnJSqiUhPi42LToKMyrdarM7aEY57DZr+jTpTpebdMmd4QyTnpnlId3yZGWG5mfnUETKmSXmW70UoXJn83wfGdAcNn63EYA7O1i/ZDIkx9wAIIsMal5g/T1GATQfAOAynE8uAMhzGwe4MwHkkwnlA7CZAdgALDADWAjAYQaQAxSQKRUgWvCtbe279+zdpx/gRAy3+w/IsizLHZ2tegGLsJjbg3JAh7p0AnyI4/bwFEA+clQfYAmWcnssCJCPn9AFKEQCtycVgHzqtB5ABpZx2y1zwhkdgOVI5PZsDyecO68NsGOF4LsucMLFS5qAlfCLgd7LVxjh6jUtwCqsDg1dv8EIN7UARVijit1ihbh9RwOwFuvUwbt9CuGeBmA9csNE7/crddQAFCPciTigDOGBJiDMFB4+UqYwqDkFdREHHiv5T55qFlG1jM+G2DI+117GEjHQ2tnB8l9oHiwbkCQO/yX/lV+91vyVNyKV2zdDwlZ4S0S9wyOjLDY6MtwrbiYLt++EzfieiOiDHKpucTsLB0ofz/9IRESfVIAx8UDZxC0b7Nhn1SkXDlCKMm6/BL/q+RoIqafwjWdsRiy341Mfff8RPCDGf06w7In2X8LSliNN+AsGJ0/kNt03U3bo1fb7z0T/33/6r7YKs5drpfnr3fwDw/QTp8oMYAuArcXG873VAJBhHFBj8qnrqZ18LNeZKSEA5PmN5fuD7ds2r6EK1istS7nRd7KJpsu9XWzbdkTY9vjrQxvHvLpIGk9buPa3YqfOeXhraqfpnqurGuxFGvvX3lBVPXMLX+ls9JUVuixNzX5JaiFqkaSS5qZdrtIyX6OzUvX5f++YHJj9Aeg/AAAAAElFTkSuQmCC" />&nbsp;
	  		<img alt="Day.js" src="https://img.shields.io/badge/-Day.js-05122A?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAPFBMVEX/X0z/YE3/VUD/XUr/////Y1D/WUX/emr/koX/Tzn/h3n/qJ3/bFv/xb//+Pj/8O7/ubD/nJD/2NT/5+SPyY4QAAAB2klEQVRYw+1Uy5bsIAiMKPjWRP//Xwd8ZNJz72LWc1KLJNJYFiX0cbx48eLFi78GJXiuP16fqfeWR1APfIeU1jOsnsuVOndz/oNfoYBghzSi3k/Zj+nej0lJBFRKGhavomAKo180jlRkqyUlYQdK9tcTlhYIhn/SeBZjapwHcEZyjCubhsKAcHZCyW6VhfLSpF0MuEHQTHTuNBG2WSwfwAeTJaJVudwFLCFxCpI1F+DxICBngifwdvFOXajQR6GXJMqNqRAinw2t0239IJAwiGn6ozCpXc5S1LOfEX3U7IfoDwI2p1kNoHcBi4AtLueQHEizbyj5J5S8C9gESJEtzA7ph4JJALkC+asMQ5WPt4PfJrI7LhdTAql/SzjQXLa3vq5w+Hg34CZALuAIpUxuIQjEpni5L3YIbYxXbzenJOnRf9NWRSCtx+4E2ATW8zU6Ixb0DNqDX1o3AbKlctXcGgpiBPmOy14hOGOMzeTRlUGuiCvJsAm4kmrBZufy6IzT9PPixsvLAwpV0Nh8brs25XI7so2UqhsEnQm6MSXOwnKVVta3vTJcrFDmEffoaVSPsZVtlJKCeSTo5/DNeV6pj8l9POXFQu7eU8fHOP/+f+f/3y9evHjx4u/gC6cKEcWoMXb/AAAAAElFTkSuQmCC" />&nbsp;
	 		<img alt="React Hot Toast" src="https://img.shields.io/badge/-React%20Hot%20Toast-05122A?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAaVBMVEUAAABAIBBDGwBIIAhIKAjfUEjfWEjfVUXfVUpGIwVIIgdHIwZGIgZIIwdIIgZJIwbgVEjiVUngVUnVUURIIgdIIwdJIwbhVUnhVUpIIwfhVUnslYzslY376ej76uj99PP99PT99fT///+Bf3S8AAAAGXRSTlMAEBMgICAgMDBfcn2GmZ+vv7/Az9/f7+/v8uWkkQAAAI5JREFUOMvFk0kOgzAQBM2SQEIIW8Ji9vn/IwEDgkYMJyTXqeUuXyy3EAvm29/xMsWRjw942NpBWhxIv9au/xcn/Iy1dxN5SvKY+2cuGTJHCaFkiZQgL7hVKDuiusQEQk0jLSYQSIFJj7ChT9D7Dv102mACoWqI+grTzT/qQoj4Pp6HxQ4nX6cVM/fdsRwATgtZ79eTN+QAAAAASUVORK5CYII=" />&nbsp;
  		</td>
	</tr>
	<tr>
    	<th>Packages and Config</th>
    	<td>
			<img alt="RBAC Authorizations with CASL" src="https://img.shields.io/badge/-RBAC%20Authorizations%20with%20CASL-05122A?style=flat&logo=data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjI0IiAgaGVpZ2h0PSIyNCIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9IiNmZmZmZmYiICBjbGFzcz0iaWNvbiBpY29uLXRhYmxlciBpY29ucy10YWJsZXItZmlsbGVkIGljb24tdGFibGVyLXNoaWVsZC1sb2NrIj48cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTEuOTk4IDJsLjExOCAuMDA3bC4wNTkgLjAwOGwuMDYxIC4wMTNsLjExMSAuMDM0YS45OTMgLjk5MyAwIDAgMSAuMjE3IC4xMTJsLjEwNCAuMDgybC4yNTUgLjIxOGExMSAxMSAwIDAgMCA3LjE4OSAyLjUzN2wuMzQyIC0uMDFhMSAxIDAgMCAxIDEuMDA1IC43MTdhMTMgMTMgMCAwIDEgLTkuMjA4IDE2LjI1YTEgMSAwIDAgMSAtLjUwMiAwYTEzIDEzIDAgMCAxIC05LjIwOSAtMTYuMjVhMSAxIDAgMCAxIDEuMDA1IC0uNzE3YTExIDExIDAgMCAwIDcuNTMxIC0yLjUyN2wuMjYzIC0uMjI1bC4wOTYgLS4wNzVhLjk5MyAuOTkzIDAgMCAxIC4yMTcgLS4xMTJsLjExMiAtLjAzNGEuOTcgLjk3IDAgMCAxIC4xMTkgLS4wMjFsLjExNSAtLjAwN3ptLjAwMiA3YTIgMiAwIDAgMCAtMS45OTUgMS44NWwtLjAwNSAuMTVsLjAwNSAuMTVhMiAyIDAgMCAwIC45OTUgMS41ODF2MS43NjlsLjAwNyAuMTE3YTEgMSAwIDAgMCAxLjk5MyAtLjExN2wuMDAxIC0xLjc2OGEyIDIgMCAwIDAgLTEuMDAxIC0zLjczMnoiIC8+PC9zdmc+" />&nbsp;
			<img alt="Typescript" src="https://img.shields.io/badge/-Typescript-05122A?style=flat&logo=typescript" />&nbsp;
			<img alt="ESLint" src="https://img.shields.io/badge/-ESLint-05122A?style=flat&logo=eslint" />&nbsp;
			<img alt="Prettier" src="https://img.shields.io/badge/-Prettier-05122A?style=flat&logo=prettier" />&nbsp;
			<img alt="T3 Env" src="https://img.shields.io/badge/-T3%20Env-05122A?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjM0MS4zMzMiIGhlaWdodD0iMzQxLjMzMyIgdmlld0JveD0iMCAwIDI1NiAyNTYiPiAgICA8ZyBmaWxsPSIjZmZmIj4gICAgICAgIDxwYXRoIGQ9Ik0wIDQydjEyaDE2NS42bDExLjMtMTIgMTEuMi0xMkgwdjEyek0xOTcuNSA1NS4yYy0xMi4xIDEyLjMtMjkuMSAyOS41LTM3LjggMzguNGwtMTUuOSAxNi4xIDkuMiA3LjggOS4zIDcuOSAxMC4xLTEwLjVjNS41LTUuNyAyNS43LTI2LjUgNDQuOS00Ni4yTDI1Mi4yIDMzaC0zMi43bC0yMiAyMi4yek02My4yIDE0Ny4ybC4zIDczLjMgMTEuOC4zIDExLjcuM1Y3NEg2M2wuMiA3My4yek0yMDkuNyAxMDguN2wtOC43IDguOCA2LjYgMy40YzEyLjkgNi43IDIxLjIgMTggMjMuNiAzMiAzLjEgMTgtNyAzNy0yNC4yIDQ1LjQtNi4xIDMtNy4xIDMuMi0xNy41IDMuMi0xMy43LS4xLTE5LjgtMi4yLTI4LjItOS44LTcuMi02LjYtMTAuNS0xMS45LTEzLjktMjJsLTIuNi03LjktOS40IDkuM2MtNS4yIDUuMi05LjQgOS45LTkuNCAxMC41IDAgMy40IDcuOCAxNi4xIDE0LjEgMjIuOCAxMi45IDEzLjggMjcuMiAyMC41IDQ1LjUgMjEuNCAyNy40IDEuMyA1MS43LTEzIDYzLjQtMzcuMyAxMi4xLTI1IDcuNy01My44LTExLjItNzQtNS4yLTUuNi0xNi43LTE0LjUtMTguNy0xNC41LS4zIDAtNC42IDMuOS05LjQgOC43eiIvPiAgICA8L2c+PC9zdmc+" />&nbsp;
		</td>
	</tr>
</table>

## 🖥️ Project
This project contains all the necessary boilerplate to setup a multi-tenant SaaS including authentication with RBAC, account settings, organizations management with projects, members, invitations and its settings. It started as a learning case and I end up creating more features and expanding all the project

**Roles:** the owner (administrator) of organizations who is able manage all data and actions; The regular member who is able to manage their projects; And the billing member who is able to manage, of course, the billing data. You can see the full detailed table below.

**Authentication:** consists into classic e-mail and password sign-in, also it includes the authentication with third-party services from GitHub and Google. The traditional sign-up method requires an e-mail verification by a token valid for five minutes that is sent to the user inbox with instructions. The password recovery functionality works in a similar way of e-mail verification by a token.

**Account settings:** the user is able to manage their account: (1) basic information including the avatar, name and e-mail with revalidation; (2) set a password or change an existing one; (3) Connect or disconnect third-party authentication providers; (4) Manage all organizations that they are in and there's a option to leave organization that they doesn't owns; (5) Delete account along with all owned organizations.

**Organization projects:** here the users can make the CRUD of projects, since this app is a boilerplate, it was developed a superficial projects section only with avatar, name, description and author.

**Organization members:** in this section the owner can manage the existing members of the organization being able to change their role, remove them or transfer the ownership of the organization to one of them. There is also the option to invite new members for a role by sending an e-mail with the invite link.

**Organization settings:** the owner has control of the entire organization: (1) change the avatar and its unique name; (2) It is possible to configure a unique domain, so new app users after signing up with the e-mail containing the domain could auto-join the organization. To be able to use a domain on organization, the owner must verify the domain ownership by setting a TXT entry on domain DNS records configuration; (3) The billing section, also shown to the billing member, is where the usage stats of organization are; (4) Finally, there it the option to shutdown the organization with all its data.

The API was developed using Fastify along with Prisma ORM and PostgreSQL as database; It was configured nodemailer to deal with transactional and validation e-mails; It was created a Cloudflare R2 bucket to store users, organizations and projects avatars using AWS SDK to establish the connection.

The front-end web app was developed using Next.js 15 with App Router with React 19 RC; It was use a not very known API client, KY, to deal with the requests that works very well with Next; It was used React Query to some client side requests; All design and components was written using shadcn/ui with Tailwind.

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

1. Create a [GitHub OAuth](https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) and a [Google OAuth](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow) apps to be able to sign-in with these providers.
2. Make sure your Google Account have [2FA activeted](https://support.google.com/accounts/answer/185833) and then you must [generate an app password](https://myaccount.google.com/apppasswords) to be able to send transactional and validation e-mails.
3. Create a [Cloudflare R2](https://www.cloudflare.com/) bucket to upload the app avatars.
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

## 🧑🏼‍💻 RBAC: Roles and Permissions

| Description              | Owner | Member | Billing | Anonymous |
| ------------------------ | ----- | ------ | ------- | --------- |
| Update organization      | ✅    | ❌      | ❌      | ❌        |
| Delete organization      | ✅    | ❌      | ❌      | ❌        |
| Invite a member          | ✅    | ❌      | ❌      | ❌        |
| Revoke an invite         | ✅    | ❌      | ❌      | ❌        |
| List members             | ✅    | ✅      | ✅      | ❌        |
| Transfer ownership       | 🟡    | ❌      | ❌      | ❌        |
| Update member role       | ✅    | ❌      | ❌      | ❌        |
| Delete member            | ✅    | 🟡      | ❌      | ❌        |
| List projects            | ✅    | ✅      | ✅      | ❌        |
| Create a new project     | ✅    | ✅      | ❌      | ❌        |
| Update a project         | ✅    | 🟡      | ❌      | ❌        |
| Delete a project         | ✅    | 🟡      | ❌      | ❌        |
| Get billing details      | ✅    | ❌      | ✅      | ❌        |
| Export billing details   | ✅    | ❌      | ✅      | ❌        |

> ✅ allowed | 
> ❌ not allowed | 
> 🟡 allowed with conditions

**Conditions:**
- Only owners are able to transfer organization ownership;
- Only administrators and project authors are able update/delete a project;
- Only auth users can update their preferences;
- Members are able to leave a organization that they are in;
- Invites can be accepted or rejected by anyone with the link;
