This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Installations
npm install bcryptjs
npm i jspdf-autotable
npm i react-toastify
npm i xlsx
npm i -D daisyui@latest  
npm i uuid
npm i zustand
npm install  dotenv
npm install chart.js
npm install jsonwebtoken
npm install react-draggable
npm install react-icons
npm install swr nodemailer
npm install file-saver
npm install next-auth
npm install axios
npm install cookie
npm i react-draggable
npm i react-chartjs-2
npm i xlsx-js-style;


## RUN
npm run dev


# ..........................  GIT .............................

# git add → git commit → git push

Here's a brief explanation:
* git add: Stage changes (files) to be committed.
* git commit: Commit staged changes with a meaningful message.
* git push: Push committed changes to a remote repository.


**Best practice:**

*   Use `git status` to review changes before staging.
*   Use `git diff` to review changes before committing.
*   Write descriptive commit messages.
*   Use `git log` to review commit history.

* git remote -v

Would you like more Git guidance or best practices?


# .................... next.config.mjs ...........................
Initial config
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['quickrecords.gofamintpsogba.org', 'localhost:3000', 'localhost'],
        formats: ['image/avif', 'image/webp'],
      },
}

export default nextConfig;



## .................... package.json ...........................
Check the official nextjs customer server deployment process link below and the additional guide link for deployment:

## https://nextjs.org/docs/pages/building-your-application/configuring/custom-server

## https://medium.com/@geevadon/how-to-deploy-a-next-js-app-on-cpanel-efficiently-c00c5eb860de


#  Before and after deployment

Before deployment:
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },


  After:
   "scripts": {
    "dev": "next dev",
    "build": "next build",
     "start": "NODE_ENV=production node server.js",
    "lint": "next lint"
  },


# After editing the start in the script as shown above,
1. Run: npm run build
2. Open the folder and select all the files in it except node_modeules and .gitignore and zip for upload in the cpanel
3. I discovered that the zip file was very large. I then found out that it was as a result of cache folder in .next folder. I then deleted this cache folder before zipping.
4. Then upload on the cpanel. 
  Please note that if the zip file is uploaded on the public_html (which is where static build file is usually uploaded) folder in cpanel, error may occur when starting the server app in the node.js application setup. What I did was to create a sub domain, home.gofamintpsogba.org and upload the zip file in it. Then when creating the nodejs app (server app), I did the following settings:
    Node.js version: (recommended version)
    Application mode: production
    Application root : home.gofamintpsogba.org
    Application URL: gofamintpsogba.org
    Application startup file : server.js

