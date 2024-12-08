-- Create UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- <<< MEMBERS >>>

-- Create members table using KeycloakId as core identity key
CREATE TABLE members
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_id UUID NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Updates the 'last updated' column when triggered
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating member timestamp
CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indices for better performance
CREATE INDEX idx_members_keycloak_id ON members(keycloak_id);
CREATE INDEX idx_members_email ON members(email);

-- <<< MEMBER PROFILES >>>

-- Example profile table that extends member information
CREATE TABLE member_profiles
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES members(keycloak_id) ON DELETE CASCADE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(20),
    address VARCHAR(40),
    city VARCHAR(20),
    state VARCHAR(2),
    zip_code VARCHAR(5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_member
        FOREIGN KEY(member_id) 
        REFERENCES members(keycloak_id)
        ON DELETE CASCADE
);

-- Create trigger for updating member profile timestamp
CREATE TRIGGER update_member_profiles_updated_at
    BEFORE UPDATE ON member_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create index on member_profiles
CREATE INDEX idx_member_profiles_member_id ON member_profiles(member_id);

-- <<< FUEL >>>

-- Create fuel table
CREATE TABLE fuel_logs
(
    id SERIAL PRIMARY KEY,
    member UUID REFERENCES members(keycloak_id),
    member_first_name varchar(50),
    member_last_name varchar(50),
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- 0 for 5939, 1 for FR59; i tried to do some fancy enum stuff but it just got confusing
    vehicle int NOT NULL,
    amount decimal(5,2),
    mileage decimal(12,2)
);

-- Insert test user/fuel
INSERT INTO members (keycloak_id, email) VALUES ('35459a04-15f8-443c-868e-caddd8732047', 'amattoni@rpiambulance.com');
INSERT INTO member_profiles (member_id, first_name, last_name) VALUES ('35459a04-15f8-443c-868e-caddd8732047', 'Alex', 'Mattoni');
INSERT INTO fuel_logs (member, member_first_name, member_last_name, vehicle, amount, mileage) VALUES ('35459a04-15f8-443c-868e-caddd8732047', 'Alex', 'Mattoni', 1, 10.5, 15000);