import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Shield, Zap, Users, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import botAvatar from "@/assets/bot-avatar.png";

export function Landing() {
  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Advanced Moderation",
      description: "Keep your server safe with intelligent auto-moderation and custom filters.",
      color: "text-blue-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Management", 
      description: "Engage your community with welcome messages, role management, and more.",
      color: "text-green-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Custom Commands",
      description: "Create custom commands and responses tailored to your server's needs.",
      color: "text-yellow-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Server Protection",
      description: "Protect against raids and spam with advanced security features.",
      color: "text-red-500"
    }
  ];

  const stats = [
    { value: "10K+", label: "Servers" },
    { value: "1M+", label: "Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  const handleInviteBot = () => {
    window.open('https://discord.com/oauth2/authorize?client_id=934456688306683925&permissions=1099511627775&response_type=code&redirect_uri=https%3A%2F%2Ftryhard-dashboard.vercel.app%2Fdiscordlogin&integration_type=0&scope=guilds+identify+bot+applications.commands', '_blank');
  };

  const handleLogin = () => {
    // Mock login - replace with real Discord OAuth
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img 
                src={botAvatar} 
                alt="TryHard Bot" 
                className="h-24 w-24 rounded-full glow-primary animate-glow-pulse"
              />
            </div>
            
            <Badge className="mb-6 text-sm px-4 py-2" variant="secondary">
              ✨ The Ultimate Discord Bot
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Take Your Discord Server
              <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                To The Next Level
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
              TryHard Bot provides powerful moderation, community management, and custom features 
              to help you build the perfect Discord server experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button 
                size="lg" 
                onClick={handleInviteBot}
                className="text-lg px-8 py-6 glow-primary hover-scale"
              >
                <Bot className="mr-2 h-5 w-5" />
                Invite Bot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleLogin}
                className="text-lg px-8 py-6 hover-glow"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Your Server
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From basic moderation to advanced community features, TryHard Bot has all the tools 
              you need to create an amazing Discord experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-scale hover-glow transition-smooth card-gradient">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-background/50 mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Server Owners Worldwide
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-3 text-lg font-semibold">4.9/5 from 1,200+ reviews</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Gaming Community Owner",
                content: "TryHard Bot transformed our server. The moderation features are incredible and the dashboard makes management so easy!"
              },
              {
                name: "Sarah Miller", 
                role: "Study Group Admin",
                content: "Perfect for educational servers. The custom commands and role management saved us hours of manual work."
              },
              {
                name: "Mike Johnson",
                role: "Content Creator",
                content: "Been using TryHard for 2 years. The reliability and feature set is unmatched. Highly recommend!"
              }
            ].map((review, index) => (
              <Card key={index} className="hover-scale transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{review.content}"</p>
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="card-gradient glow-primary">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Server?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of server owners who have already upgraded their Discord experience with TryHard Bot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleInviteBot}
                  className="text-lg px-8 py-6 hover-scale"
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleLogin}
                  className="text-lg px-8 py-6 hover-glow"
                >
                  View Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}