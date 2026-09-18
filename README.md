
# Snippet Vault

> A web application for creating, organizing, searching, and sharing code snippets.

Snippet Vault is a full-stack learning project built while exploring modern
React and TypeScript development with Next.js, PostgreSQL, and Prisma.

## Overview

Snippet Vault allows users to create and manage code snippets, organize them
with programming languages and tags, and find snippets through search and
filtering.

Snippets are publicly accessible and belong to their respective authors.
Only the author of a snippet can update or delete it.

The project was built primarily as a learning exercise to explore full-stack
application development, authentication, authorization, relational data,
search and filtering, and reusable UI patterns.

## Features

- Create and manage code snippets
- Syntax highlighting for supported programming languages
- Search snippets by title and description
- Filter snippets by programming language
- Filter snippets by tags
- Organize snippets with tags
- Browse a user's public snippets
- Public user profiles
- Author-based access control
- Copy snippets to the clipboard
- Light and dark themes
- Responsive interface

## Tech Stack

- **Next.js** — application framework and App Router
- **React** — user interface
- **TypeScript** — type safety
- **PostgreSQL** — relational database
- **Prisma** — database access and ORM
- **Better Auth** — authentication
- **Zod** — input validation
- **Tailwind CSS** — styling
- **Shadcn** — UI components
- **Shiki** — syntax highlighting
- **Lucide** — icons

## Domain Model

Snippet Vault is centered around users, snippets, languages, and tags.

```text
User
 │
 └── Snippet
       │
       ├── Language
       │
       └── Tags
             │
             └── Tag
````

A **User** can create multiple snippets.

A **Snippet** contains its title, code, optional description, programming
language, and associated tags.

A **Language** represents the programming language used by a snippet and
stores the corresponding Shiki language identifier used for syntax
highlighting.

A **Tag** provides an additional way to organize and filter snippets.
Snippets and tags have a many-to-many relationship through
`TagsOnSnippets`.

## Access Control

Snippets are associated with their author.

All snippets are publicly accessible, while modification and deletion are
restricted to the user who owns the snippet.

This ownership model was implemented as part of learning authentication,
authorization, and user-scoped data access.

## Search and Filtering

Snippet Vault provides several ways to discover snippets:

- Search by title and description
- Filter by programming language
- Filter by tags
- Browse snippets belonging to a specific user

The same search and filtering capabilities are available when browsing a
user's snippets.

## Development

The project uses the Next.js App Router with TypeScript.

**Prisma** provides database access to PostgreSQL, while **Better Auth**
handles authentication. User input is validated with **Zod**.

The application models snippets and their relationships with users, languages,
and tags using a relational database.

The project was built incrementally while learning full-stack TypeScript
development, so some parts reflect earlier implementation decisions and
experimentation.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL

### Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Configure the required environment variables, then initialize the database:

```bash
pnpm prisma migrate dev
```

Start the development server:

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

### Environment Variables

The application requires configuration for the PostgreSQL database,
authentication, and application settings.

Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Then configure the required values.

## Project Status

**Learning Project**  

Snippet Vault was built while learning modern full-stack web development.

It is a functional learning application that demonstrates several concepts
explored during that learning process, but it is not intended to represent a
production-ready application.

Some areas could be redesigned or extended with the experience gained since
the project was originally built.

## What I Learned

Building Snippet Vault provided hands-on experience with:

- Building full-stack applications with Next.js
- Working with TypeScript across the application
- Designing relational data with PostgreSQL and Prisma
- Authentication and authorization
- User-scoped data access
- Many-to-many relationships
- Search and filtering
- Syntax highlighting with Shiki
- Building reusable UI components
- Managing application state and server/client responsibilities
- Designing application features around a relational domain
