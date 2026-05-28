import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatEmailEnquiry, LeadFormData, validateLeadForm } from "@/lib/booking";

export const runtime = "nodejs";

type EnquiryPayload = LeadFormData & {
  website?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(source: Record<string, unknown>, key: keyof EnquiryPayload, maxLength = 500): string {
  const value = source[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizePayload(payload: unknown): EnquiryPayload {
  const source = isRecord(payload) ? payload : {};

  return {
    name: readString(source, "name", 120),
    phone: readString(source, "phone", 80),
    email: readString(source, "email", 160),
    serviceType: readString(source, "serviceType", 120),
    pickupSuburb: readString(source, "pickupSuburb", 220),
    destination: readString(source, "destination", 220),
    travelDateTime: readString(source, "travelDateTime", 80),
    passengerCount: readString(source, "passengerCount", 20),
    notes: readString(source, "notes", 1200),
    website: readString(source, "website", 120),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildHtmlEmail(data: LeadFormData): string {
  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "Not provided"],
    ["Service", data.serviceType],
    ["Pickup", data.pickupSuburb],
    ["Destination", data.destination],
    ["Date/time", data.travelDateTime || "Not provided"],
    ["Passengers", data.passengerCount || "Not provided"],
    ["Notes", data.notes || "Not provided"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #ece1d2;color:#6f624f;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #ece1d2;color:#17130d;font-size:15px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="margin:0;padding:0;background:#f8f2e9;font-family:Arial,sans-serif;color:#17130d;">
      <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
        <div style="background:#11100d;color:#fff8ec;padding:24px 26px;">
          <p style="margin:0 0 8px;color:#ddbd76;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Docklands 1998</p>
          <h1 style="margin:0;font-family:Georgia,serif;font-size:32px;line-height:1.05;">New chauffeur enquiry</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#fff8ec;">
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>`;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please send a valid enquiry." }, { status: 400 });
  }

  const enquiry = normalizePayload(body);

  if (enquiry.website) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateLeadForm(enquiry);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Please check the enquiry fields.", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL || process.env.BOOKING_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      {
        message:
          "Email is not configured yet. You can still send the same details by WhatsApp.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const replyTo = enquiry.email || process.env.RESEND_REPLY_TO;
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: `Docklands 1998 enquiry: ${enquiry.serviceType}`,
    html: buildHtmlEmail(enquiry),
    text: formatEmailEnquiry(enquiry),
    replyTo: replyTo || undefined,
  });

  if (error) {
    console.error("Resend enquiry failed", error);
    return NextResponse.json(
      {
        message:
          "The email could not be sent right now. You can still send the same details by WhatsApp.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
