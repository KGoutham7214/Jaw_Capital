import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const data: ContactSubmission = await req.json();

    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          country_code: data.countryCode,
          date_of_birth: data.dateOfBirth,
          ssn: data.ssn,
          address_line1: data.addressLine1,
          address_line2: data.addressLine2,
          city: data.city,
          state: data.state,
          zip_code: data.zipCode,
          country: data.country,
          trading_experience: data.tradingExperience,
          broker_name: data.brokerName,
          account_size: data.accountSize,
          goals: data.goals,
        }
      ]);

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to save contact form submission');
    }

    console.log('Contact form submission saved to database');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully.'
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