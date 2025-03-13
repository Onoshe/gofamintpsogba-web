/*----------------------------------- CHATGPT ----------------------------*/

function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

function handleSocialShare({ url, hashtag, separator = ' ', title, summary, source, via, body }) {
  const facebook = 'https://www.facebook.com/sharer/sharer.php' + objectToGetParams({ u: url, quote: title, hashtag });
  const x = 'https://twitter.com/intent/tweet' + objectToGetParams({ url, text: title, hashtag, via });
  const linkedin = 'https://www.linkedin.com/shareArticle' + objectToGetParams({ url, mini: 'true', title, summary, source });
  
  const telegramText = body ? `${title}\n\n${body}\n\n${url}` : `${title}\n\n${url}`;
  const telegram = 'https://telegram.me/share/url' + objectToGetParams({ url, text: telegramText });

  const whatsappText = body ? `${title}${separator}${body}${separator}${url}` : `${title}${separator}${url}`;
  const whatsapp = 'https://' +
      (isMobileOrTablet() ? 'api' : 'web') +
      '.whatsapp.com/send' +
      objectToGetParams({ text: whatsappText });

  return { facebook, x, linkedin, telegram, whatsapp };
}

export default handleSocialShare;

export function objectToGetParams(object) {
  const params = Object.entries(object)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return params.length > 0 ? `?${params.join('&')}` : '';
}


//How to Use IT
/*--------------------------------------------------------------
const urls = handleSocialShare({
  url: 'https://example.com',
  title: 'Check this out!',
  hashtag: '#example',
  via: 'username'
});

window.open(urls.facebook, '_blank');  // Opens Facebook share link
--------------------------------------------------------------------*/



/*------------------------------------------------- BEFORE----------------------------
function isMobileOrTablet() {
    return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
  }
  


function handleSocialShare({url, hashtag, separator = ' ', title, summary, source, via}) {
  const facebook =  'https://www.facebook.com/sharer/sharer.php' + objectToGetParams({ u: url, quote:title, hashtag });
    const x = 'https://twitter.com/intent/tweet' + objectToGetParams({ url, text:title, hashtag, via });
    const linkedin = 'https://www.linkedin.com/shareArticle' + objectToGetParams({ url, mini: 'true', title, summary, source });
    const telegram = 'https://telegram.me/share/url' + objectToGetParams({ url, text: title,});
    const whatsapp = 'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    '.whatsapp.com/send' +
    objectToGetParams({
      text: title ? title + separator + url : url,
    })
  
    
}


export default handleSocialShare;

export function objectToGetParams(object) {
const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

return params.length > 0 ? `?${params.join('&')}` : '';
}

------------------------------------------------------------------*/