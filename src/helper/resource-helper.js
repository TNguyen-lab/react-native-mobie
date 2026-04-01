import * as constanst from "../ultis/Constanst";
import {
  FilePdfFilled,
  FolderOpenFilled,
  FileWordFilled,
  FileExcelFilled,
  FileImageFilled,
  FileTextFilled,

} from "@ant-design/icons";

export const checkDocumentExtention = (document, fontSize) => {
    switch (true) {
      case document.extension == constanst.FILE_EXTENSION.FOLDER:
        return (
          <FolderOpenFilled
            style={{ color: "#ffbc6b", fontSize: fontSize }}
          />
        );
      case constanst.FILE_EXTENSION.WORD.indexOf(document.extension) >= 0:
        return (
          <FileWordFilled
            style={{ color: "#2a5491", fontSize: fontSize }}
          />
        );
      case constanst.FILE_EXTENSION.EXCEL.indexOf(document.extension) >= 0:
        return (
          <FileExcelFilled
            style={{ color: "#1f6e43", fontSize: fontSize }}
          />
        );
      case constanst.FILE_EXTENSION.TEXT.indexOf(document.extension) >= 0:
        return (
          <FileTextFilled
            style={{ color: "#98d3e8", fontSize: fontSize }}           
          />
        );
      case constanst.FILE_EXTENSION.IMAGE.indexOf(document.extension) >= 0:
        return (
          <FileImageFilled
            style={{ color: "#83bf3e", fontSize: fontSize }}
          />
        );
      case constanst.FILE_EXTENSION.PDF.indexOf(document.extension) >= 0:
        return (
          <FilePdfFilled
            style={{ color: "#ad0b00", fontSize: fontSize }}
          />
        );
      default:
        break;
    }
}