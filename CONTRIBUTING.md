# Contributing to Contribution Hub Manager

First off, thank you for considering contributing to Contribution Hub Manager! It's people like you that make this project such a great tool for developers worldwide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior by creating an issue or contacting [@PROxZIMA](https://github.com/PROxZIMA).

## Getting Started

### Ways to Contribute

- **Report Bugs**: Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Suggest Features**: Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **Improve Documentation**: Help make our docs clearer and more comprehensive
- **Submit Code**: Fix bugs, implement features, or improve performance
- **Write Tests**: Help improve our test coverage
- **Review Pull Requests**: Help review code changes from other contributors

### Prerequisites

Before contributing, ensure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/) for version control
- A Firebase project (for testing integrations)
- Google Cloud project with Secret Manager enabled
- Familiarity with React, Next.js, and TypeScript

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/ContributionManager.git
   cd ContributionManager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open [http://localhost:9002](http://localhost:9002)
   - Ensure the application loads without errors

## Development Process

### Branch Naming

Use descriptive branch names:
- `feature/add-new-provider` - New features
- `fix/authentication-bug` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/credential-management` - Code refactoring
- `test/add-unit-tests` - Adding tests

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples:
```
feat: add Azure DevOps credential management
fix: resolve Firebase authentication timeout
docs: update API integration examples
refactor: improve credential validation logic
test: add unit tests for auth service
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Changes to the build process or auxiliary tools

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use strict mode settings
- Avoid `any` types; use proper typing

```typescript
// Good
interface User {
  id: string;
  email: string;
  displayName: string;
}

// Avoid
const user: any = getUserData();
```

### React Components

- Use functional components with hooks
- Implement proper error boundaries
- Use meaningful component and prop names
- Separate concerns (UI, logic, data)

```typescript
// Good
interface CredentialCardProps {
  credential: GitHubCredential;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CredentialCard({ credential, onEdit, onDelete }: CredentialCardProps) {
  // Component implementation
}
```

### File Structure

```
src/
  app/                 # Next.js app router pages
  components/          # Reusable UI components
    ui/               # shadcn/ui components
  contexts/           # React contexts
  hooks/              # Custom hooks
  lib/                # Utility functions
    firebase/         # Firebase configuration
    utils.ts         # General utilities
  types/              # TypeScript type definitions
```

### Styling

- Use Tailwind CSS for styling
- Follow component-based styling approach
- Use CSS modules for complex styles when needed
- Ensure responsive design (mobile-first)

### State Management

- Use React hooks for local state
- Use React Context for shared state
- Implement proper loading and error states
- Follow the principle of lifting state up

## Testing Guidelines

### Unit Tests

- Write tests for all utility functions
- Test component logic and interactions
- Use descriptive test names
- Aim for good coverage of critical paths

```typescript
// Example test
describe('validateCredentials', () => {
  it('should return true for valid GitHub credentials', () => {
    const credentials = { username: 'test', token: 'ghp_valid' };
    expect(validateCredentials(credentials)).toBe(true);
  });
});
```

### Integration Tests

- Test Firebase integration
- Test API endpoints
- Test user workflows
- Test error scenarios

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Submitting Changes

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use our [pull request template](.github/pull_request_template.md)
   - Provide clear description of changes
   - Link related issues
   - Add screenshots if UI changes

### Pull Request Guidelines

- Keep changes focused and atomic
- Write clear, descriptive titles and descriptions
- Update documentation for user-facing changes
- Ensure all checks pass (linting, tests, build)
- Be responsive to feedback and reviews
- Squash commits before merging if requested

### Code Review Process

1. **Automated Checks**: All PRs must pass CI/CD checks
2. **Peer Review**: At least one maintainer review required
3. **Testing**: Manual testing for UI/UX changes
4. **Documentation**: Ensure documentation is updated
5. **Security Review**: Security-sensitive changes get extra scrutiny

## Development Guidelines

### Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Follow Firebase security best practices
- Implement proper input validation
- Use HTTPS for all external communications

### Performance

- Optimize bundle size
- Implement proper loading states
- Use React.memo for expensive components
- Optimize images and assets
- Monitor Core Web Vitals

### Accessibility

- Follow WCAG 2.1 guidelines
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers

### Browser Support

- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Test on both desktop and mobile
- Ensure graceful degradation
- Use progressive enhancement

## Getting Help

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

### Communication

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Security**: Email security issues privately to maintainers

### Maintainer Response Time

- We aim to respond to issues within 48 hours
- Pull requests are typically reviewed within a week
- Critical security issues are prioritized

## Recognition

Contributors will be recognized in:
- README.md contributor section
- Release notes for significant contributions
- Annual contributor appreciation posts

Thank you for contributing to Contribution Hub Manager!