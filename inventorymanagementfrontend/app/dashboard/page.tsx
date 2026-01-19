import React from 'react'

const page = () => {
   return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Dashboard Overview</h1>
      
      {/* This is where your charts and tables will go */}
      <div className="p-6 border-2 border-dashed border-slate-300 rounded-lg h-96 flex items-center justify-center text-slate-400">
        Page Content Area
      </div>
    </div>
  )
}

export default page