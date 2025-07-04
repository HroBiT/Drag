import { cookies } from 'next/headers';

export interface SessionUser {
  userId: number;
  email: string;
  name: string;
}

export interface UserWithTables extends SessionUser {
  taskTables: {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    miniTables: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      taskTableId: number;
      tasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        miniTableId: number;
      }[];
    }[];
  }[];
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    
    if (!session) {
      return null;
    }

    const sessionData = JSON.parse(session) as SessionUser;
    return sessionData;
  } catch (error) {
    console.error('Error parsing session:', error);
    return null;
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}