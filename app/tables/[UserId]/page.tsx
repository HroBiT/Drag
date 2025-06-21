interface UserTablesProps {
  params: { userId: string }
}

export default function UserTables({ params }: UserTablesProps) {
  const { userId } = params;

  return (
    <div>
      <h1>Hi user {userId}, here are your tables</h1>
      <p>Here you can manage your tables</p>
    </div>
  );
}