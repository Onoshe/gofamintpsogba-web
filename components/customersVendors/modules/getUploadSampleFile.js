const { handleExportTemplate2Excel } = require("@/lib/exel/handleExportTemplate2Excel");



export const getUploadSampleFile =()=>{
    const docName = "Personal accounts upload sample";
    const dataTemp = [
        ["type", " title", " accountCode", " firstname", " lastname", " othernames", " dob", " email", " phoneNo", "accountGroup", " residentialAddress", " formNo", " position", " nextContactPersonName", " nextContactPersonPhoneNo", " nextContactPersonEmail", " companyName", " companyEmail", " companyAddress", " companyPhoneNo", " businessType", " region", " country", " state", " zip", " registeredDate", " info"], 
        ["Company", "Mr", "005010", "James", "Butt", "Butt", "1990-05-22", "jbutt@gmail.com", "504-621-8927", "GENERAL", "6649 N Blue Gum St", "0001", "Manager", "Veronika", "410-655-8723", "minna_amigon@yahoo.com", "Benton, John B Jr", "benton@benton.com", "6649 N Blue Gum St", "410-655-8723", "Services", "", "Orleans", "New Orleans", "70116", "2024-03-31", "Good client"], 
        ["Individual", "Mrs", "005020", "Josephine", "Darakjy", "Darakjy", "1995-01-20", "josephine_darakjy@darakjy.org", "810-292-9388", "GENERAL", "4 B Blue Ridge Blvd", "0002", "Asst Manager", "Willard", "215-874-1229", "amaclead@gmail.com", "Chanay, Jeffrey A Esq", "chanay@chana.com", "4 B Blue Ridge Blvd", "215-874-1229", "Engineering", "", "Livingston", "Brighton", "48116", "2024-03-31", ""], 
        ["Company", "Miss", "005030", "Art", "Venere", "Venere", "1980-11-12", "art@venere.org", "856-636-8749", "GENERAL", "8 W Cerritos Ave #54", "0003", "Supervisor", "Maryann", "631-335-3414", "kiley.caldarera@aol.com", "Chemel, James L Cpa", "chemel@chemel.com", "8 W Cerritos Ave #54", "631-335-3414", "Consultancy", "", "Gloucester", "Bridgeport", "8014", "2024-03-31", ""], 
        ["Company", "Mr", "005040", "Lenna", "Paprocki", "Paprocki", "1985-05-25", "lpaprocki@hotmail.com", "907-385-4412", "GENERAL", "639 Main St", "0004", "Head of Account", "Alisha", "310-498-5651", "gruta@cox.net", "Feltz Printing Service", "felt@felt.com", "639 Main St", "310-498-5651", "Printing", "", "Anchorage", "Anchorage", "99501", "2024-03-31", ""], 
        ["Company", "Dr", "005050", "Donette", "Foller", "Foller", "1983-10-24", "donette.foller@cox.net", "513-570-1893", "GENERAL", "34 Center St", "0005", "Head of Admin", "Allene", "440-780-8425", "calbares@gmail.com", "Printing Dimensions", "dimensions@dimensions.com", "34 Center St", "440-780-8425", "Printing", "", "Butler", "Hamilton", "45011", "2024-03-31", ""], 
        ["Company", "Mr", "005060", "Simona", "Morasca", "Morasca", "1995-05-27", "simona@morasca.com", "419-503-2484", "LEVEL-1", "3 Mcauley Dr", "0006", "Manager", "Chanel", "956-537-6195", "mattie@aol.com", "Chapman, Ross E Esq", "chapman@gmail.com", "3 Mcauley Dr", "956-537-6195", "Consultancy", "", "Ashland", "Ashland", "44805", "2024-03-31", ""], 
        ["Individual", "Mrs", "005070", "Mitsue", "Tollner", "Tollner", "1987-03-31", "mitsue_tollner@yahoo.com", "773-573-6914", "LEVEL-1", "7 Eads St", "0007", "Asst Manager", "Ezekiel", "602-277-4385", "meaghan@hotmail.com", "Morlong Associates", "moelong@gmail.com", "7 Eads St", "602-277-4385", "Consultancy", "", "Cook", "Chicago", "60632", "2024-03-31", ""], 
        ["Individual", "Miss", "005080", "Leota", "Dilliard", "Dilliard", "1992-02-20", "leota@hotmail.com", "408-752-3500", "LEVEL-2", "7 W Jackson Blvd", "0008", "Supervisor", "Inouye", "931-313-9635", "gladys.rim@rim.org", "Commercial Press", "cpress@ymail.com", "7 W Jackson Blvd", "931-313-9635", "Printing", "", "Santa Clara", "San Jose", "95111", "2024-03-31", ""], 
        ["Individual", "Mr", "005090", "Sage", "Wieser", "Wieser", "1990-01-17", "sage_wieser@cox.net", "605-414-2147", "LEVEL-2", "5 Boston Ave #88", "0009", "Head of Account", "Kolmetz", "414-661-9598", "yuki_whobrey@aol.com", "Truhlar And Truhlar Attys", "truhlar@ymail.com", "5 Boston Ave #88", "414-661-9598", "Consultancy", "", "Minnehaha", "Sioux Falls", "57105", "2024-03-31", ""], 
        ["Individual", "Mrs", "005100", "Kris", "Marrier", "Marrier", "1985-12-15", "kris@gmail.com", "410-655-8723", "LEVEL-2", "228 Runamuck Pl #2808", "0010", "Head of Admin", "Royster", "313-288-7937", "fletcher.flosi@yahoo.com", "King, Christopher A Esq", "kingchris@gmail.com", "228 Runamuck Pl #2808", "313-288-7937", "Consultancy", "", "Baltimore City", "Baltimore", "21224", "2024-03-31", ""]
    ];
    const dataGuide = [
        ["Upload Sample Guide"],
        [""],
        ["1. The data file must have the following columns as the header: type,  title,  accountCode,  firstname,  lastname,  othernames,  dob,  email,  phoneNo,  accountGroup, residentialAddress,  formNo,  position,  nextContactPersonName,  nextContactPersonPhoneNo,  nextContactPersonEmail,  companyName,  companyEmail,  companyPhoneNo,  businessType,  region,  country,  state,  zip,  registeredDate,  info"],
        ["2. The header must be the first row in the data file and must not be changed."],
        ["3. The 'type' is the type of client, either Company or Individual"],
        ["4. The 'title' should either be Mr, Mrs or Miss"],
        ["5. The 'dob' column is the date of birth. The format is yyyy-mm-dd. Eg, 1994-05-07. Please note that you may need to set your excel number format to 'text' for it to accept this format."],
        ["6. AccountGroup is used to group or categorise the various personal accounts"],
        ["7. The 'registeredDate' is the date when the client account was created. The date format should also be yyyy-mm-dd."],
        ["8. The maximum characters for account accountCode is 7. E.g, 0000001 or 1234567"],
        ["9. All the columns for client can be filled, but the minumum required columns for any client are:  type,  title,  accountCode,  firstname,  lastname"],
        ["10. The sample file must be the first visible sheet in the workbook to upload."]
    ];
    const col1MaxW = "";
    //const dataTypeCodes = getTypeCodes(coaStructure, ['code', 'title', 'class']);
    //console.log(dataTypeCodes);
    handleExportTemplate2Excel({docName, dataTemp, dataGuide, col1MaxW,}); 
}



export function getTypeCodes(arr, keys) {
    //Exclude  classCodes (0) & retainedEarnings 
    const filterArr = arr.filter((dt)=>{
        return dt.subCode != 0 && dt.name != "retainedEarnings"
    })
    const data  = filterArr.map(obj => keys.map(key => obj[key]));
    const header = ["TypeCode", "Account Type", "Account Class"];

    data.unshift(header);

    return data
  }


const allData =  [
	["type", " title", " accountCode", " firstname", " lastname", " othernames", " dob", " email", " phoneNo", " residentialAddress", " formNo", " position", " nextContactPersonName", " nextContactPersonPhoneNo", " nextContactPersonEmail", " companyName", " CompanyEmail", " companyPhoneNo", " businessType", " region", " country", " state", " zip", " registeredDate", " info"], 
	["Company", "Mr", "000001", "James", "Butt", "Butt", "1990-05-22", "jbutt@gmail.com", "504-621-8927", "6649 N Blue Gum St", "0001", "Manager", "Veronika", "410-655-8723", "minna_amigon@yahoo.com", "Benton, John B Jr", "benton@benton.com", "410-655-8723", "Services", "Orleans", "New Orleans", "70116", "2024-03-31"], 
	["Individual", "Mrs", "000002", "Josephine", "Darakjy", "Darakjy", "1995-01-20", "josephine_darakjy@darakjy.org", "810-292-9388", "4 B Blue Ridge Blvd", "0002", "Asst Manager", "Willard", "215-874-1229", "amaclead@gmail.com", "Chanay, Jeffrey A Esq", "chanay@chana.com", "215-874-1229", "Engineering", "Livingston", "Brighton", "48116", "2024-03-31"], 
	["Company", "Miss", "000003", "Art", "Venere", "Venere", "1980-11-12", "art@venere.org", "856-636-8749", "8 W Cerritos Ave #54", "0003", "Supervisor", "Maryann", "631-335-3414", "kiley.caldarera@aol.com", "Chemel, James L Cpa", "chemel@chemel.com", "631-335-3414", "Consultancy", "Gloucester", "Bridgeport", "8014", "2024-03-31"], 
	["Company", "Mr", "000004", "Lenna", "Paprocki", "Paprocki", "1985-05-25", "lpaprocki@hotmail.com", "907-385-4412", "639 Main St", "0004", "Head of Account", "Alisha", "310-498-5651", "gruta@cox.net", "Feltz Printing Service", "felt@felt.com", "310-498-5651", "Printing", "Anchorage", "Anchorage", "99501", "2024-03-31"], 
	["Company", "Mr", "000005", "Donette", "Foller", "Foller", "1992-10-22", "donette.foller@cox.net", "513-570-1893", "34 Center St", "0005", "Head of Admin", "Allene", "440-780-8425", "calbares@gmail.com", "Printing Dimensions", "dimensions@dimensions.com", "440-780-8425", "Printing", "Butler", "Hamilton", "45011", "2024-03-31"], 
	["Company", "Mr", "000006", "Simona", "Morasca", "Morasca", "1995-05-27", "simona@morasca.com", "419-503-2484", "3 Mcauley Dr", "0006", "Manager", "Chanel", "956-537-6195", "mattie@aol.com", "Chapman, Ross E Esq", "chapman@gmail.com", "956-537-6195", "Consultancy", "Ashland", "Ashland", "44805", "2024-03-31"], 
	["Individual", "Mrs", "000007", "Mitsue", "Tollner", "Tollner", "1987-03-31", "mitsue_tollner@yahoo.com", "773-573-6914", "7 Eads St", "0007", "Asst Manager", "Ezekiel", "602-277-4385", "meaghan@hotmail.com", "Morlong Associates", "moelong@gmail.com", "602-277-4385", "Consultancy", "Cook", "Chicago", "60632", "2024-03-31"], 
	["Individual", "Miss", "000008", "Leota", "Dilliard", "Dilliard", "1992-02-20", "leota@hotmail.com", "408-752-3500", "7 W Jackson Blvd", "0008", "Supervisor", "Inouye", "931-313-9635", "gladys.rim@rim.org", "Commercial Press", "cpress@ymail.com", "931-313-9635", "Printing", "Santa Clara", "San Jose", "95111", "2024-03-31"], 
	["Individual", "Mr", "000009", "Sage", "Wieser", "Wieser", "1990-01-17", "sage_wieser@cox.net", "605-414-2147", "5 Boston Ave #88", "0009", "Head of Account", "Kolmetz", "414-661-9598", "yuki_whobrey@aol.com", "Truhlar And Truhlar Attys", "truhlar@ymail.com", "414-661-9598", "Consultancy", "Minnehaha", "Sioux Falls", "57105", "2024-03-31"], 
	["Individual", "Mrs", "000010", "Kris", "Marrier", "Marrier", "1985-12-15", "kris@gmail.com", "410-655-8723", "228 Runamuck Pl #2808", "0010", "Head of Admin", "Royster", "313-288-7937", "fletcher.flosi@yahoo.com", "King, Christopher A Esq", "kingchris@gmail.com", "313-288-7937", "Consultancy", "Baltimore City", "Baltimore", "21224", "2024-03-31"], 
	["Company", "Miss", "000001", "Minna", "Amigon", "Amigon", "1994-07-27", "minna_amigon@yahoo.com", "215-874-1229", "2371 Jerrold Ave", "0001", "Manager", "Slusarski", "504-621-8927", "jbutt@gmail.com", "Dorl, James J Esq", "dorl@gmail.com", "504-621-8927", "Consultancy", "Montgomery", "Kulpsville", "19443", "2024-03-31"], 
	["Company", "Mr", "000002", "Abel", "Maclead", "Maclead", "1988-04-17", "amaclead@gmail.com", "631-335-3414", "37275 St  Rt 17m M", "0002", "Asst Manager", "Iturbide", "810-292-9388", "josephine_darakjy@darakjy.org", "Rangoni Of Florence", "rangoni@ymail.com", "810-292-9388", "Engineering", "Suffolk", "Middle Island", "11953", "2024-03-31"], 
	["Individual", "Mrs", "000003", "Kiley", "Caldarera", "Caldarera", "1993-09-19", "kiley.caldarera@aol.com", "310-498-5651", "25 E 75th St #69", "0003", "Supervisor", "Caudy", "856-636-8749", "art@venere.org", "Feiner Bros", "feiner@gmail.com", "856-636-8749", "Engineering", "Los Angeles", "Los Angeles", "90034", "2024-03-31"], 
	["Individual", "Miss", "000004", "Graciela", "Ruta", "Ruta", "1989-06-19", "gruta@cox.net", "440-780-8425", "98 Connecticut Ave Nw", "0004", "Head of Account", "Chui", "907-385-4412", "lpaprocki@hotmail.com", "Buckley Miller & Wright", "buckley@ymail.com", "907-385-4412", "Engineering", "Geauga", "Chagrin Falls", "44023", "2024-03-31"], 
	["Company", "Mr", "000005", "Cammy", "Albares", "Albares", "1987-04-21", "calbares@gmail.com", "956-537-6195", "56 E Morehead St", "0005", "Head of Admin", "Willard", "513-570-1893", "donette.foller@cox.net", "Rousseaux, Michael Esq", "rousseaux@gmail.com", "513-570-1893", "Engineering", "Webb", "Laredo", "78045", "2024-03-31"], 
	["Company", "Mrs", "000006", "Mattie", "Poquette", "Poquette", "1993-05-14", "mattie@aol.com", "602-277-4385", "73 State Road 434 E", "0006", "Manager", "Maryann", "419-503-2484", "simona@morasca.com", "Century Communications", "century@gmail.com", "419-503-2484", "Engineering", "Maricopa", "Phoenix", "85013", "2024-03-31"], 
	["Individual", "Miss", "000007", "Meaghan", "Garufi", "Garufi", "1984-03-28", "meaghan@hotmail.com", "931-313-9635", "69734 E Carrillo St", "0007", "Asst Manager", "Alisha", "773-573-6914", "mitsue_tollner@yahoo.com", "Bolton, Wilbur Esq", "bolton@bolton.com", "773-573-6914", "Hotel", "Warren", "Mc Minnville", "37110", "2024-03-31"], 
	["Individual", "Mr", "000008", "Gladys", "Rim", "Rim", "1988-02-18", "gladys.rim@rim.org", "414-661-9598", "322 New Horizon Blvd", "0008", "Supervisor", "Allene", "408-752-3500", "leota@hotmail.com", "T M Byxbee Company Pc", "byxbee@gmail.com", "408-752-3500", "Engineering", "Milwaukee", "Milwaukee", "53207", "2024-03-31"], 
	["Company", "Mrs", "000009", "Yuki", "Whobrey", "Whobrey", "1987-05-22", "yuki_whobrey@aol.com", "313-288-7937", "1 State Route 27", "0009", "Head of Account", "Paprocki", "605-414-2147", "sage_wieser@cox.net", "Farmers Insurance Group", "farmersi@gmail.com", "605-414-2147", "Agriculture", "Wayne", "Taylor", "48180", "2024-03-31"], 
	["Company", "Miss", "000010", "Fletcher", "Flosi", "Flosi", "1985-02-20", "fletcher.flosi@yahoo.com", "815-828-2147", "394 Manchester Blvd", "0010", "Head of Admin", "Foller", "410-655-8723", "kris@gmail.com", "Post Box Services Plus", "postbox@ymail.com", "410-655-8723", "Services", "Winnebago", "Rockford", "61109", "2024-03-31"], 
	["Individual", "Mr", "000011", "Bette", "Nicka", "Nicka", "1981-11-11", "bette_nicka@cox.net", "610-545-3615", "6 S 33rd St", "0011", "Head of Account", "Morasca", "215-874-1229", "minna_amigon@yahoo.com", "Sport En Art", "sportart@sport.com", "215-874-1229", "Services", "Delaware", "Aston", "19014", "2024-03-31"]
];