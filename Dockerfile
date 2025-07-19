#stage 1:Build react app
FROM node:22-alpine as build

#set working directory inside container
WORKDIR /app

#copy package.json and install dependencies
COPY package*.json ./
RUN npm install

#copy the rest of the projects
COPY . .

#Build the app
RUN npm run build

#stage 2:Serve with Nginx
FROM nginx:alpine


# Copy build folder to Nginx's default public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

#StartNginx when container runs
CMD ["nginx", "-g", "daemon off;"]

