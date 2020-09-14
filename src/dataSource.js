import faker from "faker";
import shortid from "shortid";
import booktitles from "./bookTitles";

// Constants
const imageCategory = ["animals", "arch", "nature", "people", "tech", "any"];
const imageWidth = 220;
const imageHeight = 280;
const category = ["regular", "fiction", "novel"];

/**
 *
 * @param {Integer} itemCount - Number of items to be generated
 */
export function dataSource(itemCount) {
  const books = [];
  let imageIndex = 0;
  for (let i = 0; i < itemCount; i++) {
    imageIndex++;
    let imagefilter = "";
    if (imageIndex === 5) {
      imagefilter = `/${
        Math.floor(Math.random() * 2) === 1 ? "grayscale" : "sepia"
      }`;
    }
    books.push({
      title: booktitles[i] || "Learn python the hardway",
      imageUrl: `http://placeimg.com/${imageWidth}/${imageHeight}/${imageCategory[imageIndex]}${imagefilter}`, // Some science
      id: shortid.generate(),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      category: category[Math.floor(Math.random() * 3)],
    });

    // Reinitialize image index
    if (imageIndex === 5) {
      imageIndex = 0;
    }
  }
  return books;
}

export default dataSource;
