import { AuthModule } from "@auth/root/auth.module"
import { ApolloDriver } from "@nestjs/apollo"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


export const GRAPHQL = () => [
  GraphQLModule.forRootAsync({
    driver: ApolloDriver,
    imports:[AuthModule],
    useFactory: async() => ({
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/common/infrastructure/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context({ req }) {
        // console.log(req)
      },
      formatError: (error) => {
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
          code:
            error.extensions?.code || "SERVER_ERROR",
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      },
    })
  })
]
  