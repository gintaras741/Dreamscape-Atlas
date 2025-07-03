# Dreamscape Atlas

## Project Overview

Dreamscape Atlas is a comprehensive web application specifically designed for **Dungeons & Dragons (D&D)** players, Dungeon Masters (DMs), and homebrew creators to build, organize, and explore their fictional worlds. Whether you're crafting a sprawling fantasy realm, a detailed campaign setting, or a collection of one-shot adventures, Dreamscape Atlas provides the tools to bring your D&D visions to life. It acts as a central repository for all your lore, characters, locations, timelines, magic items, and more, allowing for intricate connections and easy navigation within your created narratives and campaigns.

## Project Status

### 🚧 Work in Progress 🚧

This project is currently under active development and has not yet reached a working state. Key features are being implemented, and the application is subject to rapid changes.


## Key Features

-   **Hierarchical World Organization:** Structure your D&D world with interconnected articles for locations (cities, dungeons, wilderness), characters (NPCs, factions), organizations, magic items, spells, monsters, and more.

-   **Rich Text Editing:** Create detailed descriptions with rich text formatting, images, and embedded links, perfect for stat blocks, lore entries, and quest details.

-   **Relationship Mapping:** Define and visualize relationships between different elements of your world (e.g., character A is allied with faction B, location X is part of region Y, item Z is found in dungeon D).

-   **Timeline Management:** Build and manage chronological events within your campaign's history or a world's deep lore.

-   **Interactive Maps:** Upload and annotate campaign maps, regional maps, or dungeon layouts, linking points of interest directly to your lore articles.

-   **Private & Public Content:** Control the visibility of your world's elements, keeping campaign notes private or sharing finished lore with your players or the wider D&D community.

-   **Search & Navigation:** Easily find and navigate through your extensive D&D world data, making game prep and in-session lookups a breeze.

## Tech Stack

Dreamscape Atlas is built using a modern and robust technology stack to ensure performance, scalability, and a great development experience.

-   **Frontend:**

    -   **Next.js:** A React framework for building fast, scalable, and SEO-friendly web applications.

    -   **TypeScript:** For type-safe JavaScript development.

    -   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

-   **Backend:**

    -   **ASP.NET Web API:** A powerful framework for building RESTful services with C# and the .NET platform.

-   **Database:**

    -   **PostgreSQL:** A powerful, open-source object-relational database system known for its reliability, feature robustness, and performance.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (LTS recommended)

-   .NET SDK

-   PostgreSQL

### Installation

1.  **Clone the repository:**

    ```
    git clone https://github.com/gintaras741/Dreamscape-Atlas/
    cd Dreamscape-Atlas

    ```

2.  **Frontend Setup:**

    ```
    cd frontend
    npm install
    npm run dev

    ```

    The frontend will typically run on `http://localhost:3000`.

3.  **Backend Setup:**

    ```
    cd backend
    dotnet restore
    dotnet run

    ```

    The backend API will typically run on `http://localhost:5014` (check console output for exact URL).

4.  **Database Setup:**

    -   Ensure your PostgreSQL server is running.

    -   Configure your database connection string in `appsettings.Development.json` (and `appsettings.json` for production) in your backend project.

    -   Run database migrations (if using Entity Framework Core) or set up your schema manually.
