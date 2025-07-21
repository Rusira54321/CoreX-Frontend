#stage 1:Build react app
FROM node:22-alpine as build

#set working directory inside container
WORKDIR /app

#copy package.json and install dependencies
COPY package*.json ./
RUN npm install

#copy the rest of the projects
COPY . .

#Expose port 5170
EXPOSE 3000
#create the react app
CMD ["npm", "run", "dev", "--", "--host"]