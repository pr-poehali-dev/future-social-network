import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  status: string;
  isOnline: boolean;
}

interface Post {
  id: number;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  quantumConnections: number;
}

interface Message {
  id: number;
  sender: User;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: number;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const currentUser: User = {
  id: 0,
  name: 'Аврора Кибер',
  username: '@aurora_quantum',
  avatar: 'https://v3b.fal.media/files/b/rabbit/BFvARRtGGlo2PH57Z3LQv_output.png',
  status: 'Подключена к квантовой сети',
  isOnline: true
};

const mockUsers: User[] = [
  { id: 1, name: 'Нео Хакер', username: '@neo_hack', avatar: '', status: 'В киберпространстве', isOnline: true },
  { id: 2, name: 'Луна Дигитал', username: '@luna_digital', avatar: '', status: 'Квантовый сон', isOnline: false },
  { id: 3, name: 'Макс Протон', username: '@max_proton', avatar: '', status: 'Связь установлена', isOnline: true },
  { id: 4, name: 'Вера Нейро', username: '@vera_neuro', avatar: '', status: 'Синхронизация', isOnline: true }
];

const mockPosts: Post[] = [
  {
    id: 1,
    author: mockUsers[0],
    content: 'Только что установил квантовое соединение с марсианской станцией! Скорость передачи данных невероятная 🚀',
    timestamp: '2 мин назад',
    likes: 142,
    comments: 23,
    quantumConnections: 89
  },
  {
    id: 2,
    author: mockUsers[2],
    content: 'Новая голограмма готова! Теперь можно общаться в полном 3D. Будущее уже здесь!',
    timestamp: '15 мин назад',
    likes: 267,
    comments: 45,
    quantumConnections: 156
  },
  {
    id: 3,
    author: mockUsers[3],
    content: 'Провела квантовую медитацию в виртуальном пространстве. Рекомендую всем попробовать эту технологию!',
    timestamp: '1 час назад',
    likes: 198,
    comments: 34,
    quantumConnections: 112
  }
];

const mockChats: Chat[] = [
  { id: 1, user: mockUsers[0], lastMessage: 'Отличная идея с марсианской станцией!', timestamp: '5 мин', unread: 2 },
  { id: 2, user: mockUsers[2], lastMessage: 'Когда покажешь новую голограмму?', timestamp: '20 мин', unread: 0 },
  { id: 3, user: mockUsers[3], lastMessage: 'Спасибо за совет по медитации!', timestamp: '2 ч', unread: 1 }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: mockUsers[0], content: 'Привет! Как дела с квантовой сетью?', timestamp: '10:30', isOwn: false },
    { id: 2, sender: currentUser, content: 'Всё отлично! Только что подключился к новому узлу.', timestamp: '10:32', isOwn: true },
    { id: 3, sender: mockUsers[0], content: 'Круто! Я тоже экспериментирую с новыми протоколами связи.', timestamp: '10:33', isOwn: false }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow-pulse">
              <Icon name="Zap" size={24} className="text-background" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              QuantumNet
            </h1>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск в квантовой сети..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setShowChat(!showChat)}
            >
              <Icon name="MessageSquare" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-glow-pulse"></span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-glow-pulse"></span>
            </Button>
            <Avatar className="border-2 border-primary animate-glow-pulse cursor-pointer">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-background">
                АК
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <Card className="p-6 bg-card/80 backdrop-blur-lg border-primary/20 animate-fade-in">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 border-4 border-primary animate-float">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-background text-2xl">
                    АК
                  </AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{currentUser.name}</h2>
                <p className="text-sm text-muted-foreground">{currentUser.username}</p>
                <Badge className="mt-2 bg-primary/20 text-primary border-primary/40">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                  {currentUser.status}
                </Badge>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Icon name="Zap" size={16} className="mr-2" />
                  Квантовая связь
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Подключений</span>
                  <span className="font-bold text-primary">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Друзей</span>
                  <span className="font-bold text-secondary">567</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Сообществ</span>
                  <span className="font-bold text-accent">89</span>
                </div>
              </div>
            </Card>

            <Card className="mt-6 p-6 bg-card/80 backdrop-blur-lg border-primary/20 animate-fade-in">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="Users" size={18} className="text-primary" />
                Квантовые друзья
              </h3>
              <div className="space-y-3">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="relative">
                      <Avatar className="w-10 h-10 border-2 border-primary/40">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-card animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-6">
            <Card className="p-6 mb-6 bg-card/80 backdrop-blur-lg border-primary/20 animate-fade-in">
              <div className="flex gap-4">
                <Avatar className="border-2 border-primary/40">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                    АК
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input 
                    placeholder="Поделиться через квантовую сеть..." 
                    className="bg-muted/50 border-primary/30 focus:border-primary mb-3"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-primary">
                      <Icon name="Image" size={16} className="mr-2" />
                      Голограмма
                    </Button>
                    <Button size="sm" variant="ghost" className="text-secondary">
                      <Icon name="Video" size={16} className="mr-2" />
                      3D видео
                    </Button>
                    <Button size="sm" className="ml-auto bg-gradient-to-r from-primary to-secondary">
                      Отправить
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              {mockPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="p-6 bg-card/80 backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <Avatar className="border-2 border-primary/40">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold">{post.author.name}</h3>
                          <p className="text-sm text-muted-foreground">{post.author.username} · {post.timestamp}</p>
                        </div>
                        <Button size="icon" variant="ghost">
                          <Icon name="MoreHorizontal" size={20} />
                        </Button>
                      </div>
                      <p className="mb-4">{post.content}</p>
                      <div className="flex items-center gap-6 pt-4 border-t border-border">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <Icon name="Heart" size={18} />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors">
                          <Icon name="MessageCircle" size={18} />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                          <Icon name="Zap" size={18} />
                          <span className="text-sm">{post.quantumConnections}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                          <Icon name="Share2" size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>

          <aside className="lg:col-span-3">
            <Card className="p-6 bg-card/80 backdrop-blur-lg border-primary/20 animate-fade-in">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={18} className="text-primary" />
                Квантовые тренды
              </h3>
              <div className="space-y-4">
                {['#QuantumFuture', '#CyberSpace2025', '#HolographicLife', '#NeuroSync', '#DigitalOdyssey'].map((trend, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <p className="font-medium text-primary">{trend}</p>
                    <p className="text-xs text-muted-foreground mt-1">{Math.floor(Math.random() * 50 + 10)}K квантовых подключений</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg border-primary/20 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-float">
                  <Icon name="Sparkles" size={32} className="text-background" />
                </div>
                <h3 className="font-bold mb-2">Квантовая Премиум</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Получите доступ к мгновенным голографическим звонкам и приоритетной квантовой связи
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Активировать
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {showChat && (
        <div className="fixed bottom-0 right-4 w-96 h-[600px] bg-card border-2 border-primary/40 rounded-t-2xl shadow-2xl z-50 flex flex-col animate-fade-in">
          <div className="p-4 border-b border-border bg-gradient-to-r from-primary/20 to-secondary/20 rounded-t-2xl flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Icon name="MessageSquare" size={20} className="text-primary" />
              {activeChat ? activeChat.user.name : 'Квантовые чаты'}
            </h3>
            <div className="flex gap-2">
              {activeChat && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setActiveChat(null)}
                  className="h-8 w-8"
                >
                  <Icon name="ArrowLeft" size={18} />
                </Button>
              )}
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setShowChat(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
          </div>

          {!activeChat ? (
            <div className="flex-1 overflow-y-auto">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className="p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer flex items-center gap-3"
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-primary/40">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                        {chat.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {chat.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium truncate">{chat.user.name}</p>
                      <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-primary text-background">{chat.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <Avatar className="w-8 h-8 border-2 border-primary/40">
                      <AvatarImage src={msg.isOwn ? currentUser.avatar : ''} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-xs">
                        {msg.sender.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          msg.isOwn
                            ? 'bg-gradient-to-r from-primary to-secondary text-background'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-card/50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Квантовое сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && messageText.trim()) {
                        setMessages([...messages, {
                          id: messages.length + 1,
                          sender: currentUser,
                          content: messageText,
                          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                          isOwn: true
                        }]);
                        setMessageText('');
                      }
                    }}
                    className="flex-1 bg-muted/50 border-primary/30 focus:border-primary"
                  />
                  <Button
                    size="icon"
                    className="bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      if (messageText.trim()) {
                        setMessages([...messages, {
                          id: messages.length + 1,
                          sender: currentUser,
                          content: messageText,
                          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                          isOwn: true
                        }]);
                        setMessageText('');
                      }
                    }}
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;