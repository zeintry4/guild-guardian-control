import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Users, Crown, Bot, ExternalLink } from "lucide-react";
import { Guild, inviteBot } from "@/lib/api";

interface ServerCardProps {
  server: Guild;
}

export function ServerCard({ server }: ServerCardProps) {
  const navigate = useNavigate();
  const canManage = server.owner || (parseInt(server.permissions) & 32) === 32;

  const handleManageServer = () => {
    navigate(`/server/${server.id}`);
  };

  const handleInviteBot = () => {
    inviteBot(server.id);
  };

  return (
    <Card className="group hover-scale hover-glow transition-smooth card-gradient border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={server.icon || ""} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {server.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{server.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{(server.memberCount || 0).toLocaleString()} members</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {server.owner && (
              <Badge variant="secondary" className="text-xs">
                <Crown className="h-3 w-3 mr-1" />
                Owner
              </Badge>
            )}
            
            {canManage && !server.owner && (
              <Badge variant="outline" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Manager
              </Badge>
            )}
            
            <Badge 
              variant={server.hasBot ? "default" : "destructive"} 
              className="text-xs"
            >
              <Bot className="h-3 w-3 mr-1" />
              {server.hasBot ? "Bot Added" : "No Bot"}
            </Badge>
          </div>

          <div className="flex space-x-2">
            {canManage && server.hasBot && (
              <Button 
                size="sm" 
                className="flex-1"
                onClick={handleManageServer}
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </Button>
            )}
            
            {!server.hasBot && (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={handleInviteBot}
              >
                <Bot className="h-4 w-4 mr-2" />
                Add Bot
              </Button>
            )}
            
            {server.hasBot && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => window.open(`https://discord.com/channels/${server.id}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}