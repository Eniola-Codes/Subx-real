import { useState } from 'react'

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
}

interface User {
  id: string
  name: string
  avatar: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
  }
]

const Messaging = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedUser) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      receiverId: selectedUser.id,
      content: newMessage,
      timestamp: new Date().toISOString()
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="grid grid-cols-3 min-h-[600px]">
            {/* Users List */}
            <div className="col-span-1 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Messages</h2>
              </div>
              <div className="overflow-y-auto h-[calc(600px-4rem)]">
                {mockUsers.map(user => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      selectedUser?.id === user.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-2">
              {selectedUser ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <h2 className="ml-3 text-lg font-medium text-gray-900">
                        {selectedUser.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 overflow-y-auto h-[calc(600px-8rem)]">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === 'currentUser'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 max-w-sm ${
                            message.senderId === 'currentUser'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs mt-1 opacity-75">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messaging 