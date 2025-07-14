# Okta Authentication Setup

This application uses Okta for authentication and is already configured with your trial account.

## ✅ Current Configuration

Your Okta application is configured with:
- **Client ID**: `0oasg60pytc4rGJZ0697`
- **Issuer**: `https://trial-8955355.okta.com/oauth2/default`
- **Trial Domain**: `trial-8955355.okta.com`

## 📋 Required Okta Application Settings

Ensure your Okta application has these settings:
1. **Application Type**: Single-Page Application (SPA)
2. **Grant Types**: Authorization Code, Refresh Token
3. **Sign-in redirect URIs**: 
   - `http://localhost:3000/login/callback` (for development)
   - `https://your-production-domain.com/login/callback` (for production)
4. **Sign-out redirect URIs**: 
   - `http://localhost:3000` (for development)
   - `https://your-production-domain.com` (for production)
5. **Trusted Origins**: Same as redirect URIs

## 3. User Assignment

1. In your Okta application, go to the **Assignments** tab
2. Assign users or groups who should have access to the application

## 4. Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. You should be redirected to Okta for authentication
4. After successful login, you'll be redirected back to the application

## Production Configuration

For production deployment, update the redirect URIs in your Okta application to match your production domain:
- **Sign-in redirect URIs**: `https://your-domain.com/login/callback`
- **Sign-out redirect URIs**: `https://your-domain.com`
- **Trusted Origins**: `https://your-domain.com`

## Troubleshooting

- Ensure your Okta domain and client ID are correct
- Check that redirect URIs match exactly (including trailing slashes)
- Verify that the user has been assigned to the application
- Check browser console for any CORS errors 