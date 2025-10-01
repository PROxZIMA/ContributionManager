# Secret Manager Integration

This project now uses Google Cloud Secret Manager to securely store PAT tokens, while keeping non-sensitive credential data in Firestore.

## Architecture

- **Firestore**: Stores non-sensitive credential data (email, organization, username)
- **Secret Manager**: Stores PAT tokens in format `provider:token;provider2:token2`
- **Format**: Each user has a secret named `user-{userId}-tokens` containing all their tokens

## Setup

### 1. Enable Secret Manager API

In your Google Cloud Console:
1. Navigate to your project `contribution-token-manager`
2. Enable the Secret Manager API
3. Go to APIs & Services > Library
4. Search for "Secret Manager API" and enable it

### 2. Set up Authentication

For local development, create a service account:

1. Go to IAM & Admin > Service Accounts
2. Create a new service account with Secret Manager Admin role
3. Download the JSON key file
4. Set the environment variable:
   ```bash
   $env:GOOGLE_APPLICATION_CREDENTIALS="path\to\your\service-account-key.json"
   ```

For production deployment, use workload identity or other secure methods.

### 3. Required Permissions

Your service account needs these permissions:
- `secretmanager.secrets.create`
- `secretmanager.secrets.delete`
- `secretmanager.versions.add`
- `secretmanager.versions.access`

## Usage

### Storing Credentials

```typescript
import { setAzureCredentials, setGithubCredentials } from '@/lib/firebase/firestore';

// This will automatically split the data:
// - Store PAT token in Secret Manager
// - Store other fields in Firestore
await setAzureCredentials(userId, {
  email: 'user@example.com',
  organization: 'myorg',
  pat: 'azure-pat-token'
});

await setGithubCredentials(userId, {
  username: 'myusername',
  pat: 'github-pat-token'
});
```

### Retrieving Credentials

```typescript
import { 
  getCredentials, 
  getCompleteCredentials, 
  getProviderToken 
} from '@/lib/firebase/firestore';

// Get credentials without PAT tokens (from Firestore only)
const credentials = await getCredentials(userId);

// Get complete credentials including PAT tokens (from both sources)
const completeCredentials = await getCompleteCredentials(userId);

// Get only a specific provider's PAT token
const azurePat = await getProviderToken(userId, 'azure');
const githubPat = await getProviderToken(userId, 'github');
```

### Deleting Credentials

```typescript
import { deleteAzureCredentials, deleteGithubCredentials } from '@/lib/firebase/firestore';

// This will delete both the Firestore data and the Secret Manager token
await deleteAzureCredentials(userId);
await deleteGithubCredentials(userId);
```

## Secret Format

Tokens are stored in Secret Manager using this format:
```
provider:token;provider2:token2
```

Example:
```
azure:pat_azure_token_here;github:ghp_github_token_here
```

## Migration

If you have existing data with PAT tokens in Firestore, you'll need to:

1. Read existing credentials from Firestore
2. Extract PAT tokens and store them in Secret Manager
3. Update Firestore records to remove PAT tokens
4. Update your client code to use the new functions

## Error Handling

The system gracefully handles:
- Missing secrets (returns empty objects/null)
- Secret Manager API errors (throws with descriptive messages)
- Partial failures (logs errors and re-throws)

## Security Considerations

- PAT tokens are never stored in Firestore
- Secret Manager provides encryption at rest and in transit
- Each user's tokens are isolated in separate secrets
- Proper IAM permissions restrict access to secrets
- Client-side code never directly accesses Secret Manager