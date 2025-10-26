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

* [![Next.js][nextjs-badge]][nextjs-url]
* [![React][react-badge]][react-url]
* [![TypeScript][typescript-badge]][typescript-url]
* [![Tailwind CSS][tailwind-badge]][tailwind-url]
* [![Firebase Firestore][firestore-badge]][firestore-url]
* [![Google Secret Manager][secretmanager-badge]][secretmanager-url]
* [![Oracle OCI][oracle-oci-badge]][oracle-oci-url]
* [![Docker][docker-badge]][docker-url]

[nextjs-badge]: https://img.shields.io/badge/Next.js-15.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[nextjs-url]: https://nextjs.org/
[react-url]: https://reactjs.org/
[react-badge]: https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black
[typescript-badge]: https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[firestore-badge]: https://img.shields.io/badge/Firebase_Firestore-Database-FFCA28?style=for-the-badge&logo=firebase&logoColor=white
[firestore-url]: https://firebase.google.com/products/firestore
[secretmanager-badge]: https://img.shields.io/badge/Google_Secret_Manager-Security-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white
[secretmanager-url]: https://cloud.google.com/secret-manager
[oracle-oci-badge]: https://img.shields.io/badge/Oracle_OCI-Hosting-C74634?style=for-the-badge&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMCIgaWQ9ImthdG1hbl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxNy4yIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggY2xhc3M9InN0MCIgZD0ibTEwMCAyMDBjLTU1LjYgMC0xMDAtNDQuNC0xMDAtMTAwczQ0LjQtMTAwIDEwMC0xMDBoMTE3LjJjNTUuNiAwIDEwMCA0NC40IDEwMCAxMDBzLTQ0LjQgMTAwLTEwMCAxMDBoLTExNy4yem0xMTQuMi0zNS40YzM2LjQgMCA2NC42LTI5LjMgNjQuNi02NC42IDAtMzYuNC0yOS4zLTY0LjYtNjQuNi02NC42aC0xMTEuMmMtMzYuNCAwLTY0LjYgMjkuMy02NC42IDY0LjZzMjkuMyA2NC42IDY0LjYgNjQuNmgxMTEuMnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=&logoColor=white
[oracle-oci-url]: https://www.oracle.com/in/cloud/
[docker-badge]: https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/

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
        subgraph "Docker Compose Services"
            subgraph "Frontend Container"
                FR[Frontend App<br/>contribution-manager-app]
                FR -.-> |Token Management| J2[Token Management UI]
                FR -.-> |User Management| J1[User Registration/Login]
            end
            subgraph "Backend Containers"
                C[Contribution.Hub API<br/>backend-hub]
                D[Provider Factory]
                E[Contribution.AzureDevOps API<br/>backend-azuredevops]
                F[Contribution.GitHub API<br/>backend-github]
                G[Contribution.Provider API<br/>backend-provider]
                DB[Valkey Cache]
            end
        end
    end
    
    %% External APIs
    E ---> K1
    F ---> K2
    G ---> K3

    C --> D
    D --> E
    D --> F
    D --> G
    CR --> |"/_api/az/* → backend-azuredevops:5000"| E
    CR --> |"/_api/gh/* → backend-github:5000"| F
    CR --> |"/_api/provider/* → backend-provider:5000"| G
    CR --> |"/_api/* → backend-hub:5000"| C
    CR --> |"/ → frontend:3000"| FR
    E --> DB
    F --> DB
    G --> DB
    
    %% Data Access
    C --> I
    C --> H
    
    %% Application Logic Flow
    J2 -.-> I[Google Secret Manager]
    J2 -.-> H
    J1 -.-> H[Firebase Firestore]
    
    %% External Services
    subgraph "External Services"
        K1[Azure DevOps API SDK]
        K2[GitHub GraphQL API]
        K3[Future APIs]
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
    class C,D,F,E,G,DB api
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

<img src="./.github/catppuccin_cat_on_line.svg" width="100%" title="Footer">

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/PROxZIMA">PROxZIMA</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>