export const FileParser = (file: File) => {
  return new Promise((res, req) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      res(fileReader.result);
    };
  });
};
