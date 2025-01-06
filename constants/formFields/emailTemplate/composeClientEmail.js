const composeClientEmail = (holder, title, body, email, senderTeam, companyDetails, coyLogUrl)=>{
    
    const imageLink =  coyLogUrl?.file? `data:image/png;base64,${coyLogUrl?.file}` : coyLogUrl; //'https://cdn.sanity.io/images/prvpom28/counting_xpress_db/7412601199ad5a79fc7b7edea436df3b9ac81904-505x501.png';
    
    const template =
        `
        <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
        <meta http-equiv='Content-Type' content='text/html charset=UTF-8' />
        <html lang='en'>
        
          <head></head>
          
        
          <body style='background-color:'';color:#24292e;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Helvetica,Arial,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;'>
            <table align='center' role='presentation' cellSpacing='0' cellPadding='0' border='2px' width='100%' style='max-width:37.5em;width:580px;margin:60px auto;padding:0'>
              <tr style='width:100%; background-color: #fff; border: solid 2px blue !important;'>
                <td style='padding: 15px;'>

                  <img alt='Logo' src='${imageLink}' width='120' height='90' style='display:block;outline:none;border:none;text-decoration:none' />
                  <p style='font-size:20px;line-height:1.25;margin:16px 0; text-align: center;'><span><strong style='color:dodgerblue; '>
                    ${companyDetails?.name}</strong></span> 
                  </p>
                  <table style=' padding:10px;border:solid 1px #dedede;border-radius:5px;text-align:center' align='center' border='0' cellPadding='0' cellSpacing='0' role='presentation' width='100%'>
                    <tbody>
                      <tr>
                        <td style='background-color:aliceblue; padding:20px;'>
                          <p style='font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left'><strong>Dear ${holder},</strong></p>
                          <p style='font-size:16px;line-height:24px;margin:0 0 10px 0;text-align:left; text-decoration: underline; color: blue;'><strong>${title}</strong></p>
                          
                          <div style='margin:0 0 10px 0;text-align:left;'>
                            ${body}
                          </div>
                          <p style='font-size:14px;line-height:24px;margin:0 0 10px 0;text-align:left'>Best regards,</p>
                          <p style='font-size:14px;line-height:5px;margin:0 0 10px 0;text-align:left;'><i>${senderTeam}</i></p>
                          <p style='display:none; font-size:14px;line-height:10px;margin:10 0 10px 0;text-align:left;'><i>(Kosofe Cooperative)</i></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table  style='margin-top: 10px;' align='center' border='0' cellPadding='0' cellSpacing='0' role='presentation' width='100%'>
                    <tbody>
                        <tr >
                          <td style='background-color: #d5d6d7; margin-top:60px; padding: 10px 15px; font-weight: bold;'>
                                <p style='font-size:14px;color:#560382;text-align:center;'>
                                  ${companyDetails?.name}
                                </p>
                                <p style='font-size:12px; color:maroon;text-align:center;'>
                                  ${companyDetails?.address}
                                </p>
                                <br/>
                                <p style='font-size:10px; margin-top:-10px; color:dodgerblue;text-align:center;'>
                                  ${email}
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
    
    
    export default composeClientEmail