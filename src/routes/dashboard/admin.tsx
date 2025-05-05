import { useState } from 'react'

interface Developer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  website: string
  bio: string
  isSubscribed: boolean
  createdAt: string
}

interface Project {
  id: string
  title: string
  description: string
  location: string
  type: string
  developerId: string
  createdAt: string
}

const AdminDashboard = () => {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [activeTab, setActiveTab] = useState<'developers' | 'projects'>('developers')
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json')

  const approveDeveloper = (developerId: string) => {
    setDevelopers(prevDevelopers =>
      prevDevelopers.map(dev =>
        dev.id === developerId ? { ...dev, isApproved: true } : dev
      )
    )
  }

  const approveProject = (projectId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(proj =>
        proj.id === projectId ? { ...proj, isApproved: true } : proj
      )
    )
  }

  const toggleSubscription = (developerId: string) => {
    setDevelopers(prevDevelopers =>
      prevDevelopers.map(dev =>
        dev.id === developerId ? { ...dev, isSubscribed: !dev.isSubscribed } : dev
      )
    )
  }

  const exportData = () => {
    const data = activeTab === 'developers' ? developers : projects
    const jsonData = JSON.stringify(data, null, 2)
    
    if (exportFormat === 'csv') {
      // Convert to CSV
      const headers = Object.keys(data[0] || {}).join(',')
      const rows = data.map(item => Object.values(item).join(','))
      const csv = [headers, ...rows].join('\n')
      downloadFile(csv, 'data.csv', 'text/csv')
    } else {
      downloadFile(jsonData, 'data.json', 'application/json')
    }
  }

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('developers')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                  activeTab === 'developers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Developers
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projects
              </button>
            </nav>
          </div>

          <div className="p-4">
            <div className="flex justify-end mb-4 space-x-4">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
              <button
                onClick={exportData}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Export Data
              </button>
            </div>

            {activeTab === 'developers' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {developers.map((developer) => (
                      <tr key={developer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {developer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {developer.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {developer.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            developer.isSubscribed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {developer.isSubscribed ? 'Subscribed' : 'Free'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => toggleSubscription(developer.id)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Toggle Subscription
                          </button>
                          <button
                            onClick={() => approveDeveloper(developer.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Developer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {developers.find(d => d.id === project.developerId)?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => approveProject(project.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard 