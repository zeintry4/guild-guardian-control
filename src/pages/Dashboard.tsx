import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Filter,
  Loader2
} from "lucide-react";
import { isLoggedIn, getUserGuilds, inviteBot, Guild } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [servers, setServers] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/');
      return;
    }

    loadGuilds();
  }, [navigate]);

  const loadGuilds = async () => {
    try {
      setLoading(true);
      const guilds = await getUserGuilds();
      setServers(guilds);
    } catch (error) {
      console.error('Failed to load guilds:', error);
      toast({
        title: "Error",
        description: "Failed to load your servers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <Card className="card-gradient">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Loading your servers...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase());
    const hasManageGuild = server.owner || (parseInt(server.permissions) & 32) === 32;
    
    switch (selectedTab) {
      case "managed":
        return matchesSearch && hasManageGuild;
      case "owned":
        return matchesSearch && server.owner;
      case "bot-added":
        return matchesSearch && server.hasBot;
      case "bot-missing":
        return matchesSearch && !server.hasBot;
      default:
        return matchesSearch;
    }
  });

  const stats = {
    totalServers: servers.length,
    managedServers: servers.filter(s => s.owner || (parseInt(s.permissions) & 32) === 32).length,
    ownedServers: servers.filter(s => s.owner).length,
    botServers: servers.filter(s => s.hasBot).length,
    totalMembers: servers.reduce((acc, server) => acc + (server.memberCount || 0), 0)
  };

  const handleInviteBot = () => {
    inviteBot();
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