const pathTitle = [
    'Home',
    'About',
    "Pastor's Corner",
    'Media',
    'Contact Us',
    'Admin'
];

const pathNames = [
    '/',
    '/about',
    "/pastor-corner",
    '/media',
    '/contact-us',
    '/admin-login'
];

const paths = [
    '/',
    'about',
    "pastor-corner",
    'media',
    'contact-us',
    'admin-login'
];


const navLinks = [
 {title:pathTitle[0], path:pathNames[0]},
 {title:pathTitle[1], path:pathNames[1]},
 {title:pathTitle[2], path:pathNames[2]},
 {title:pathTitle[3], path:pathNames[3]},
 {title:pathTitle[4], path:pathNames[4]},
 {title:pathTitle[5], path:pathNames[5]},
];
function getPathName(path){

   const res = path===`${paths[0]}`? pathTitle[0] :
            path===`/${paths[1]}`? pathTitle[1] :
            path===`/${paths[2]}`? pathTitle[2] :
            path===`/${paths[3]}`? pathTitle[3] :
            path===`/${paths[4]}`? pathTitle[4] : 
            path===`/${paths[5]}`? pathTitle[5] :
            path.includes('/pastor-corner/')? "Pastor's Corner": "Gofamint PS";

    return res
}


export { pathTitle, pathNames, getPathName, navLinks, }