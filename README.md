# auth-ms
Microservice to handle user related stuff</br>
Create and operate permissions. Assign permissions to roles. Assign roles to user. Manage rale permissions per user.</br>

### pre-reqs:
Node.js</br>
yarn or npm</br>
run npm install or yarn

### Repo structure:
```
├── db                      #
│   └── migration           # database migration files
├── src                     # Source files
│   ├── controller          # web service routing controllers
│   ├── entity              # Database entities
│   ├── module              # entry point for app module
│   ├── service             # service files. handling crud operations
│   └── main.ts             # main application file
├── datasource.js           # datasource for typeorm cli
├── nodemon.json            # nodemon config file
├── package.json            # manage dependencies here
├── tsconfig.json           # manage typescript compiler options here
├── LICENSE                 # LICENCE file
└── README.md               # readme file
```
### useful targets:
generate migration file based on entities:</br>
npm run typeorm migration:generate -n <migration_name></br>
run migrations:</br>
npm run typeorm migration:run


