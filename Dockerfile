# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Next.js globally
RUN npm install -g next

# Debugging: Verify if 'next' is installed
RUN npm list -g next

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "run", "dev"]
