export default function imagesArreyNormalaize(arrayImages) {
    const {
      data: { totalHits, hits: arrayPictures },
    } = arrayImages;
    const totalPage = (totalHits / 12).toFixed(1);
    return { totalPage, arrayPictures };
}

