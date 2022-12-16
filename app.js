// importa la biblioteca cors, que permite habilitar el acceso desde otras aplicaciones a este servidor.
const cors = require("cors");
// importa multer, que es un middleware para manejar archivos enviados a través de formularios.
const multer = require("multer");

// se crea una aplicación de Express y se establece el puerto en el que se va a escuchar.
const express = require("express");
const app = express();
const port = 3000;

// habilitar el acceso CORS para todas las rutas de la aplicación.
app.use(cors());

/* 
A continuación, se define un objeto de configuración para multer llamado storage,
que indica que los archivos subidos deben guardarse en la carpeta uploads
y deben tener un nombre compuesto por la fecha actual y el nombre original del archivo.
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Se crea una instancia de multer llamada upload con la configuración de almacenamiento anterior.
// Los archivos pueden tener un tamaño de hasta 10mb
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

// Se define una ruta POST en la raíz de la aplicación que utiliza el middleware de upload para manejar archivos subidos en el campo "file" del formulario.
app.post("/", upload.array("file"), (req, res) => {
  // Si el archivo se procesa correctamente, se envía una respuesta con un mensaje de "ok".
  res.json({
    msg: "ok",
  });
});

// error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    res.status(500).send(err);
  } else {
    // An unknown error occurred when uploading.
    res.status(500).send(err);
  }
});

// La aplicación de Express se pone a escuchar en el puerto especificado y muestra un mensaje en la consola cuando está lista para recibir solicitudes.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
