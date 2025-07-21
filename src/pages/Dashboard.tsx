import { useState, useEffect } from "react";
import { ServerCard } from "@/components/ServerCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Users, 
  Crown, 
  Bot, 
  TrendingUp, 
  Activity,
  Plus,
  Filter
} from "lucide-react";

// Mock server data - replace with real API calls
const mockServers = [
  {
    id: "123456789",
    name: "Gaming Paradise",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop&crop=center",
    memberCount: 1250,
    isOwner: true,
    hasManageGuild: true,
    botInServer: true
  },
  {
    id: "987654321", 
    name: "Study Group",
    icon: null,
    memberCount: 45,
    isOwner: false,
    hasManageGuild: true,
    botInServer: true
  },
  {
    id: "456789123",
    name: "Art Community Hub",
    icon: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    memberCount: 890,
    isOwner: false,
    hasManageGuild: false,
    botInServer: false
  },
  {
    id: "789123456",
    name: "Tech Talk Central",
    icon: null,
    memberCount: 2100,
    isOwner: true,
    hasManageGuild: true,
    botInServer: true
  }
];

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [servers, setServers] = useState(mockServers);

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (selectedTab) {
      case "managed":
        return matchesSearch && server.hasManageGuild;
      case "owned":
        return matchesSearch && server.isOwner;
      case "bot-added":
        return matchesSearch && server.botInServer;
      case "bot-missing":
        return matchesSearch && !server.botInServer;
      default:
        return matchesSearch;
    }
  });

  const stats = {
    totalServers: servers.length,
    managedServers: servers.filter(s => s.hasManageGuild).length,
    ownedServers: servers.filter(s => s.isOwner).length,
    botServers: servers.filter(s => s.botInServer).length,
    totalMembers: servers.reduce((acc, server) => acc + server.memberCount, 0)
  };

  const handleInviteBot = () => {
    window.open('https://discord.com/oauth2/authorize?client_id=934456688306683925&permissions=1099511627775&response_type=code&redirect_uri=https%3A%2F%2Ftryhard-dashboard.vercel.app%2Fdiscordlogin&integration_type=0&scope=guilds+identify+bot+applications.commands', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
            Dashboard
          </h1>
          <p className="text-muted-foreground animate-slide-up">
            Manage your Discord servers and bot settings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="card-gradient hover-scale transition-smooth">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalServers}</p>
                  <p className="text-xs text-muted-foreground">Total Servers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient hover-scale transition-smooth">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.ownedServers}</p>
                  <p className="text-xs text-muted-foreground">Owned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient hover-scale transition-smooth">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.botServers}</p>
                  <p className="text-xs text-muted-foreground">With Bot</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient hover-scale transition-smooth">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.managedServers}</p>
                  <p className="text-xs text-muted-foreground">Managed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient hover-scale transition-smooth">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{(stats.totalMembers / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 card-gradient">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search servers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button onClick={handleInviteBot} className="glow-primary hover-scale">
                <Plus className="h-4 w-4 mr-2" />
                Invite Bot to Server
              </Button>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-6">
              <TabsList className="grid w-full grid-cols-5 md:w-auto md:grid-cols-5">
                <TabsTrigger value="all">All ({stats.totalServers})</TabsTrigger>
                <TabsTrigger value="managed">Managed ({stats.managedServers})</TabsTrigger>
                <TabsTrigger value="owned">Owned ({stats.ownedServers})</TabsTrigger>
                <TabsTrigger value="bot-added">With Bot ({stats.botServers})</TabsTrigger>
                <TabsTrigger value="bot-missing">Missing Bot ({stats.totalServers - stats.botServers})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Server Grid */}
        <div className="space-y-6">
          {filteredServers.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Your Servers ({filteredServers.length})
                </h2>
                <Badge variant="outline" className="text-sm">
                  <Filter className="h-3 w-3 mr-1" />
                  {selectedTab === "all" ? "All servers" : 
                   selectedTab === "managed" ? "Managed servers" :
                   selectedTab === "owned" ? "Owned servers" :
                   selectedTab === "bot-added" ? "Bot added" : "Missing bot"}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServers.map((server, index) => (
                  <div key={server.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ServerCard server={server} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Card className="card-gradient">
              <CardContent className="p-12 text-center">
                <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No servers found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? `No servers match "${searchQuery}"` 
                    : "You don't have any servers matching the selected filter."}
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}