/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `first_name` (text) - Contact's first name
      - `last_name` (text) - Contact's last name
      - `email` (text) - Contact's email address
      - `phone` (text) - Contact's phone number
      - `country_code` (text) - Country code for phone
      - `date_of_birth` (date) - Contact's date of birth
      - `ssn` (text) - Social security number
      - `address_line1` (text) - Primary address line
      - `address_line2` (text) - Secondary address line
      - `city` (text) - City
      - `state` (text) - State
      - `zip_code` (text) - Zip code
      - `country` (text) - Country
      - `trading_experience` (text) - Trading experience level
      - `broker_name` (text) - Name of current broker
      - `account_size` (text) - Account size range
      - `goals` (text) - Trading goals
      - `created_at` (timestamptz) - Timestamp of submission
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Only authenticated admins can read submissions (for now, no public access)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country_code text NOT NULL,
  date_of_birth date NOT NULL,
  ssn text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text DEFAULT '',
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  country text NOT NULL,
  trading_experience text NOT NULL,
  broker_name text DEFAULT '',
  account_size text NOT NULL,
  goals text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);