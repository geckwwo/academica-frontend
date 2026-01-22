import { useState } from 'react';
import { Search, Phone, Send, Smile, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: '/1.png',
    lastMessage: 'Hey! Did you check out that internship?',
    time: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: '/2.png',
    lastMessage: 'Thanks for the scholarship info!',
    time: '1h ago',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Marcus Williams',
    avatar: '/3.png',
    lastMessage: 'Let\'s team up for the hackathon',
    time: '3h ago',
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: 'Ethan Davis',
    avatar: '/4.png',
    lastMessage: 'The grant deadline is next week',
    time: '1d ago',
    unread: 0,
    online: false,
  },
];

const mockMessages: Record<number, Message[]> = {
  1: [
    { id: 1, senderId: 1, text: 'Hey! Did you check out that internship?', time: '10:30 AM' },
    { id: 2, senderId: 0, text: 'Not yet, which one?', time: '10:32 AM' },
    { id: 3, senderId: 1, text: 'The Google STEP program!', time: '10:33 AM' },
    { id: 4, senderId: 0, text: 'Oh yeah! I was just looking at it', time: '10:35 AM' },
  ],
  2: [
    { id: 1, senderId: 2, text: 'Thanks for the scholarship info!', time: '9:15 AM' },
    { id: 2, senderId: 0, text: 'No problem! Good luck with the application', time: '9:20 AM' },
  ],
  3: [
    { id: 1, senderId: 3, text: 'Let\'s team up for the hackathon', time: '7:45 AM' },
  ],
  4: [
    { id: 1, senderId: 4, text: 'The grant deadline is next week', time: 'Yesterday' },
  ],
};

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const selectedChatData = mockChats.find((chat) => chat.id === selectedChat);
  const messages = selectedChat ? mockMessages[selectedChat] || [] : [];

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      // In a real app, this would send the message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Chat Container with Floating Cards */}
      <div className="flex-1 flex items-center justify-center p-8 gap-6">
        {/* Left Column - Search + Chat List */}
        <div className="flex flex-col gap-4 w-80 h-[calc(100vh-180px)]">
          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Chat List Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                  selectedChat === chat.id ? 'bg-primary/5' : ''
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 truncate">
                      {chat.name}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="ml-2 flex-shrink-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Right Column - Current Chat Card */}
        {selectedChatData ? (
          <div className="bg-white rounded-2xl shadow-lg w-[600px] h-[calc(100vh-180px)] flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedChatData.avatar}
                    alt={selectedChatData.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedChatData.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedChatData.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedChatData.online ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </div>

              {/* Call Button */}
              <Button variant="outline" size="icon" className="rounded-full">
                <Phone className="w-5 h-5 text-primary" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.senderId === 0
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.senderId === 0 ? 'text-primary-foreground/70' : 'text-gray-500'
                      }`}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Smile className="w-5 h-5 text-gray-500" />
                </Button>
                <div className="flex-1 relative">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="flex-shrink-0 rounded-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg w-[600px] h-[calc(100vh-180px)] flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose a chat from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
