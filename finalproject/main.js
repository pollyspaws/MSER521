async function getSMIE() {
  const sheetName = 'SMIE Site Coordinates & Directions';
  const response = await fetch(
    `https://script.google.com/macros/s/AKfycbwjABaMDStuVqLz8WN6vUbbjXsMM1RKAmmPcdsN6zuwiytNLfmsfXbLeRLBZrE2n5zh/exec?sheet=${sheetName}`
  );
  const SMIE = await response.json();
  console.log('serverData: ', SMIE);
  console.log('');
}