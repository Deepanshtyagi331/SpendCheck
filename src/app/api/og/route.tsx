import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get parameters from query
    const savings = searchParams.get('savings') || '0';
    const annual = searchParams.get('annual') || '0';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a1a 0%, #0a0a0a 100%)',
            color: 'white',
            fontFamily: 'sans-serif',
            position: 'relative',
            padding: '40px',
          }}
        >
          {/* Background decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '50%',
              height: '50%',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              filter: 'blur(100px)',
              borderRadius: '50%',
            }}
          />
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '32px',
              padding: '60px',
              width: '90%',
              height: '90%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Logo area */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                $
              </div>
              <span style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.05em' }}>
                SPENDCHECK
              </span>
            </div>

            <h1
              style={{
                fontSize: '48px',
                fontWeight: '800',
                textAlign: 'center',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              AI Spend Audit Result
            </h1>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '24px', color: '#9ca3af', fontWeight: '500' }}>
                Potential Monthly Savings
              </span>
              <span
                style={{
                  fontSize: '110px',
                  fontWeight: '900',
                  color: '#3b82f6',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                ${savings}
              </span>
            </div>

            <div
              style={{
                marginTop: '40px',
                padding: '12px 24px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                fontSize: '24px',
                color: '#60a5fa',
                fontWeight: '600',
              }}
            >
              ${annual} Annual Savings Identified
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                fontSize: '18px',
                color: '#4b5563',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              POWERED BY CREDEX
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const error = e as Error;
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
