import { z } from 'zod';

export const AzureCredentialsSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  organization: z.string().min(1, { message: 'Organization is required.' }),
  pat: z
    .string()
    .min(1, { message: 'Personal Access Token (PAT) is required.' }),
});

export const GitHubCredentialsSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  pat: z
    .string()
    .min(1, { message: 'Personal Access Token (PAT) is required.' }),
});

export const EmailAuthSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export const EmailSignUpSchema = EmailAuthSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type AzureFormValues = z.infer<typeof AzureCredentialsSchema>;
export type GitHubFormValues = z.infer<typeof GitHubCredentialsSchema>;
export type EmailAuthValues = z.infer<typeof EmailAuthSchema>;
export type EmailSignUpValues = z.infer<typeof EmailSignUpSchema>;

// Types for credentials without PAT tokens (for Firestore storage)
export type AzureCredentialsDataOnly = Omit<AzureFormValues, 'pat'>;
export type GitHubCredentialsDataOnly = Omit<GitHubFormValues, 'pat'>;
