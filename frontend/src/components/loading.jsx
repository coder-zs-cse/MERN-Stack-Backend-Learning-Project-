import React from 'react'

function loading() {
  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin border-t-transparent"></div>
    </div>
  )
}

export default loading