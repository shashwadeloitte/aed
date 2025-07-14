import { LoginCallback as OktaLoginCallback } from '@okta/okta-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';

export default function LoginCallback() {
  return (
    <OktaLoginCallback
      errorComponent={({ error }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="w-96">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto text-red-600 mb-4" />
              <CardTitle>Authentication Error</CardTitle>
              <CardDescription>
                There was an error during authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                {error?.message || 'An unexpected error occurred'}
              </p>
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Return to home
              </a>
            </CardContent>
          </Card>
        </div>
      )}
      loadingElement={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="w-96">
            <CardHeader className="text-center">
              <Loader2 className="h-12 w-12 mx-auto text-blue-600 mb-4 animate-spin" />
              <CardTitle>Signing you in...</CardTitle>
              <CardDescription>
                Please wait while we complete your authentication
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      }
    />
  );
} 