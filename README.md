# Santa App

## Overview

The Santa App is a web application designed for children to submit their Christmas wishes to Santa. The application includes a client-side interface for entering user details and wishes, and a server-side component to validate the user information against provided datasets.

## Features

- **User Validation**: Checks if the user is registered and if their age is less than 10 years.
- **Form Submission**: Allows children to submit their Christmas wishes.
- **Error Handling**: Provides feedback if the user is not registered or is too old.
- **Success Page**: Displays a confirmation message when the wish is successfully submitted.

## Project Structure

```
my-new-app/
├── .idea/
├── dist/
├── node_modules/
├── public/
├── server/
│   ├── controllers/
│   │   ├── requestController.js
│   │   └── ...
│   ├── services/
│   │   ├── dataService.js
│   │   ├── emailService.js
│   │   └── ...
│   ├── utils/
│   │   ├── validationUtils.js
│   │   └── ...
│   ├── server.js
│   ├── package.json
│   ├── ...
├── src/
│   ├── components/
│   │   ├── ErrorPage.tsx
│   │   ├── SuccessPage.tsx
│   │   └── ...
│   ├── App.tsx
│   ├── main.tsx
│   ├── ...
├── .eslint.cjs
├── .gitignore
├── index.html
├── jest.config.cjs
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── ...
```

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/JunaKh/test-axa.git
cd my-new-app
```

2. Install dependencies for both client and server:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd src
npm install

# Install server dependencies
cd ../server
npm install
```

3. Start the development server:

```bash
# In one terminal, start the client
npm run dev

# In another terminal, start the server
cd server
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a user ID and a Christmas wish, then submit the form.
3. Depending on the validation, you will either see a success page or an error message.

## Testing

To run tests for both client and server:

```bash
# For client tests
npm test

# For server tests
cd server
npm test
```

## Architecture

The Santa App uses a client-server architecture to separate concerns and improve scalability:

- **Client-Side**: Built with React, the client-side provides an interactive interface for users to enter their details and wishes. It handles form validation and displays appropriate success or error messages based on the server response.
- **Server-Side**: Built with Express.js, the server-side handles user validation by fetching data from external JSON files. It ensures that only valid users can submit their wishes and enforces age restrictions.

### Server-Side Components

1. **Controllers**:
    - `requestController.js`: Handles the form submission and validation logic. It coordinates with the services to validate user data and send responses back to the client.

2. **Services**:
    - `dataService.js`: Fetches user data and profiles from external JSON files.
    - `emailService.js`: Manages the email sending logic, including adding pending requests and sending emails at regular intervals.

3. **Utilities**:
    - `validationUtils.js`: Contains helper functions for validation, such as calculating age and validating date formats.

### Data Validation

The server-side validation logic is implemented in `requestController.js` using the `validateUserData` function from `dataService.js`, which performs the following checks:

1. **User Existence**: The function checks if the user ID exists in the `users.json` dataset.
2. **Profile Existence**: It then verifies if the user profile exists in the `userProfiles.json` dataset.
3. **Birthdate Validation**: The function parses the birthdate and checks if it's in a valid format.
4. **Age Calculation**: It calculates the user's age based on the birthdate and ensures the user is less than 10 years old.

This logic ensures that only valid and appropriate users can submit their wishes.

### Testing Strategy

The testing strategy involves unit tests for both client and server components to ensure they function as expected.

- **Client Tests**: Tests are written using Jest and React Testing Library to verify that the components render correctly and handle user interactions properly.
- **Server Tests**: The server-side tests use Jest and Supertest to validate the API endpoints and the data validation logic.

### Justification for Architecture and Implementation

### Separation of Concerns

By separating the client and server, we ensure that the application is modular and each part can be developed, tested, and maintained independently. This separation allows us to focus on the specific needs of each component without affecting the other.

### Scalability

This architecture allows for independent scaling of the client and server components. For example, during high traffic periods, we can scale the server independently of the client, ensuring that the application remains responsive and performs well under load.

### Security

Sensitive validation logic is kept on the server-side, preventing manipulation from the client-side. This approach ensures that the integrity of the data is maintained and that only authorized users can access certain functionalities.

### Flexibility

The architecture allows for easy integration with other services or migration to a microservices architecture if needed in the future. This flexibility ensures that the application can grow and evolve as requirements change.

### Detailed Validation and Testing

The validation logic ensures that only valid users can submit their wishes. By writing comprehensive tests, we ensure that the validation logic works correctly and handles various edge cases. This testing strategy helps maintain the reliability and robustness of the application.

## Thoughts on Development

Initially, I considered using a separate repository for the client and server parts of the application. However, this approach proved to be time-consuming and complex for the scope of this project. Instead, I decided to build upon the project provided for the test assignment and enhance both the client and server components within a single repository. This approach allowed for easier management and faster development, while still maintaining a clear separation between the client and server codebases.

### Email Sending and Tests

I wrote the logic for sending emails and included tests for this functionality. However, since the email sending requires my personal credentials, I decided not to include these in the code for security reasons. Instead, I have left placeholders and explanations on how to set this up for demonstration purposes.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.
```

Этот README файл включает обновленную архитектуру проекта с добавлением контроллеров и утилит. Если потребуется дополнительная информация или изменения, пожалуйста, дайте знать.
