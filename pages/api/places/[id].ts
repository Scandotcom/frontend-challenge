import type { NextApiHandler } from "next";
import { db } from "../../../lib/db";
import * as t from "io-ts";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { pipe } from "fp-ts/lib/function";
import { formatValidationErrors } from "io-ts-reporters";

const UpdatePlaceInput = t.partial({
  name: t.string,
  lat: t.number,
  long: t.number,
});

const PrismaKnownError = t.type({ meta: t.type({ cause: t.string }) });

/**
 * Extracts the reason for a DB operation failing by getting the cause from the
 * Prisma error. Returns the fallback message if no cause is present.
 *
 * @param fallbackMessage
 * @returns `String`
 */
const getPrismaErrorCause = (fallbackMessage: string) => (error: unknown) =>
  pipe(
    Object.assign({}, error),
    PrismaKnownError.decode,
    E.fold(
      () => fallbackMessage,
      (error) => error.meta.cause
    )
  );

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;

  if (typeof id !== "string") {
    res.status(400).send("Invalid request");
    return;
  }

  if (req.method === "DELETE") {
    await pipe(
      TE.tryCatch(
        () => db.place.delete({ where: { id } }),
        getPrismaErrorCause("Failed to delete item")
      ),
      TE.fold(
        (error) => T.of(res.status(400).json({ errors: [error] })),
        (place) => T.of(res.status(200).json({ data: place }))
      )
    )();

    return;
  }

  if (req.method === "PUT") {
    const input = pipe(
      req.body,
      UpdatePlaceInput.decode,
      E.mapLeft(formatValidationErrors)
    );

    if (E.isLeft(input)) {
      res.status(422).json({ errors: input.left });
      return;
    }

    await pipe(
      TE.tryCatch(
        () => db.place.update({ where: { id }, data: input.right }),
        getPrismaErrorCause("Failed to update item")
      ),
      TE.fold(
        (error) => T.of(res.status(400).json({ errors: [error] })),
        (place) => T.of(res.status(200).json({ data: place }))
      )
    )();

    return;
  }

  res.status(405).send(`Unsupported method ${req.method}`);
};

export default handler;
