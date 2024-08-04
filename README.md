# Invoice Management System

This project is a Next.js application designed to manage invoices through CRUD operations (Create, Read, Update, Delete). It also includes features to generate PDF files for individual invoices and Excel files for all invoices. The application utilizes Shadcn for UI components, TailwindCSS for styling, Prisma as the ORM, PostgreSQL as the database, and Lucia Auth for authentication.

## Features

- **CRUD Operations**: Create, read, update, and delete invoices.
- **PDF Generation**: Generate a PDF for a single invoice.
- **Excel Export**: Export all invoices to an Excel file.
- **Responsive Design**: Utilizes TailwindCSS for a responsive and modern UI.
- **Database Integration**: Uses Prisma with PostgreSQL for efficient data management.
- **Authentication**: Includes user authentication with Lucia Auth.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Shadcn**: A UI component library for React.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Prisma**: A modern ORM for Node.js and TypeScript.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Lucia Auth**: An authentication library for Next.js applications.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 14.x or later.
- **npm**: Version 6.x or later.
- **PostgreSQL**: Installed and running.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dannytolla/invoice-manager
   cd invoice-manager
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up the database**:

   - Create a PostgreSQL database.
   - Update the `.env` file with your database credentials.

4. **Run Prisma migrations**:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

## Usage

1. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

2. **CRUD Operations**:

   - **Create**: Click on the "Add new" button to add a new invoice.
   - **Read**: View all invoices on the homepage.
   - **Update**: Click on an invoice action dropdown to edit an invoice.
   - **Delete**: Click on the delete button on action dropdown to delete an invoice.

3. **PDF Generation**:

   - Click on the "Generate PDF" button next to an invoice to download a PDF file.

4. **Excel Export**:
   - Click on the "Export Excel" button to download an Excel file containing all invoices.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the maintainers directly.

---

Happy Coding! 🚀
