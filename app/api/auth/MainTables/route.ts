import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserTables } from '@/scripts/getUserTables';

export async function POST(request: NextRequest) {
    try{
        const cookiesStorage = await cookies();
        const session =  cookiesStorage.get('session')?.value;

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { userId } = await request.json();

        if( !userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const tables = await getUserTables(userId); // Added await here

        if (!tables) {
            return NextResponse.json({ error: 'No tables found for this user' }, { status: 404 });
        }

        return NextResponse.json({ tables }, { status: 200 });
    }catch(error){
        console.error('Error in POST /api/auth/MainTables:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}