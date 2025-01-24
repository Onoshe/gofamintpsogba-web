import { Document, Packer,TextRun, Paragraph, SectionType } from "docx";
import { saveAs } from "file-saver";
//import * as docx from "docx";



function generateWordFile() {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Hello World"),
                new TextRun({
                  text: "Foo Bar",
                  bold: true
                }),
                new TextRun({
                  text: "\tGithub is the best",
                  bold: true
                })
              ]
            })
          ]
        }
      ],
      sections: [{
            properties: {
                type: SectionType.CONTINUOUS,
            },
            children: [
                new Paragraph({
                    children: [new TextRun("Hello World")],
                }),
            ],
        }],
    });
  
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
  


  export default generateWordFile