# Architecture Overview

## System Design
This section outlines the overall architecture of the Quotation system, detailing the modular components and how they interact with each other.

## Tech Stack Overview
The following technologies are utilized in the Quotation system:
- Backend: Node.js, Express
- Frontend: React, Redux
- Database: MongoDB
- Queue: RabbitMQ
- Caching: Redis
- Cloud: AWS (S3, EC2)

## Folder Structure Explanation
The folder structure is organized as follows:
```
/quotation
├── /src
│   ├── /components  # Reusable components
│   ├── /pages       # Page components
│   ├── /services    # API services
│   ├── /models      # Database models
│   ├── /utils       # Utility functions
└── /public          # Static files
```

## Data Flow Diagrams Description
Data flow diagrams illustrate the movement of data within the system, showing how requests are processed:
- Diagram 1: User request flow
- Diagram 2: Data processing flow

## Scalability Notes
- Ensure stateless services for horizontal scaling.
- Utilize load balancers for distributing traffic.
- Consider using microservices for specific modules to enhance scalability.

This document serves as a comprehensive overview of the architecture for future reference and onboarding.