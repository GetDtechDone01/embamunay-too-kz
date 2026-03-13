import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, email, companyName, phone, budget, subject, message, attachmentUrl } = await req.json();

        // Prepare email content
        const emailBody = `
New Contact Form Submission

Contact Details:
- Name: ${name}
- Email: ${email}
- Company: ${companyName}
- Phone: ${phone}
- Budget: ${budget}

Subject: ${subject}

Message:
${message}

${attachmentUrl ? `\nAttachment: ${attachmentUrl}` : ''}
        `;

        // Send to info@embamunaitoo.kz using service role
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: "EMBAMUNAY TOO KZ Website",
            to: "info@embamunaitoo.kz",
            subject: `New Contact: ${subject}`,
            body: emailBody
        });

        // Send to salesdept@embamunaitoo.kz using service role
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: "EMBAMUNAY TOO KZ Website",
            to: "salesdept@embamunaitoo.kz",
            subject: `New Contact: ${subject}`,
            body: emailBody
        });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});