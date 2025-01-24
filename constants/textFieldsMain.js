
export const allFields = [
    'sn', 'surname', 'firstname', 'othernames',	'title', 'titleAbbrev', 'gender', 'ageGroup', 'residentialAddress',
    'dob', 'birthday', 'phoneNo', 'email', 'occupation', 'officeAddress', 'school',	'qualification', 'maritalStatus', 
    'memberCat', 'baptismalStatus',	'weddingAnn', 'weddingAnnDay',	'membershipStatus',	'personalID', 'familySlug',	
    'familyStatus',	'loginID',	'filledBy',	'filledDate',	'editedBy',	'accessPermit',	'accessDenied',	'notification',	
    'sundaySchoolYear',	'sundaySchoolClass', 'sundaySchoolPost',	'flaggedNoSunSch',	'sunSchoolSaturdayMsg',	
    'sunSchoolSundayMsg','sunSchVisitor','sunSchVisitorDate','comment',
]

export const hiddenFields = ['titleAbbrev', 'ageGroup', 'birthday', 'weddingAnnDay', 'personalID', 'familySlug',
'familyStatus',	'loginID',	'filledBy',	'filledDate',	'editedBy',	'accessPermit',	'accessDenied',	'notification',
'sundaySchoolYear', 'flaggedNoSunSch',	'sunSchoolSaturdayMsg', 'sunSchoolSundayMsg','comment',];


const basic0 = ['dob', 'phoneNo', 'email', 'baptismalStatus', ];
const basic1 = ['title', 'surname', 'firstname', 'othernames',  'gender', ...basic0, 'residentialAddress' ];
const basic2 = ['occupation',  'officeAddress', 'school', 'qualification', 'memberCat',];
const basic3 = ['sundaySchoolClass', 'sundaySchoolPost',];
const basic4 = [...basic3, 'sunSchVisitor','sunSchVisitorDate', "ageGroup", "comment"];



export const mFormEdit = [ ...basic1,
    'maritalStatus', 'weddingAnn', ...basic2, 'membershipStatus',
    ...basic4
]

export const mFormFamily = [
    ...basic1, 'weddingAnn', ...basic2,  ...basic4
]

export const mFormSpouse = [
     'title', 'firstname', 'othernames', ...basic0,
     ...basic2, ...basic3,"ageGroup",
]
//mFormSpouse fields to be derived from mFormFamily 
export const mFormSpouseSubs = [
    'surname', 'gender', 'residentialAddress', 'weddingAnn'
]

export const mFormChild = [
    'title', 'firstname', 'othernames', 'gender', 'maritalStatus', ...basic0,
     ...basic2, ...basic3, "ageGroup"
]

export const mFormIndividual = [
     ...basic1,
     ...basic2,  
     ...basic4
]

export const mFormIndividualVisitor = [
    'title', 'surname', 'firstname', 'othernames', 'gender', 'maritalStatus', ...basic0, 'residentialAddress',
    'occupation', 'sundaySchoolClass', 'invited', 'byWho', 'sunSchVisitorDate', 'ageGroup', 'comment',
]


