import Forms from "@/components/forms";

interface TaskTableProps {
  params: { 
    userId: string;
    taskTableId: string;
  }
}

export default function TaskTable({ params }: TaskTableProps) {
  const { userId, taskTableId } = params;

  return (
     <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Main Content */}
          <div className="container mx-auto px-6 py-8">
            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* To Do Column */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-700 flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                      Do zrobienia
                    </h2>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <h3 className="font-semibold text-slate-800 mb-2">Task1</h3>
                    <p className="text-sm text-slate-600 mb-3">Sample task description</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded">
                        Due: 2023-10-01
                      </span>
                      <div className="flex space-x-1">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* In Progress Column */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-700 flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                      W trakcie
                    </h2>
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
                      0
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center py-8 text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-sm">Brak zadań w trakcie</p>
                  </div>
                </div>
              </div>
    
              {/* Done Column */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-700 flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                      Zakończone
                    </h2>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      0
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center py-8 text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">Brak zakończonych zadań</p>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Add New Task Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Dodaj nowe zadanie</h2>
              </div>
              <Forms />
            </div>
          </div>
        </main>
        );
}