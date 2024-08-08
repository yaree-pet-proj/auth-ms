FROM node:22

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY . .

RUN chmod +x /app/scripts/prestart.sh

EXPOSE 3000

CMD ["npm", "start"]
