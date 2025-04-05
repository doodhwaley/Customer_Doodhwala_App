// Define the development and production base URLs
// IP address detected from your system
const DEV_API_URL = 'localhost:5000';

// Production domain - update when deploying
const PROD_API_URL = 'https://doodhwaley-be.vercel.app/';

// Use different URLs based on environment
export const baseURL = false ? DEV_API_URL : PROD_API_URL;

export const APP_NAME = 'Doodhwaley';
export const Config = {
  baseColor: '#e94e87', //e94e87,#ff974d
  baseColor2: '#e94e8733', //e94e87 with 0.2 opacity
  onboarding1Color: '#e94e87',
  onboarding2Color: '#fff',
  onboarding3Color: '#e94e87',
  secondaryColor: 'white',
  mainTextColor: 'black',
  secondColor: '#00becd', //00becd,#0068de
  font: 'Montserrat',
};

export const TimingNote =
  'Order Before 10 PM and get Delivery by 7:00 AM by Next Day';
