import { doc, getDoc, setDoc, updateDoc, FieldValue, deleteField } from 'firebase/firestore';
import { db } from './config';
import type { AzureFormValues, GitHubFormValues } from '@/lib/schemas';

export type TCredentials = {
  azure?: AzureFormValues;
  github?: GitHubFormValues;
};

const credentialsCollection = 'credentials';

export async function getCredentials(userId: string): Promise<TCredentials | null> {
  const docRef = doc(db, credentialsCollection, userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as TCredentials;
  } else {
    return null;
  }
}

export async function setAzureCredentials(
  userId: string,
  data: AzureFormValues
) {
  const docRef = doc(db, credentialsCollection, userId);
  await setDoc(docRef, { azure: data }, { merge: true });
}

export async function setGithubCredentials(
  userId: string,
  data: GitHubFormValues
) {
  const docRef = doc(db, credentialsCollection, userId);
  await setDoc(docRef, { github: data }, { merge: true });
}

export async function deleteAzureCredentials(userId: string) {
    const docRef = doc(db, credentialsCollection, userId);
    await updateDoc(docRef, {
        azure: deleteField()
    });
}

export async function deleteGithubCredentials(userId: string) {
    const docRef = doc(db, credentialsCollection, userId);
    await updateDoc(docRef, {
        github: deleteField()
    });
}
