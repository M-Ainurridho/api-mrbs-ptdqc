import path from "path";

const downloadPDF = (req, res) => {
  const pdfPath = path.join("assets", "pdf");

  const file = path.join(pdfPath, "print-schedule.pdf");

  res.download(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error downloading file");
    }
  });
};

export default downloadPDF;
