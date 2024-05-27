import { getFirestoreConnector } from "$lib/firebase/firestore";
import { z } from "zod";
import { Abi } from "abitype/zod";

export const contractSchema = z.object({
  name: z.string(),
  source: z.string(),
  abis: z.record(z.object({ abi: Abi })),
});

const firestore = getFirestoreConnector();
const contractsCollection = firestore.collection("contracts");

export const createContract = async (name: string, source: string, abis: any) => {
  const doc = await contractsCollection.add({
    name,
    source,
    abis,
  });

  return doc.id;
};

export const getContract = async (id: string) => {
  const doc = await contractsCollection.doc(id).get();

  return doc.data();
};
