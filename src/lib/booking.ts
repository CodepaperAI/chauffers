export type LeadFormData = {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  pickupSuburb: string;
  destination: string;
  travelDateTime?: string;
  passengerCount?: string;
  notes?: string;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

export const phoneDisplay = "0403 803 263";
export const phoneHref = "tel:+61403803263";
export const whatsappNumber = "61403803263";

export const serviceTypes = [
  "Airport transfer",
  "Luggage coordination",
  "Wedding transfer",
  "Corporate chauffeur",
  "Winery or attraction tour",
  "Concert or event pickup",
  "Family travel",
  "Emergency ride",
  "Other chauffeur request",
];

export function whatsappHref(message = "Hello Docklands 1998, I would like to book a chauffeur."): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function validateLeadForm(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!data.serviceType.trim()) errors.serviceType = "Please choose a service.";
  if (!data.pickupSuburb.trim()) errors.pickupSuburb = "Please enter the pickup suburb or address.";
  if (!data.destination.trim()) errors.destination = "Please enter the destination.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export function formatWhatsAppEnquiry(data: LeadFormData): string {
  const lines = [
    "Hello Docklands 1998, I would like to enquire about a chauffeur booking.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    `Service: ${data.serviceType}`,
    `Pickup: ${data.pickupSuburb}`,
    `Destination: ${data.destination}`,
    data.travelDateTime ? `Date/time: ${data.travelDateTime}` : "",
    data.passengerCount ? `Passengers: ${data.passengerCount}` : "",
    data.notes ? `Notes: ${data.notes}` : "",
  ];

  return lines.filter(Boolean).join("\n");
}

export function formatEmailEnquiry(data: LeadFormData): string {
  const lines = [
    "New Docklands 1998 chauffeur enquiry",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "Email: Not provided",
    `Service: ${data.serviceType}`,
    `Pickup: ${data.pickupSuburb}`,
    `Destination: ${data.destination}`,
    data.travelDateTime ? `Date/time: ${data.travelDateTime}` : "Date/time: Not provided",
    data.passengerCount ? `Passengers: ${data.passengerCount}` : "Passengers: Not provided",
    data.notes ? `Notes: ${data.notes}` : "Notes: Not provided",
  ];

  return lines.join("\n");
}
