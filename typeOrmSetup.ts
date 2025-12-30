//typeOrm setup in next js


//install ntypeorm and postgress dependcies

// npm install typeorm reflect-metadata pg



//experimental decorators needs to be true


// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "commonjs",
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true,
//     "strict": true
//   }
// }

//connect typeorm to db

// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import { User } from './user.entity'


// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'username',
//   password: 'password',
//   database: 'database',
//   synchronize: true,
//   logging: true,
//   entities: [User],
// });