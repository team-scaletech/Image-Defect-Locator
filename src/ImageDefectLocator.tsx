import { FC } from "react";
import DefectLocatImage from "./components/defectLocator";

import { ImageDefectLocatorContainerProps } from "../typings/ImageDefectLocatorProps";

import "./ui/ImageDefectLocator.css";

export const ImageDefectLocator: FC<ImageDefectLocatorContainerProps> = ({ imageData, defectsData }) => {
    return <DefectLocatImage imageData={imageData} defectsData={defectsData} />;
};
