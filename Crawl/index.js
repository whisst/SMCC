const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://genk.vn/lam-the-nao-mot-cai-vong-kim-loai-da-ha-guc-duoc-chiec-may-bay-khong-nguoi-lai-tri-gia-11-trieu-usd-20201007170608327.chn");

  const news = await page.evaluate(() => {
    let author = document.querySelector(".kbwcm-author");
    let time = document.querySelector(".kbwcm-time");
    let title = document.querySelector(".kbwc-title");
    let cont = document.querySelectorAll(".knc-content");
    let img = document.querySelectorAll(".detail-img-lightbox");

    cont = [...cont];
    let content = cont.map(item => item.innerText.replace(/\n/g, ""));
    img = [...img];
    let image = img.map(item => item.getAttribute("href"));

    let news = {
    	title: title.innerText,
    	time: time.getAttribute("title"),
    	auth: author.innerText,
    	content: content,
    	imageLinks: image
    };
    return news;
  });
  let obj = JSON.stringify(news, null, 5);
   await fs.writeFile(`news.json`, obj  , function(err) {
      if (err) throw err;
      console.log("Saved");
    });
  await browser.close();
})();
