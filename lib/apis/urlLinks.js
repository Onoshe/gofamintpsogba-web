import { sortArrayByKey } from "@/lib/sortArrayByKey";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
const env = process.env.NODE_ENV;


//http://localhost/psogbaasset/official_site_img.php?s=imgPath,name&c=imgGroup&v=five_star
const baseUrl_Local = "http://localhost/psogbaasset";
const baseUrl_Prod = "https://psogbaasset.gofamintpsogba.org"; 
//const baseUrl_Prod_Post = "https://quickrecords.gofamintpsogba.org";

const baseUrl = baseUrl_Prod; //isDevelopment? baseUrl_Local : baseUrl_Prod; //baseUrl_Local;


export function getImgLinkBase(){return baseUrl};
export function getImgLink(params){
    return `${baseUrl}/official_site.php?t=${params?.table? params.table: 'official_site_images'}&s=${params?.s? params.s : ''}&c=${params?.c? params.c : ''}&v=${params?.v? params.v : ''}`
}
export function getDataLink(params){
    return `${baseUrl}/official_site.php?t=${params?.table? params.table: 'official_site_data'}&s=${params?.s? params.s : ''}&c=${params?.c? params.c : ''}&v=${params?.v? params.v : ''}`
}

export function getLinkPost(){
    return `${baseUrl}/official_site.php`;
}

export function getResourceDldLink(){
    return `${baseUrl}/official_website/resources`;
}

export function getUploadLink(){
    return `${baseUrl}/officialSiteUpload.php`;
}



export function getUrl(data, imgGroup, type){
    let dataFmt = "";
    if(data?.length){
        dataFmt = [];
        const dataFilter = data?.filter((dt)=> dt.imgGroup === imgGroup);
        for (let index = 0; index < dataFilter.length; index++) {
            let el = dataFilter[index];
            if(type==='url'){
                dataFmt.push(baseUrl+'/'+el.imgPath);
            }else{
                dataFmt.push({...el, imgPath:baseUrl+'/'+el.imgPath})
            }        
        }
    }
    return dataFmt;
}

export function getVideoUrl(data, imgGroup){
    let dataFmt = "";
    if(data?.length){
        dataFmt = [];
        const dataFilter = data?.filter((dt)=> dt.imgGroup === imgGroup);
        for (let index = 0; index < dataFilter.length; index++) {
            let el = dataFilter[index];
            if(el.videoClipPath){
                dataFmt.push(baseUrl+'/'+el.videoClipPath);
            }        
        }
    }
    return dataFmt;
}

export function getUrlMediaPage(data){
    let dataFmt = "";
    if(data?.length){
        dataFmt = [];
        for (let index = 0; index < data.length; index++) {
            let el = data[index];
            dataFmt.push({...el, imgPath:baseUrl+'/'+el.imgPath})        
        }
    }

    return dataFmt;
}

export function getExtractInfo(data=[]){
    const aboutSlug = 'about-gofamint-ps-ogba';
    const contactUsSlug = 'contact-us-details';
    const copyWriteSlug = 'copy-write-year';
    const anchorGroup = 'AnchorAndFaithDeclaration';
    const upcomingProgSlug = 'upcoming-program-settings';
    const aboutData = data?.find((dt)=> dt.slug === aboutSlug);
    const contactUsData = data?.find((dt)=> dt.slug === contactUsSlug);
    const copyWriteData = data?.find((dt)=> dt.slug === copyWriteSlug);
    const upcomingProgSettings = data?.find((dt)=> dt.slug === upcomingProgSlug);

    const anchorAndFaith = data?.filter((dt)=> dt.group === anchorGroup);
        sortArrayByKey(anchorAndFaith, 'textShort1', 'ASC');
    
    const anchorSequence = [];
    const latestAnchorAndFaith = anchorAndFaith[0] || [];
    const anchorArr = latestAnchorAndFaith?.textMedium2?.split("|");
    const anchorAniTimeArr = latestAnchorAndFaith?.textShort3?.split("|");
    

    anchorArr?.forEach((el, i) => {
         anchorSequence.push(el);
         anchorSequence.push(parseInt(anchorAniTimeArr[i]) || 1000);   
    });

    return {aboutData, contactUsData, copyWriteData, anchorAndFaith, 
        anchorSequence, upcomingProgSettings, latestAnchorAndFaith}
}