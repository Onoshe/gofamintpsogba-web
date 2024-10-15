//a password reset on your account was initiated.

const getOTPEmailBody =({OTP, name, optMsg, subject})=>{
 const body = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">

    <head></head>
    <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
    
    </div>

    <body style="color:#24292e;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Helvetica,Arial,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;">
    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="2px" width="100%" style="max-width:37.5em;width:580px;margin:60px auto;padding:0">
        <tr style="width:100%; background-color: #fff; border: solid 2px blue !important;">
        <td style="padding: 15px;"><img alt="Gofamint PS Ogba Logo" src="https://quickrecords.gofamintpsogba.org/image_server.php?image=quickrecords-logo.jpg" width="120" height="60" style="display:block;outline:none;border:none;text-decoration:none" />
            <p style="font-size:20px;line-height:1.25; text-align: center;">
                ${subject}
            </p>
            <table style="padding:24px;border:solid 1px #dedede;border-radius:5px;text-align:center" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
            <tbody>
                <tr>
                <td>
                    <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left"><strong>${name},</strong></p>
                    <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">
                        Please use the one time password below to authorize your account
                    </p>
                    <p style="background-color:aliceblue; text-align:center; width:fit-content; border-radius:3px; border:solid 1px silver !important; padding:8px 18px">
                        ${OTP}
                    </p>
                    <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">
                        ${optMsg}
                    </p>
                    <p  style="text-align:left; margin-top:5px"><em><i>Thank you<i><em></p>
                </td>
                </tr>
            </tbody>
            </table>
            
        </td>
        </tr>
    </table>
    </body>

    </html> `;
    return body
}


export default getOTPEmailBody