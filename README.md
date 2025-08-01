# Magical LLM Challenge

## Overview 🗒️

Welcome to mini Autonomous Automation Platform (AAP).

## Setup ⚙️

Before you run or start anything, make sure to create `.env` file and add the necessary variables as described in the `.env.example`, oh and don't for get `npm install` 💀.

## How To Run ▶️
There are only 3 scripts that you can run to start the AAP which are the agent, api & cron.

## AGENT 🤖
To start the agent, just run

```bash
npm run dev

OR

yarn dev
```

Once it starts, it will open a chromium window and you should see the web forms populated accordingly. 

If you want to pass custom dataset as arguments, since it was tedious to pass in first name, last name.... one by one, I have created a folder called `_data`, where you create a text file with any name, and write all your custom dataset in natural language and then pass the filename as an argument when running the agent as such

```bash
npm run dev --filename=data1

OR

yarn dev --fileName=data3
```

> The variable name "filename" can be in small or camelCase

> When writing the file name of the file, ignore the extension

> If you have multiple dataset entries, i.e multiple patients for now, I just reload the page and reinsert them after 2 seconds delay

## API 🔗
To start the API, you can run

```bash
npm run start:api

OR

yarn start:api
```

Once it is running successfully, you can test its running properly by navigating to:

```bash
GET 

localhost:PORT/api/hello
```

> Port is the value you have set in the `.env` variable, if you didn't set the value, it will default to `3000`.

You should see `"Hello from Automation API!"` as the response, then you can navigate to

```bash
POST

localhost:PORT/api/run-workflow
```
> This endpoint is POST request that expects text payload, you can use the sample below.

```
First Name: John
Last Name: Doe
Date of birth: 1990-01-01
Medical ID: 91927885
Medical Information:
  - Gender: Male
  - Blood Type: A+
  - Allergies: Peanuts
  - Current Medications: Panadol
Emergency Contact:
  - Name: Sam Smith
  - Phone: +1234567890

```
Thats about it, once you pass the payload in natural language text, the endpoint will run accordingly.

## CRON ⏰
To start the cron to run every 5 minutes, you will need to run

```bash
npm run start:cron

OR

yarn start:cron
```
Pretty much as explained above, if you want to pass custom dataset, simple create the file in the `_data` and pass the name of the file as `arg`.


