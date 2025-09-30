# **App Name**: Contribution Token Manager

## Core Features:

- User Authentication: Secure sign-in/sign-up using Google or GitHub via Firebase for account creation.
- PII Data Input: Collect necessary Personal Identifiable Information from the user (email, organization, and PAT for Azure DevOps; username and PAT for GitHub).
- Secure PII Storage: Provide encrypted data store with access controls. Persist user’s PII and keep secret key for authentication with vendor APIs. Secure storage mechanism to protect sensitive data.
- Credential Manager: Enable users to create, retrieve, update, and delete PII credentials for accessing Azure DevOps and GitHub APIs. Includes encrypted secrets. Provide tools for safely connecting to code repository platforms.

## Style Guidelines:

- Primary color: Saturated Blue (#4285F4) to reflect trust, security, and connectivity.
- Background color: Light grayish-blue (#E8F0FE) to provide a clean and professional backdrop.
- Accent color: Analogous teal (#0F9D58) to create contrast and highlight key interactive elements.
- Body and headline font: 'Inter', a sans-serif font known for its modern and neutral appearance, suitable for both headlines and body text.
- Use simple, clear icons from a library like Font Awesome or Material Icons to represent actions and data types.
- Employ a clean, card-based layout to present API credentials and options in an organized and intuitive manner.
- Incorporate subtle transitions and feedback animations on user interactions (e.g., saving credentials) to enhance the user experience.