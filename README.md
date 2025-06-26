# Github Repositories Explore

This is task for showing list github users with their repositories.

This simple web app created using React with Typescript + Vite 

Some library are use in this project, like:

- [axios](https://github.com/axios/axios) for make http request
- [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) for help development UI process
- [react-router](https://github.com/remix-run/react-router) for routing url
- [lucide-react](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react) for icons assets

This app not using global state management like redux or zustand, because it's just simple app doesn't need that libary

## Local intallation

If you need to run this project localy, i recommend using node js latest version.

Step to run project localy

#### Run command in root project
For Yarn :

```yarn intall```

```yarn dev```

For npm :

```npm intall```

```npm run dev```

Server automatically running in port ```:5173```

### Add github personal token in ENV to increase access limit github api

Access limit default github api for public access is 50 request per hour. 
To increase access limit, we need put github personal access token to ENV for this project.
This app automatically add authorization headers to every request github api

Example env file in ```.env.example```

```
VITE_GITHUB_TOKEN=put your github personal token in here
```

You can remove ```.example``` to use the env for local development