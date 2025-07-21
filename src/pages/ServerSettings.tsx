import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Save, 
  Settings, 
  Shield, 
  Users, 
  MessageSquare,
  Bot,
  Crown,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock server data
const mockServerData = {
  id: "123456789",
  name: "Gaming Paradise",
  icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop&crop=center",
  memberCount: 1250,
  isOwner: true,
  hasManageGuild: true,
  settings: {
    prefix: "!",
    welcomeMessage: "Welcome to {server}, {user}! Please read the rules.",
    welcomeChannel: "general",
    moderation: {
      autoMod: true,
      antiSpam: true,
      deleteInvites: false,
      slowMode: 0
    },
    logging: {
      modLog: true,
      joinLeave: true,
      messageDelete: false,
      channelUpdates: true
    }
  }
};

export function ServerSettings() {
  const { serverId } = useParams();
  const { toast } = useToast();
  const [settings, setSettings] = useState(mockServerData.settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Saved",
      description: "Your server settings have been updated successfully.",
    });
    
    setIsSaving(false);
  };

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="hover-glow">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={mockServerData.icon}
                  alt={mockServerData.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{mockServerData.name}</h1>
                    {mockServerData.isOwner && (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Crown className="h-3 w-3 mr-1" />
                        Owner
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{mockServerData.memberCount.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bot className="h-4 w-4" />
                      <span>TryHard Bot Active</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSave} disabled={isSaving} className="glow-primary hover-scale">
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Moderation</span>
            </TabsTrigger>
            <TabsTrigger value="welcome" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Welcome</span>
            </TabsTrigger>
            <TabsTrigger value="logging" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Logging</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prefix">Command Prefix</Label>
                  <Input
                    id="prefix"
                    value={settings.prefix}
                    onChange={(e) => updateSetting('prefix', e.target.value)}
                    placeholder="!"
                    className="max-w-xs"
                  />
                  <p className="text-sm text-muted-foreground">
                    The prefix used for bot commands (e.g., !help)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Settings */}
          <TabsContent value="moderation">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Moderation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Moderation</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically detect and handle inappropriate content
                      </p>
                    </div>
                    <Switch
                      checked={settings.moderation.autoMod}
                      onCheckedChange={(checked) => updateSetting('moderation.autoMod', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Anti-Spam Protection</Label>
                      <p className="text-sm text-muted-foreground">
                        Prevent users from spamming messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.moderation.antiSpam}
                      onCheckedChange={(checked) => updateSetting('moderation.antiSpam', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Delete Discord Invites</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically delete messages containing Discord invites
                      </p>
                    </div>
                    <Switch
                      checked={settings.moderation.deleteInvites}
                      onCheckedChange={(checked) => updateSetting('moderation.deleteInvites', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="slowMode">Slow Mode (seconds)</Label>
                    <Input
                      id="slowMode"
                      type="number"
                      min="0"
                      max="21600"
                      value={settings.moderation.slowMode}
                      onChange={(e) => updateSetting('moderation.slowMode', parseInt(e.target.value) || 0)}
                      className="max-w-xs"
                    />
                    <p className="text-sm text-muted-foreground">
                      Limit how often users can send messages (0 = disabled)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Welcome Settings */}
          <TabsContent value="welcome">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Welcome Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={settings.welcomeMessage}
                    onChange={(e) => updateSetting('welcomeMessage', e.target.value)}
                    placeholder="Welcome to {server}, {user}!"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Use {"{user}"} for username and {"{server}"} for server name
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="welcomeChannel">Welcome Channel</Label>
                  <Input
                    id="welcomeChannel"
                    value={settings.welcomeChannel}
                    onChange={(e) => updateSetting('welcomeChannel', e.target.value)}
                    placeholder="general"
                    className="max-w-xs"
                  />
                  <p className="text-sm text-muted-foreground">
                    Channel name where welcome messages will be sent
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logging Settings */}
          <TabsContent value="logging">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Logging Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Moderation Log</Label>
                      <p className="text-sm text-muted-foreground">
                        Log moderation actions (bans, kicks, warnings)
                      </p>
                    </div>
                    <Switch
                      checked={settings.logging.modLog}
                      onCheckedChange={(checked) => updateSetting('logging.modLog', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Join/Leave Events</Label>
                      <p className="text-sm text-muted-foreground">
                        Log when users join or leave the server
                      </p>
                    </div>
                    <Switch
                      checked={settings.logging.joinLeave}
                      onCheckedChange={(checked) => updateSetting('logging.joinLeave', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Message Deletions</Label>
                      <p className="text-sm text-muted-foreground">
                        Log when messages are deleted
                      </p>
                    </div>
                    <Switch
                      checked={settings.logging.messageDelete}
                      onCheckedChange={(checked) => updateSetting('logging.messageDelete', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Channel Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Log channel creation, deletion, and updates
                      </p>
                    </div>
                    <Switch
                      checked={settings.logging.channelUpdates}
                      onCheckedChange={(checked) => updateSetting('logging.channelUpdates', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Warning Card */}
        <Card className="border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-500">Important</p>
                <p className="text-sm text-muted-foreground">
                  Changes will take effect immediately. Make sure to test your settings in a safe environment first.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}