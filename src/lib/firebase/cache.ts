import { getAdminDb } from './admin';

const COLLECTION = 'cache';

export async function getCached<T>(key: string, ttlSeconds: number): Promise<T | null> {
  try {
    const db = getAdminDb();
    const doc = await db.collection(COLLECTION).doc(key).get();
    if (!doc.exists) return null;

    const data = doc.data();
    if (!data) return null;

    const cachedAt = data.cachedAt?.toMillis?.() ?? 0;
    const ageSeconds = (Date.now() - cachedAt) / 1000;
    if (ageSeconds > ttlSeconds) return null;

    return data.payload as T;
  } catch {
    return null;
  }
}

export async function setCached<T>(key: string, payload: T): Promise<void> {
  try {
    const db = getAdminDb();
    await db.collection(COLLECTION).doc(key).set({
      payload,
      cachedAt: new Date(),
    });
  } catch {
    // Non-fatal — app works without caching
  }
}
