"use client"

import type React from "react"
import { useState } from "react"
import type { Property } from "@/contexts/PropertiesContext"
import { ChevronDown, ChevronRight } from "lucide-react"

interface StageListProps {
  property: Property
}

const StageList: React.FC<StageListProps> = ({ property }) => {
  const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set([0]))

  const toggleStage = (index: number) => {
    const newExpanded = new Set(expandedStages)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedStages(newExpanded)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Property Layout</h3>

      <div className="space-y-3">
        {property.stages.map((stage, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleStage(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{stage.name}</span>
              {expandedStages.has(index) ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedStages.has(index) && (
              <div className="px-4 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stage.rooms.map((room, roomIndex) => (
                    <div key={roomIndex} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-md text-sm">
                      {room}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StageList
