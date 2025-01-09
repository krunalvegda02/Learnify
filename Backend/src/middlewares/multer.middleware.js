import multer from "multer";

const upload = multer({ dest: "public/temp/" });

export default upload;
