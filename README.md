# auth-ms

Microservice to handle user related stuff</br>
Create and operate permissions. Assign permissions to roles. Assign roles to user. Manage rale permissions per
user.</br>

### pre-reqs:

Node.js</br>
yarn or npm</br>
run npm install or yarn

### Repo structure:

```
├── src                     # Source files
│   ├── controller          # web service routing controllers
│   ├── database            # database related files
│   │    ├── migrations     # db migration files
│   │    └── seeders        # db seeding files
│   ├── mock                # sevice mocking.
│   ├── model               # Database entities
│   ├── module              # entry point for app module
│   ├── pipe                # custom request validation pipes
│   ├── service             # service files. handling crud operations
│   ├── spec                # test files
│   └── main.ts             # main application file
├── package.json            # manage dependencies here
├── tsconfig.json           # manage typescript compiler options here
├── LICENSE                 # LICENCE file
└── README.md               # readme file
```

### useful targets:

generate migration file based on entities:</br>
npm run typeorm migration:generate -n <migration_name></br>
run migrations:</br>
npm run typeorm migration:run</br>
run migrations for docker hosted app:</br>
docker exec -it <container id> npm run <migrate|seed> 


