# Scan.com Frontend Challenge

The challenge is to build a UI for this project that allows a user to save their favorite places and display them on a map. A user should be able to add places to their list by choosing a location somehow and/or interacting with a form of some type.

A map should be rendered that display their saved places and updates as they add/remove places.

The UI should be built using React that is rendered as part of this application. A barebones page has been added at `pages/index.tsx`.

An http API is provided to allow persisting, updating, deleting and retrieving places. See the API section below.

## What are we looking for

- Working code that fulfulls the brief
- Clean, well-organised component structure that follows React principles and best practices.
- Attention to accessibilty and semantic markup.
- Appropriate testing to give confidence the UI works as intended.
- Simplicity: We value simplicity as an architectural virtue and a development practice. Solutions should reflect the difficulty of the assigned task, and should not be overly complex.
- Self-explanatory code. An unfamiliar developer should be able to figure out what's going on without the need for huge comments.
- Consideration of errors and edge cases.

It is expected that around 2-4 hours are to be spent on this task.

## Deliverables

Clone or download this repository and follow the instructions below to get started. Add your changes. You should aim to commit as you go and follow good git practices (small commits, well thought-out commit messages, etc).

Send project with your additions to us as as a zip file or [git bundle][git-bundle]. Please do not publish it in a public Github repo (or equivalent) or submit a PR to this repo.

Include a document explaining your approach and any decisions you made as well as any additional requirements and/or commands needed to run the project.

## Getting Started

This is a [Next.js][next] project that renders a React frontend with some API routes to handle CRUD actions for managing saved places.

The data is persisted in an SQLite database. Prisma is used as the ORM to handle the database interaction.

- Check out the repo
- Install dependencies:

  ```bash
  yarn install
  ```

- Define env variables. There is an example .env to get started

  ```bash
  cp .env.example .env
  ```

- Create the DB and run the migrations:

  ```bash
  yarn prisma migrate deploy
  ```

- Run the development server:

  ```bash
  yarn dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Dev notes

- This project is written in TypeScript with strict mode turned on. If you're unfamiliar with TypeScipt you can turn off strict mode in tsconfig.json.
- Jest + react-testing-library is included for unit/component testing, but feel free to add your own testing approach.
- We use [Tailwind][tailwind] at Scan.com and this project is configured to use it. Feel free to use an alternative styling approach.
- Feel free to use any libraries or packages needed to complete the task, but think carefully about introducing new dependencies and the potential performance, maintenance and security implications it may have.

## API

```
type Place = {
  id: string
  name: string
  lat: number
  long: number
  createdAt: string
  updatedAt: string
}

```

### Get Places

```
GET /api/places

200 -> {data: Place[]}

```

### Create Place

```
POST /api/places
{
  name: string
  lat: number
  long: number
}

201 -> {data: Place}
422 -> {errors: string[]}
```

### Update Place

```
PUT /api/places/{id}
{
  name?: string
  lat?: number
  long?: number
}

200 -> {data: Place}
422 -> {errors: string[]}
```

### Delete Place

```
DELETE /api/places/{id}

200 -> {data: Place}
400 -> {errors: string[]}
```

## Build for Production

Create a production build with:

```bash
yarn build
```

This can be run with

```bash
yarn start
```

## Tests

This project uses Jest for testing and comes with react-testing-library.

To run the tests:

```bash
yarn test
```

This will load the test config, auto-migrate the testing database, and run the tests.

[git-bundle]: https://git-scm.com/docs/git-bundle
[next]: https://nextjs.org/
[tailwind]: https://tailwindcss.com/
