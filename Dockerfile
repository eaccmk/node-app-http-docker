#### Author : https://github.com/eaccmk ###

# Use and install node v20 first [ April 2024]
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4040
CMD [ "node", "app.js", "--host", "0.0.0.0" ]
