# When adding additional environment variables, the schema in "/src/env.mjs"
# should be updated accordingly.

BASE_API_URL="http://localhost:6970"
BASE_BOX_URL="http://localhost"

# Drizzle
DATABASE_URL='postgres://postgres:postgres@0.0.0.0:5432/htl'

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET="RirccpA//8S6xgXpcrFk3RJl5A6B34YeFN8aaU3hckA="
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Google Provider
GOOGLE_CLIENT_ID="op://development/htl-secrets/google/client-id"
GOOGLE_CLIENT_SECRET="op://development/htl-secrets/google/client-secret" 

# Next Auth Azure Provider
AZURE_AD_CLIENT_ID="op://development/htl-secrets/azure/client-id"
AZURE_AD_TENANT_ID="op://development/htl-secrets/azure/tenant-id"
AZURE_AD_CLIENT_SECRET="op://development/htl-secrets/azure/client-secret"