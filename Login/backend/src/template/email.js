
function textforemial(otp, type) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
        <tr>
            <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width:520px; background:#ffffff; border-radius:14px; overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="background:#111827; padding:32px 20px;">
                            <h1 style="margin:0; color:#ffffff; font-size:30px; letter-spacing:3px;">
                                TXO
                            </h1>
                            <p style="margin:8px 0 0; color:#9ca3af; font-size:12px; letter-spacing:2px;">
                                TECHNOLOGY & INNOVATION
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:35px 30px; color:#374151;">

                            <h2 style="margin:0 0 15px; color:#111827; font-size:23px;">
                                Verify Your Email Address
                            </h2>

                            <p style="font-size:14px; line-height:1.7; color:#6b7280;">
                                Hello,
                                <br><br>
                                Thank you for choosing TXO. To complete your
                                ${type} verification, please use the secure
                                one-time password provided below.
                            </p>

                            <!-- OTP Card -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background:#f3f4f6; border:1px solid #e5e7eb; border-radius:10px; margin:25px 0;">
                                <tr>
                                    <td align="center" style="padding:25px 15px;">
                                        <p style="margin:0 0 12px; color:#6b7280; font-size:12px; letter-spacing:2px;">
                                            YOUR VERIFICATION CODE
                                        </p>

                                        <h1 style="margin:0; color:#111827; font-size:34px; letter-spacing:10px;">
                                            ${otp}
                                        </h1>

                                        <p style="margin:15px 0 0; color:#dc2626; font-size:12px;">
                                            Expires in 5 minutes
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size:13px; line-height:1.7; color:#6b7280;">
                                <strong style="color:#111827;">Security Notice:</strong>
                                Never share this verification code with anyone.
                                TXO will never ask you to disclose your OTP.
                            </p>

                            <p style="margin-top:30px; font-size:14px; color:#374151; line-height:1.7;">
                                Best Regards,<br>
                                <strong style="color:#111827;">Team TXO</strong><br>
                                <span style="color:#9ca3af; font-size:12px;">TXO Company</span>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center"
                            style="background:#f9fafb; padding:20px; border-top:1px solid #e5e7eb;">

                            <p style="margin:0; color:#9ca3af; font-size:11px; line-height:1.7;">
                                This is an automated security email.<br>
                                Please do not reply to this message.
                            </p>

                            <p style="margin:12px 0 0; color:#111827; font-size:12px; font-weight:bold; letter-spacing:2px;">
                                TXO
                            </p>

                            <p style="margin:5px 0 0; color:#9ca3af; font-size:10px;">
                                © ${new Date().getFullYear()} TXO Company. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`;
}

module.exports = textforemial;
