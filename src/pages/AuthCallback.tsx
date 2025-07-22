import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleAuthCallback } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      toast({
        title: "Authentication Failed",
        description: error === 'access_denied' 
          ? "You cancelled the login process" 
          : "An error occurred during authentication",
        variant: "destructive"
      });
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
      return;
    }

    if (!code) {
      setStatus('error');
      toast({
        title: "Authentication Failed",
        description: "No authorization code received",
        variant: "destructive"
      });
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
      return;
    }

    handleAuthCallback(code)
      .then(() => {
        setStatus('success');
        toast({
          title: "Login Successful",
          description: "Welcome to TryHard Dashboard!"
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      })
      .catch((err) => {
        console.error('Auth callback error:', err);
        setStatus('error');
        toast({
          title: "Authentication Failed",
          description: "An unexpected error occurred",
          variant: "destructive"
        });
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      });
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-gradient">
        <CardContent className="p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
              <p className="text-muted-foreground">
                Please wait while we log you in
              </p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Login Successful!</h2>
              <p className="text-muted-foreground">
                Redirecting to dashboard...
              </p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
              <p className="text-muted-foreground">
                Redirecting to home page...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}