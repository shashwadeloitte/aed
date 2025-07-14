import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function LoginButton() {
  const { oktaAuth, authState } = useOktaAuth();

  const handleLogin = async () => {
    try {
      await oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!authState) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <Button onClick={handleLogin} variant="outline" size="sm">
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    );
  }

  const userInfo = authState.idToken?.claims;
  const userName = userInfo?.name || userInfo?.preferred_username || 'User';
  const userEmail = userInfo?.email;
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userInfo?.picture} alt={userName} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            {userEmail && (
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 