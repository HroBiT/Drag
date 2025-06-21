export default function TablesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Tabela</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 text-slate-600">ID</th>
                <th className="py-3 px-4 text-slate-600">Nazwa</th>
                <th className="py-3 px-4 text-slate-600">Opis</th>
                <th className="py-3 px-4 text-slate-600">Data utworzenia</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="hover:bg-slate-50 transition-colors duration-200">
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">Przykładowy element</td>
                <td className="py-3 px-4">Opis elementu</td>
                <td className="py-3 px-4">2023-10-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}