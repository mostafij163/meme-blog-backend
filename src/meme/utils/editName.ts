export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
    const fileExtName = file.originalname.split(".")[1];
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `meme-${name}-${randomName}.${fileExtName}`);
}