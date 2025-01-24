import { base64Image } from "./base64Images"

const titheStatementTemplate = (statementData)=>{

    const template =
       `
<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
  <html lang='en'>

  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <title>Tithe Record Statement</title>
    
    <style>
     body {
        counter-reset: pageCount;
      }
       #footer::before {
          counter-increment: pageCount;
          content: 'Page ' counter(pageCount);
       }
      
      @page {
        margin: 30px 30px 100px 30px;
      }
      #footer {
        position: fixed;
        left: -50px; bottom: -105px; right: -50px; height: 80px;
        background-color: #fa9393;
        padding:10px 50px;
      }
    </style>
    
  </head>
  <div id='__react-email-preview' style='display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0'>
  </div>

  <body style='font-size: 12px; background-color:white; padding: 2em 5em 1em 5em; color:#24292e;font-family:-apple-system,BlinkMacSystemFont;'>
    <div id='footer'>
        <p style='text-align:center;  margin-top:-15px'>This is a confidential information that is meant solely for {$acctName}.</p>
        <p style='text-align:center; margin-top:-7px';>For complaints and equiries, please contact us at</p>
        <p style='text-align:center; margin-top:-15px'>No 7, Odekunle Street, behind County Bus Stop, Aguda-Ogba, Ikeja, Lagos</p>
    </div>
    <div style="width: 100%; position: relative;">
        <div style='position: absolute; left: -1rem; top: -1rem;'>
            <img alt='logo'  width='90' height='90' src="data:image/png;base64,${base64Image}"/>
        </div>
        <div style='font-size: 18px; font-weight: bold; display:flex; flex-direction:column; width: 100%; justify-content: center; align-items: center; margin: 0 0 20px 0'>
            <div style='text-align; color: rgb(229, 3, 3); font-size: 28px; text-align: center;'>The Gospel Faith Mission International</div>
            <div style="color: #4924f0; font-size: 20px; text-align: center;">Pacesetters Assembly, Ogba District Headquarters</div>
            <div style="color: #2605bb; font-size: 18px; text-align: center;">7, Odekunle Street, behind County Bus Stop, Aguda-Ogba, Ikeja, Lagos</div>
        </div>
        <div style='display:inline-block; margin-top: 15px;'>
             <div style='color: red; font-size: 18px; font-weight: bold;'>Tithe Record Statement</div>
            <div style='font-size: 14px; padding-top: 3px;'>Printed date: {$genDate}</div>
        </div>
    </div>
    <div style='margin: 10px 0; font-size: 14px; padding: 10px; margin-top: 2em; border: 1px red solid; width:300px !important; height:110px; border-radius: 10px;'>
        <div style='font-weight: bold;'>{$acctName}</div>

        <div style='padding-top: 10px;'>
            <div style='font-weight: bold;'>Membership Category: </div>
            <div style='padding-top: 2px; padding-top: 5px;'>Minister</div>
        </div>
        <div style='padding-top: 10px;'>
            <div style='font-weight: bold;'>Contact Number: </div>
            <div style='padding-top: 2px; padding-top: 5px;'>08076454545455</div>
        </div>
    </div>


    <div style="">
        <div style='color: red; font-weight: bold; font-size: 13px; padding-left: 5px; margin-top: 50px;'>
            Statement Period: From {$startDate} to {$endDate}
        </div>
        <div style='margin: 4px 0; border-bottom: 1px red solid; border-top: 1px red solid'>
            <div style='padding: 6px 0 6px 10px; font-weight: bold; font-size: 14px;'>
                <div style='width: 150px; display: inline-block'>Month</div>
                <div style='width: 20%; display: inline-block; padding-left:20px;'>2024</div>
                <div style='width: 20%; display: inline-block'>2023</div>
            </div>
            ${statementData}
        </div> 
    </div>     
         </body>
        </html>
       `
    return template
    }
       

       
export default titheStatementTemplate