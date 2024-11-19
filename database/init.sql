-- Create UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create members table with Keycloak integration
CREATE TABLE members 
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamp
CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indices for better performance
CREATE INDEX idx_members_keycloak_id ON members(keycloak_id);
CREATE INDEX idx_members_email ON members(email);

-- Example profile table that extends member information
CREATE TABLE member_profiles 
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_member
        FOREIGN KEY(member_id) 
        REFERENCES members(id)
        ON DELETE CASCADE
);

-- Create trigger for updating timestamp on profiles
CREATE TRIGGER update_member_profiles_updated_at
    BEFORE UPDATE ON member_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create index on member_profiles
CREATE INDEX idx_member_profiles_member_id ON member_profiles(member_id);

-- Create fuel table
CREATE TYPE Vehicle as ENUM ('5939', 'FR-59')
CREATE TABLE fuel_log
(
    id INT PRIMARY KEY DEFAULT,
    member UUID REFERENCES members (members),
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    vehicle Vehicle,
    amount decimal(5,2),
    milage decimal(12,2)
)

-- Insert test user
INSERT INTO members (keycloak_id, email) VALUES ('35459a04-15f8-443c-868e-caddd8732047', 'amattoni@rpiambulance.com')