const fs = require('fs');

const dummyDetailedDescription = `An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.

The scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.`;

const dummyDetailedBenefits = `| Course | Maximum Loan Limit |
| :--- | :--- |
| **Study in India** | Upto ₹ 10.00 Lakhs |
| **Study in Abroad** | Upto ₹ 20.00 Lakhs |

**Notes:**
1. The loan will be provided for higher education.
2. Up to 90% of the project cost is provided as a loan.

**Repayment period:**
The loan is to be repaid in 5 years after the moratorium period.

**Moratorium period:**
6 months after completion of the course or getting employment, whichever is earlier.`;

const dummyDetailedEligibility = `The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-

1. The applicant must be a citizen of India.
2. Scavengers and their dependents.
3. Safai Karamcharis and their dependents.
4. The applicant should be a student who has secured admission to professional/technical courses.
5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.`;

const dummyApplicationProcess = `### Offline
1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.
2. The applications are appraised and approved by the respective SCAs/Banks.
3. Funds are disbursed to the applicants through the SCAs/Banks.

### Online
1. Visit the official portal.
2. Register and fill the application form.
3. Upload the required documents.
4. Submit the application for verification.`;

const dummyRequiredDocuments = [
  "Aadhaar Card",
  "Marksheets/Certificate of qualifying examination",
  "Admission confirmation letter",
  "Fee structure of the course",
  "Caste Certificate (if applicable)",
  "Income Certificate"
];

const updateSeedJs = () => {
    let seedContent = fs.readFileSync('./seed.js', 'utf8');
    
    // We will extract the current array, parse it, modify it, and write it back.
    // Instead of regex for the whole block, let's just require it if we were in CommonJS, but seed.js is ES module.
    // Let's use regex to find the array.
    const importRegex = /const schemesData = (\[.*?\]);/s;
    const match = seedContent.match(importRegex);
    if(match) {
        let schemes = eval(match[1]); // unsafe but we control the file
        schemes = schemes.map(s => {
            s.detailedDescription = dummyDetailedDescription;
            s.detailedBenefits = dummyDetailedBenefits;
            s.detailedEligibility = dummyDetailedEligibility;
            s.applicationProcess = dummyApplicationProcess;
            s.requiredDocuments = dummyRequiredDocuments;
            return s;
        });
        const replacement = 'const schemesData = ' + JSON.stringify(schemes, null, 2) + ';';
        seedContent = seedContent.replace(importRegex, replacement);
        fs.writeFileSync('./seed.js', seedContent);
        console.log('seed.js updated');
    }
};

const updateAuthContext = () => {
    let authContent = fs.readFileSync('../frontend/src/context/AuthContext.jsx', 'utf8');
    
    const importRegex = /const DEFAULT_SCHEMES = (\[.*?\]);/s;
    const match = authContent.match(importRegex);
    if(match) {
        let schemes = eval(match[1]);
        schemes = schemes.map(s => {
            s.detailedDescription = dummyDetailedDescription;
            s.detailedBenefits = dummyDetailedBenefits;
            s.detailedEligibility = dummyDetailedEligibility;
            s.applicationProcess = dummyApplicationProcess;
            s.requiredDocuments = dummyRequiredDocuments;
            return s;
        });
        const replacement = 'const DEFAULT_SCHEMES = ' + JSON.stringify(schemes, null, 2) + ';';
        authContent = authContent.replace(importRegex, replacement);
        fs.writeFileSync('../frontend/src/context/AuthContext.jsx', authContent);
        console.log('AuthContext.jsx updated');
    }
}

updateSeedJs();
updateAuthContext();
