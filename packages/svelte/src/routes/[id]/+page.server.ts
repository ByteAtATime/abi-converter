import type { PageServerLoad } from "./$types";
import { contractSchema, getContract } from "$lib/firebase/contract";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

  const _contract = await getContract(id);

  if (!_contract) {
    error(404, "Contract not found");
  }

  const contract = contractSchema.parse(_contract);

  return {
    contract,
  };
};
