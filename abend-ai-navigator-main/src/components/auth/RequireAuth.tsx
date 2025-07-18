import { useOktaAuth } from "@okta/okta-react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, Shield } from "lucide-react";
import appLogo from "@/assets/channels4_profile.jpg";
import { STATIC_TEXTS } from "@/constants/staticTexts";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { oktaAuth, authState } = useOktaAuth();

  const handleLogin = async () => {
    console.log("Login button clicked!"); // Debug log
    try {
      console.log("Attempting Okta sign in..."); // Debug log
      await oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error: " + error.message); // Show error to user
    }
  };

  if (!authState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Checking authentication status</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #2d3748 100%)",
        }}
      >
        {/* Background particles/dots */}
        <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex w-full max-w-6xl mx-auto px-8">
          {/* Left side - Logo */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center justify-center bg-white/80 rounded-2xl shadow-xl border border-gray-200 p-6 mr-8">
              <img
                src={appLogo}
                alt="App Logo"
                className="h-40 w-40 object-contain rounded-xl drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {STATIC_TEXTS.APP_SUBTITLE}
                </h1>
              </div>

              <div className="space-y-6">
                <Button
                  onClick={handleLogin}
                  className="w-full h-14 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors relative z-20 cursor-pointer"
                  type="button"
                >
                  Log On
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-gray-300 text-sm">
                    For technical assistance, please contact the IT Enterprise
                    Service Desk at{" "}
                    <span className="text-blue-300">1 (888) 268-4368</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
