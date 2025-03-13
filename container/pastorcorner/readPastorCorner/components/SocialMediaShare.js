import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  ViberShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappIcon,
  ViberIcon,
} from "react-share";



const SocialMediaShare =({topic, body, sharePhoto, pathNameRaw})=> {
  
    const shareUrl = "https://gofamintpsogba.org"+pathNameRaw;
    const title = topic;
    const hashtag="#GofamintPsOgbaPastorCorner"
                                

    return (
      <div className="flex flex-row flex-wrap gap-3">
          <FacebookShareButton
              url={shareUrl}
              quote={title}
              hashtag={hashtag}
              className="hover:opacity-80"
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="hover:opacity-80"
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="hover:opacity-80"
          >
            <TelegramIcon size={40} round />
          </TelegramShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="hover:opacity-80"
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <LinkedinShareButton
            url={shareUrl}
            className="hover:opacity-80"
          >
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <PinterestShareButton
            url={String(window.location)}
            media={`${String(window.location)}/${sharePhoto}`}
            className="hover:opacity-80"
          >
            <PinterestIcon size={40} round />
          </PinterestShareButton>

          <ViberShareButton
            url={shareUrl}
            title={title}
            className="hover:opacity-80"
          >
            <ViberIcon size={40} round />
          </ViberShareButton>

      </div>
    );
}

export default SocialMediaShare;
