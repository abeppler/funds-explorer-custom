const express = require('express');
const app = express();

const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('https://www.fundsexplorer.com.br/ranking/')
  await page.waitFor(5000)
  
  const result = await page.evaluate(() => {
    
    const colunas = [];
    document.querySelectorAll('#table-ranking > tbody > tr').forEach(row => {
      
      colunas.push({
        ticket: row.cells[0].textContent,
        setor: row.cells[1].textContent,
        precoAtualValor: row.cells[2].getAttribute('data-order'),
      });
    });
    
    return colunas;
    
  });
  
  console.log('mais doidera...');
  
  browser.close()
  return result;
};

app.get('/', function (req, res) {
  
  scrape().then((value) => {
    console.log(value) // sucesso!

    res.json(value);
  
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});