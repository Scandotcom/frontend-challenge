import type { NextApiHandler } from "next";
import { db } from "../../lib/db";
import * as t from "io-ts";
import * as E from "fp-ts/Either";
import { formatValidationErrors } from "io-ts-reporters";
import { pipe } from "fp-ts/lib/function";

const CreatePlaceInput = t.type({
  name: t.string,
  lat: t.number,
  long: t.number,
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const places = await db.place.findMany();

    res.status(200).json({ data: places });
  }

  if (req.method === "POST") {
    const input = pipe(
      req.body,
      CreatePlaceInput.decode,
      E.mapLeft(formatValidationErrors)
    );

    if (E.isLeft(input)) {
      res.status(422).json({ errors: input.left });
      return;
    }

    const place = await db.place.create({
      data: {
        name: input.right.name,
        lat: input.right.lat,
        long: input.right.long,
      },
    });
    res.status(201).json({ data: place });
    return;
  }

  res.status(405).send(`Unsupported method ${req.method}`);
};

export default handler;
