<a id="readme-top"></a>

<div align="center">
  <img src="public/logo.png" alt="Contribution Hub Manager Logo" width="200">
  <h3>Contribution Hub Manager</h3>
  <p>
    <strong>A secure web interface for managing developer credentials and accessing unified contribution data</strong>
  </p>

  <!-- Badges -->
  <p>
    <a href="https://github.com/PROxZIMA/ContributionManager/actions/workflows/Contribution.Manager.VPS.yaml">
      <img src="https://github.com/PROxZIMA/ContributionManager/actions/workflows/Contribution.Manager.VPS.yaml/badge.svg" alt="Contribution Hub Manager">
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/github/license/PROxZIMA/ContributionManager" alt="License">
    </a>
  </p>
</div>

## Table of Contents

- [About The Project](#about-the-project)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## About The Project

Contribution Hub Manager is a secure web application that serves as the frontend interface for the [Contribution Hub API](https://github.com/PROxZIMA/ContributionAPI). It enables developers to manage their authentication credentials for multiple platforms (GitHub, Azure DevOps) in a secure, encrypted manner and visualize their aggregated contributions across all platforms.

<div align="center">
  <img src="https://chm.proxzima.dev/_api/contributions/svg?userId=6SqDR5hL6rSnVZwAycOX3BBFxjK2&year=2025&darkMode=true&" alt="Contribution Activity">
</div>

### Key Features

- **Secure Authentication**: Sign-in/sign-up using Google or GitHub via Firebase Authentication
- **Credential Management**: Securely store, update, and delete PATs for GitHub and Azure DevOps
- **Encrypted Storage**: All sensitive data is encrypted using Google Secret Manager
- **Contribution Visualization**: View aggregated contribution data across multiple platforms
- **User-Friendly Interface**: Modern, responsive design with real-time feedback

### Built With

* [![Next.js](https://img.shields.io/badge/Next.js-15.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
* [![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
* [![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
* [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
* [![Firebase Firestore](https://img.shields.io/badge/Firebase_Firestore-Database-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/products/firestore)
* [![Google Secret Manager](https://img.shields.io/badge/Google_Secret_Manager-Security-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/secret-manager)
* [![Azure Web Apps](https://img.shields.io/badge/Azure_Web_Apps-Hosting-0078D7?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iNC40IiB5MT0iMTEuNDgiIHgyPSI0LjM3IiB5Mj0iNy41MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZjZmNmYyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iMTAuMTMiIHkxPSIxNS40NSIgeDI9IjEwLjEzIiB5Mj0iMTEuOSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2NjYyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZjZmNmYyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iMTQuMTgiIHkxPSIxMS4xNSIgeDI9IjE0LjE4IiB5Mj0iNy4zOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2NjYyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZjZmNmYyIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJhIiBjeD0iMTM0MjguODEiIGN5PSIzNTE4Ljg2IiByPSI1Ni42NyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguMTUgMCAwIC4xNSAtMjAwNS4zMyAtNTE4LjgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0xNC4yMSAxNS43MkE4LjUgOC41IDAgMDEzLjc5IDIuMjhsLjA5LS4wNmE4LjUgOC41IDAgMDExMC4zMyAxMy41IiBmaWxsPSJ1cmwoI2EpIi8+PHBhdGggZD0iTTYuNjkgNy4yM2ExMyAxMyAwIDAxOC45MS0zLjU4IDguNDcgOC40NyAwIDAwLTEuNDktMS40NCAxNC4zNCAxNC4zNCAwIDAwLTQuNjkgMS4xIDEyLjU0IDEyLjU0IDAgMDAtNC4wOCAyLjgyIDIuNzYgMi43NiAwIDAxMS4zNSAxLjF6TTIuNDggMTAuNjVhMTcuODYgMTcuODYgMCAwMC0uODMgMi42MiA3LjgyIDcuODIgMCAwMC42Mi45MmMuMTguMjMuMzUuNDQuNTUuNjVhMTcuOTQgMTcuOTQgMCAwMTEuMDgtMy40NyAyLjc2IDIuNzYgMCAwMS0xLjQyLS43MnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii42Ii8+PHBhdGggZD0iTTMuNDYgNi4xMWExMiAxMiAwIDAxLS42OS0yLjk0IDguMTUgOC4xNSAwIDAwLTEuMSAxLjQ1QTEyLjY5IDEyLjY5IDAgMDAyLjI0IDdhMi42OSAyLjY5IDAgMDExLjIyLS44OXoiIGZpbGw9IiNmMmYyZjIiIG9wYWNpdHk9Ii41NSIvPjxjaXJjbGUgY3g9IjQuMzgiIGN5PSI4LjY4IiByPSIyLjczIiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0iTTguMzYgMTMuNjdhMS43NyAxLjc3IDAgMDEuNTQtMS4yNyAxMS44OCAxMS44OCAwIDAxLTIuNTMtMS44NiAyLjc0IDIuNzQgMCAwMS0xLjQ5LjgzIDEzLjEgMTMuMSAwIDAwMS40NSAxLjI4IDEyLjEyIDEyLjEyIDAgMDAyLjA1IDEuMjUgMS43OSAxLjc5IDAgMDEtLjAyLS4yM3pNMTQuNjYgMTMuODhhMTIgMTIgMCAwMS0yLjc2LS4zMi40MS40MSAwIDAxMCAuMTEgMS43NSAxLjc1IDAgMDEtLjUxIDEuMjQgMTMuNjkgMTMuNjkgMCAwMDMuNDIuMjRBOC4yMSA4LjIxIDAgMDAxNiAxMy44MWExMS41IDExLjUgMCAwMS0xLjM0LjA3eiIgZmlsbD0iI2YyZjJmMiIgb3BhY2l0eT0iLjU1Ii8+PGNpcmNsZSBjeD0iMTAuMTMiIGN5PSIxMy42NyIgcj0iMS43OCIgZmlsbD0idXJsKCNjKSIvPjxwYXRoIGQ9Ik0xMi4zMiA4LjkzYTEuODMgMS44MyAwIDAxLjYxLTEgMjUuNSAyNS41IDAgMDEtNC40Ni00LjE0IDE2LjkxIDE2LjkxIDAgMDEtMi0yLjkyIDcuNjQgNy42NCAwIDAwLTEuMDkuNDIgMTguMTQgMTguMTQgMCAwMDIuMTUgMy4xOCAyNi40NCAyNi40NCAwIDAwNC43OSA0LjQ2eiIgZmlsbD0iI2YyZjJmMiIgb3BhY2l0eT0iLjciLz48Y2lyY2xlIGN4PSIxNC4xOCIgY3k9IjkuMjciIHI9IjEuODkiIGZpbGw9InVybCgjZCkiLz48cGF0aCBkPSJNMTcuMzUgMTAuNTRsLS4zNS0uMTctLjMtLjE2aC0uMDZsLS4yNi0uMjFoLS4wN0wxNiA5LjhhMS43NiAxLjc2IDAgMDEtLjY0LjkyYy4xMi4wOC4yNS4xNS4zOC4yMmwuMDguMDUuMzUuMTkuODYuNDVhOC42MyA4LjYzIDAgMDAuMjktMS4xMXoiIGZpbGw9IiNmMmYyZjIiIG9wYWNpdHk9Ii41NSIvPjxjaXJjbGUgY3g9IjQuMzgiIGN5PSI4LjY4IiByPSIyLjczIiBmaWxsPSJ1cmwoI2IpIi8+PGNpcmNsZSBjeD0iMTAuMTMiIGN5PSIxMy42NyIgcj0iMS43OCIgZmlsbD0idXJsKCNjKSIvPjwvc3ZnPg==&logoColor=white)](https://azure.microsoft.com/en-us/products/app-service/web)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Architecture

ContributionManager follows a microservices architecture pattern, working in conjunction with the [Contribution Hub API](https://github.com/PROxZIMA/ContributionAPI).

### System Overview

```mermaid
---
title: Contribution Hub - CI/CD & VPS Deployment Architecture
---

graph TB
    %% CI/CD Pipeline
    subgraph "CI/CD Pipeline - GitHub Actions"
        GA[GitHub Actions] --> GB[Build Docker Images]
        GB --> GC[Push to GHCR]
        GC --> GD[SSH Deploy to VPS]
    end
    
    %% CI/CD Flow
    GD -.-> |Deploy via SSH| VPS
    GC -.-> |Push Images| GHCR
    GHCR -.-> |Pull Images| VPS
    
    %% Users & Domain
    U[Users] --> CD[chm.proxzima.dev]
    CD --> CR[Caddy Server]

    %% VPS Deployment Infrastructure
    subgraph "VPS Deployment / Caddy Reverse Proxy + TLS"
        CR --> |"/_api/hub/* → backend-hub:5000"| B2
        CR --> |"/ → frontend:3000"| FR
        CR --> |"/_api/gh/* → backend-github:5000"| F
        CR --> |"/_api/provider/* → backend-provider:5000"| G
        subgraph "Docker Compose Services"

            subgraph "Frontend Container"
                FR[Frontend App<br/>contribution-manager-app]
                FR -.-> |Token Management| J2[Token Management UI]
                FR -.-> |User Management| J1[User Registration/Login]
            end
            
            subgraph "Backend Containers"
                B2[Contribution.Hub API<br/>backend-hub]
                B2 --> C[Contribution Aggregator]
                C --> D[Provider Factory]
                E[Contribution.AzureDevOps API<br/>backend-azuredevops]
                F[Contribution.GitHub API<br/>backend-github]
                G[Contribution.Provider API<br/>backend-provider]
            end
        end

        D --> E
        D --> F
        D --> G
        CR --> |"/_api/az/* → backend-azuredevops:5000"| E
    end
    
    %% Data Access
    C --> I
    C --> H
    
    %% Application Logic Flow
    J2 -.-> I[Google Secret Manager]
    J2 -.-> H
    J1 -.-> H[Firebase Firestore]
    
    %% External APIs
    E --> K2[Azure DevOps API SDK]
    F --> K1[GitHub GraphQL API]
    G --> K3[Future APIs]
    
    %% External Services
    subgraph "External Services"
        K1
        K2
        K3
        subgraph "Data & Security Layer"
            H
            I
        end
        subgraph "Container Registry"
            GHCR[GitHub Container Registry<br/>ghcr.io/proxzima/*]
        end
    end
    
    %% Styling
    classDef frontend fill:#e3f2fd,stroke:#1976d2,color:#000
    classDef api fill:#ede7f6,stroke:#7b1fa2,color:#000
    classDef infrastructure fill:#e8f5e9,stroke:#388e3c,color:#000
    classDef data fill:#fff8e1,stroke:#f57c00,color:#000
    classDef external fill:#fce4ec,stroke:#c2185b,color:#000
    classDef cicd fill:#f3e5f5,stroke:#8e24aa,color:#000
    
    class FR,J1,J2 frontend
    class B2,C,D,F,E,G api
    class CD,CR,VPS,GHCR infrastructure
    class H,I data
    class K1,K2,K3 external
    class GA,GB,GC,GD cicd
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** or **yarn**
- Firebase project with Authentication and Firestore enabled
- Google Cloud project with Secret Manager API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PROxZIMA/ContributionManager.git
   cd ContributionManager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Google Secret Manager
   GOOGLE_CLOUD_PROJECT_ID=your_gcp_project_id
   GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
   
   # Contribution Hub API
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5298
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:9002](http://localhost:9002)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

### Authentication
1. Sign in with Google or GitHub
2. Complete OAuth flow
3. Access the dashboard

### Managing Credentials
- **GitHub**: Add username and Personal Access Token with `read:user` scope
- **Azure DevOps**: Add email, organization, and PAT with Code/Identity/Work Items read permissions

### Viewing Contributions
- View aggregated statistics across platforms
- Interactive contribution calendar
- Filter by platform or date range

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API Documentation

For detailed API documentation and interactive examples, visit:
**[https://chm.proxzima.dev/home#endpoint](https://chm.proxzima.dev/home#endpoint)**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

We welcome contributions from the community! ContributionAPI is an open-source project, and we appreciate any help to make it better.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact

### Project Maintainer
**PROxZIMA** - [@PROxZIMA](https://github.com/PROxZIMA)

### Project Links
- **Project Repository**: [https://github.com/PROxZIMA/ContributionManager](https://github.com/PROxZIMA/ContributionManager)
- **Issue Tracker**: [https://github.com/PROxZIMA/ContributionManager/issues](https://github.com/PROxZIMA/ContributionManager/issues)

### Support

- **Discussions**: Use [GitHub Discussions](https://github.com/PROxZIMA/ContributionManager/discussions) for community support
- **Bug Reports**: Use our [issue templates](.github/ISSUE_TEMPLATE/) for bug reports
- **Feature Requests**: Submit feature requests through GitHub Issues

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/PROxZIMA">PROxZIMA</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>