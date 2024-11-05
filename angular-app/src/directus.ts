import { createDirectus, rest, authentication, auth, readItems } from '@directus/sdk';

export type fuelItem =
{
    fuelid: number;
    user_created: string;
    date_created: string;
    gallons: number;
    vehicle: string;
    mileage: number;
}

export const directus = createDirectus('https://directus.dev1.techinems.org')
.with(rest({credentials: 'include'})).with(authentication('cookie', {
    autoRefresh: true,
    credentials: 'include'
}));