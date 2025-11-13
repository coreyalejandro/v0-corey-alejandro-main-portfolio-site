# Security Documentation

## Overview

Creative Chaos implements comprehensive security measures to protect users and prevent common web vulnerabilities.

## Security Headers

All responses include the following security headers via middleware:

- **Content-Security-Policy**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Strict-Transport-Security**: Enforces HTTPS
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

## Rate Limiting

The following rate limits are enforced:

- **Contact Form**: 3 submissions per minute per IP
- **GitHub API**: 50 requests per hour per client
- **Audio Events**: 10 events per second per user

## Input Validation

All user inputs are sanitized:

- **Form Inputs**: HTML tags removed, length limited
- **Email Addresses**: Validated with regex, normalized
- **URLs**: Protocol validated, parsed safely

## API Security

- Server-side validation for all API endpoints
- Proper error handling without exposing internals
- Request timeouts to prevent hanging connections
- Method restrictions (only allowed HTTP methods)

## Best Practices

1. Never trust client-side validation alone
2. Always sanitize and validate server-side
3. Use environment variables for sensitive data
4. Implement rate limiting on all public endpoints
5. Keep dependencies updated regularly
6. Review security headers periodically

## Reporting Security Issues

If you discover a security vulnerability, please email security@example.com with details.
