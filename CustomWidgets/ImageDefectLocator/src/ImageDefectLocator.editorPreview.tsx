import { FC } from "react";
import DefectLocatImage from "./components/defectLocator";
import { ImageDefectLocatorPreviewProps } from "../typings/ImageDefectLocatorProps";

export const preview: FC<ImageDefectLocatorPreviewProps> = () => {
    return <DefectLocatImage />;
};

export function getPreviewCss(): string {
    return require("./ui/ImageDefectLocator.css");
}
