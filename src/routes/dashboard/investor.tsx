import { useState } from 'react'

interface Project {
  id: string
  title: string
  location: string
  description: string
  type: string
  imageUrl: string
  createdAt: string
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Luxury Apartment Complex',
    location: 'New York, NY',
    description: 'A modern luxury apartment complex in downtown Manhattan',
    type: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    createdAt: '2024-05-01'
  },
  {
    id: '2',
    title: 'Tech Office Park',
    location: 'San Francisco, CA',
    description: 'State-of-the-art office space for tech companies',
    type: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    createdAt: '2024-04-15'
  }
]

const InvestorDashboard = () => {
  const [projects] = useState<Project[]>(mockProjects)
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')

  const filteredProjects = projects.filter(project => {
    const matchesType = !selectedType || project.type === selectedType
    const matchesLocation = !selectedLocation || project.location === selectedLocation
    return matchesType && matchesLocation
  })

  const uniqueTypes = Array.from(new Set(projects.map(project => project.type)))
  const uniqueLocations = Array.from(new Set(projects.map(project => project.location)))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Browse Projects
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white shadow rounded-lg overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{project.location}</p>
                  <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{project.type}</span>
                    <button
                      onClick={() => {
                        // Simulate connection request
                        alert(`Connection request sent for ${project.title}`)
                      }}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InvestorDashboard 