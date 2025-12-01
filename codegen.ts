import type { CodegenConfig } from '@graphql-codegen/cli'
const config: CodegenConfig = {
    overwrite: true,
    // schema: "https://nodejs.softwaretributario.com:6001/graphql",
    // schema: "https://cjjfg4vl-3002.use.devtunnels.ms/graphql",
    // schema: "http://201.221.184.224:3002/",
    // schema: "http://localhost:3002/graphql",
    schema: "https://intranet.cytech.net.co:3002/graphql",
    documents: ['src/domain/graphql/**/*.graphqls'],
    generates: {
        './src/domain/graphql/index.ts': {
            // preset: "client",
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
              withHooks: true
            }
          }
    }
}

export default config