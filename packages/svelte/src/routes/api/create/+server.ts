import type { RequestHandler } from "./$types";
import { z } from "zod";
import solc from "solc";
import { json } from "@sveltejs/kit";
import { createContract } from "$lib/firebase/contract";

const bodySchema = z.object({
  name: z.string(),
  source: z.string(),
});

export const POST: RequestHandler = async ({ request }) => {
  const { name, source } = bodySchema.parse(await request.json());

  const compilerInput = {
    language: "Solidity",
    sources: {
      "Input.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(compilerInput)));

  if (!output.contracts || !("Input.sol" in output.contracts)) {
    return json(
      {
        status: "error",
        message: "No contract found in source",
      },
      { status: 400 },
    );
  }

  const abis = output.contracts["Input.sol"];

  const id = await createContract(name, source, abis);

  return json({
    status: "ok",
    id,
  });
};
