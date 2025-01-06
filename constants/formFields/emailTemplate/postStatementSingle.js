const postStatementTemplate = (holder, title)=>{

    const template =
        `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <html lang="en">
        
          <head></head>
          <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
          </div>
        
          <body style="background-color:#d5f2fb;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Helvetica,Arial,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;">
            <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="2px" width="100%" style="max-width:37.5em;width:580px;margin:60px auto;padding:0">
              <tr style="width:100%; background-color: #fff; border: solid 2px blue !important;">
                <td style="padding: 15px;"><img alt="Gofamint PS Ogba Logo" src="https://cdn.sanity.io/images/prvpom28/counting_xpress_db/7412601199ad5a79fc7b7edea436df3b9ac81904-505x501.png" width="90" height="60" style="display:block;outline:none;border:none;text-decoration:none" />
                  <p style="font-size:20px;line-height:1.25;margin:16px 0; text-align: center;"><span><strong style="color:dodgerblue; ">
                    The Profitable Way (Kosofe) Cooperative Multipurpose Society Limited</strong></span> 
                  </p>
                  <table style="padding:24px;border:solid 1px #dedede;border-radius:5px;text-align:center" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left"><strong>Dear ${holder},</strong></p>
                          <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left; text-decoration: underline; color: blue;"><strong>${title},</strong></p>
                          <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">I hope this email finds you well.</p>
                          <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">Please find attached your latest account statement for your review. If you have any questions or need further clarification about your account or the details in the statement, please don't hesitate to contact us.</p>
                          <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">We sincerely appreciate your continued support and trust in our services.</p>
                          
                          
                          <br/>
                          <p style="font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left">Best regards,</p>
                          <p style="font-size:14px;line-height:10px;margin:0 0 10px 0;text-align:left;"><i>Finance Department</i></p>
                          <p style="font-size:14px;line-height:0px;margin:10 0 10px 0;text-align:left;"><i>(Kosofe Cooperative)</i></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table  style="margin-top: 20px;" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                    <tbody>
                        <tr >
                          <td style="background-color: #d5d6d7; margin-top:60px; padding: 10px 15px; font-weight: bold;">
                              <p style="font-size:14px;line-height:24px;color:#560382;text-align:center;">
                                  The Profitable Way (Kosofe) Cooperative Multipurpose Society Limited
                                </p>
                                <p style="font-size:12px;line-height:24px; margin-top: -10px; color:maroon;text-align:center;">
                                  7 Odekunle Street, Off Oluyemi Street, Behind County Hospital, Aguda Ogba Ikeja Lagos, Nigeria
                                </p>  
                          </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </td>
              </tr>
            </table>
          </body>
        
        </html>
    `
    return template
    }
    
    
export default postStatementTemplate