import puppeteer from "puppeteer";

const getSpotifyTrackImage = async (
  trackUrl: string
): Promise<string | null> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(trackUrl, { waitUntil: "networkidle2" });
    const imgSrc = await page.$eval("img", (img: Element) => {
      const i = img as HTMLImageElement;
      return i.src;
    });

    await browser.close();
    return imgSrc;
  } catch (err) {
    console.error("Error al scrapear imagen:", err);
    await browser.close();
    return null;
  }
};

export default getSpotifyTrackImage;
