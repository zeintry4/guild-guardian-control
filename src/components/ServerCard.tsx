import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Crown } from "lucide-react";

interface ServerCardProps {
  server: {
    id: string;
    name: string;
    icon?: string;
    memberCount: number;
    isOwner: boolean;
    hasManageGuild: boolean;
    botInServer: boolean;
  };
}

export function ServerCard({ server }: ServerCardProps) {
  const getServerIcon = () => {
    if (server.icon) {
      return server.icon;
    }
    // Generate a color based on server name for consistent placeholder
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500'];
    const index = server.name.length % colors.length;
    return colors[index];
  };

  return (
    <Card className="group hover-scale hover-glow transition-smooth card-gradient border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {server.icon ? (
              <img
                src={server.icon}
                alt={server.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className={`h-12 w-12 rounded-full ${getServerIcon()} flex items-center justify-center text-white font-bold text-lg`}>
                {server.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{server.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{server.memberCount.toLocaleString()} members</span>
                {server.isOwner && (
                  <Badge variant="secondary" className="ml-2">
                    <Crown className="h-3 w-3 mr-1" />
                    Owner
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <Badge 
              variant={server.botInServer ? "default" : "destructive"}
              className={server.botInServer ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {server.botInServer ? "Bot Added" : "Add Bot"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {server.hasManageGuild && (
              <Badge variant="outline" className="text-xs">
                Can Manage
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            {!server.botInServer ? (
              <Button 
                size="sm" 
                onClick={() => {
                  // Mock invite bot logic
                  window.open(`https://discord.com/oauth2/authorize?client_id=934456688306683925&permissions=1099511627775&guild_id=${server.id}&response_type=code&redirect_uri=https%3A%2F%2Ftryhard-dashboard.vercel.app%2Fdiscordlogin&integration_type=0&scope=guilds+identify+bot+applications.commands`, '_blank');
                }}
                className="glow-primary"
              >
                Invite Bot
              </Button>
            ) : (
              server.hasManageGuild && (
                <Link to={`/servers/${server.id}/settings`}>
                  <Button size="sm" variant="outline" className="hover-glow">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}