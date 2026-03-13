import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Validate webhook signature or add basic validation
        const { submissionData } = await req.json();
        
        if (!submissionData) {
            return Response.json({ error: 'Missing submission data' }, { status: 400 });
        }

        // Prepare email content
        const emailBody = `
New Contact Form Submission

Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${submissionData.full_name}
Email: ${submissionData.email}
Company: ${submissionData.company_name}
Phone: ${submissionData.phone}
Budget: ${submissionData.budget}

Subject: ${submissionData.subject}

Message:
${submissionData.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${submissionData.attachment_url ? `Attachment: ${submissionData.attachment_url}` : ''}

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })}
        `.trim();

        // Send to both email addresses using service role
        await Promise.all([
            base44.asServiceRole.integrations.Core.SendEmail({
                from_name: "EMBAMUNAY TOO KZ Website",
                to: "info@embamunaitoo.kz",
                subject: `New Contact: ${submissionData.subject}`,
                body: emailBody
            }),
            base44.asServiceRole.integrations.Core.SendEmail({
                from_name: "EMBAMUNAY TOO KZ Website",
                to: "salesdept@embamunaitoo.kz",
                subject: `New Contact: ${submissionData.subject}`,
                body: emailBody
            })
        ]);

        return Response.json({ success: true });
    } catch (error) {
        console.error('Email notification error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});