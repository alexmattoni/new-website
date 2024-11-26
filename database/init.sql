-- Create UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create members table with Keycloak integration
CREATE TABLE Members
(
    Id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    KeycloakId VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
    BEFORE UPDATE ON Members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indices for better performance
CREATE INDEX idx_members_keycloak_id ON Members(KeycloakId);
CREATE INDEX idx_members_email ON Members(Email);

-- Example profile table that extends member information
CREATE TABLE MemberProfiles
(
    Id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    MemberId UUID NOT NULL REFERENCES Members(id) ON DELETE CASCADE,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    PhoneNumber VARCHAR(20),
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_member
        FOREIGN KEY(MemberId) 
        REFERENCES Members(Id)
        ON DELETE CASCADE
);

-- Create trigger for updating timestamp on profiles
CREATE TRIGGER update_member_profiles_updated_at
    BEFORE UPDATE ON MemberProfiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create index on member_profiles
CREATE INDEX idx_member_profiles_member_id ON MemberProfiles(MemberId);

-- Create fuel table
CREATE TYPE VehicleType as ENUM ('5939', 'FR-59');
CREATE TABLE FuelLogs
(
    Id SERIAL PRIMARY KEY,
    Member VARCHAR(255) REFERENCES Members (KeycloakId),
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    Vehicle VehicleType NOT NULL,
    Amount decimal(5,2),
    Mileage decimal(12,2)
);

-- Insert test user/fuel
INSERT INTO Members (KeycloakId, Email) VALUES ('35459a04-15f8-443c-868e-caddd8732047', 'amattoni@rpiambulance.com');
INSERT INTO FuelLogs (Member, Vehicle, Amount, Mileage) VALUES ('35459a04-15f8-443c-868e-caddd8732047', 'FR-59', 0.00, 0.00);