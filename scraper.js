//https://forums.d2jsp.org/forum.php?f=271&t=3

import puppeteer from 'puppeteer';
import fs from 'fs/promises';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Function to scrape and save data to JSON
  const scrapeAndSaveData = async () => {
    await page.goto('https://forums.d2jsp.org/forum.php?f=271&t=3'); // Replace with the URL of your target webpage

    const tableData = await page.evaluate(() => {
      const table = document.querySelector('table'); // Replace with your table selector

      if (!table) {
        return [];
      }

      const rows = table.querySelectorAll('tr');
      const rowData = [];

      for (let i = 1; i < rows.length; i++) { // Start from the second row
        const row = rows[i];
        const cell = row.cells[1]; // Replace with the desired cell index (0-based)

        if (cell) {
          const anchorElements = cell.querySelectorAll('a');

          if (anchorElements.length >= 2) {
            const href = 'https://forums.d2jsp.org/' + anchorElements[1].getAttribute('href');
            const title = anchorElements[1].textContent;
            rowData.push({ href, title });
          }
        }
      }

      return rowData;
    });

    if (tableData.length > 0) {
      // Load previously scraped data or initialize an empty array
      let previousData = [];
      try {
        const jsonData = await fs.readFile('tableData.json', 'utf8');
        previousData = JSON.parse(jsonData);
      } catch (error) {
        // Handle file read errors or initialize the array if the file doesn't exist
      }

      // Check if new rows have been added
      const newData = tableData.filter((row) => {
        return !previousData.some((prevRow) => prevRow.href === row.href);
      });

      if (newData.length > 0) {
        console.log('New data found. Adding to JSON file.');
        const updatedData = [...previousData, ...newData];
        const jsonData = JSON.stringify(updatedData, null, 2);
        await fs.writeFile('tableData.json', jsonData, 'utf8');
      } else {
        console.log('No new data found.');
      }
    } else {
      console.log('No data found in the table.');
    }
  };

  // Call the scraping function initially
  await scrapeAndSaveData();

  // Set up an interval to check for changes every 2 minutes (120,000 milliseconds)
  setInterval(scrapeAndSaveData, 120000);

  // Keep the script running
  // You can manually stop the script when you want to end the monitoring
})();
